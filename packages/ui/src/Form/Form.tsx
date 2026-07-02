import { useCallback, useMemo, useState } from 'react'
import { cn } from '../utils/cn.js'
import { validateField } from './validator'
import { FieldRenderer } from './FieldRenderer'
import type { FormField, FormProps, FieldError } from './index'
import styles from './Form.module.css'

/**
 * 配置驱动 Form 组件
 *
 * 传入 fields 数组自动渲染表单，支持校验、多种布局、字段类型。
 */
export function Form({
  fields,
  layout = 'horizontal',
  initialValues,
  onSubmit,
  onReset,
  submitText = '提交',
  resetText = '重置',
  className,
  style,
}: FormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues ?? {})
  const [errors, setErrors] = useState<FieldError[]>([])
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const errorMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const err of errors) map.set(err.name, err.message)
    return map
  }, [errors])

  const handleChange = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // 已触发的字段立即重新校验
    setTouched((prev) => {
      if (prev.has(name)) {
        setErrors((prevErrors) => {
          const field = fields.find((f) => f.name === name)
          if (!field) return prevErrors
          const otherErrors = prevErrors.filter((e) => e.name !== name)
          const newError = validateField(field, { ...values, [name]: value })
          return newError ? [...otherErrors, newError] : otherErrors
        })
      }
      return prev
    })
  }, [fields, values])

  const handleBlur = useCallback((name: string) => {
    setTouched((prev) => {
      if (prev.has(name)) return prev
      const next = new Set(prev)
      next.add(name)
      return next
    })
    // 失焦时触发校验
    const field = fields.find((f) => f.name === name)
    if (field) {
      setErrors((prev) => {
        const otherErrors = prev.filter((e) => e.name !== name)
        const newError = validateField(field, values)
        return newError ? [...otherErrors, newError] : otherErrors
      })
    }
  }, [fields, values])

  const validateAll = useCallback(async (): Promise<boolean> => {
    const newErrors: FieldError[] = []
    for (const field of fields) {
      const error = validateField(field, values)
      if (error) newErrors.push(error)
    }
    // 异步校验
    for (const field of fields) {
      const asyncRule = field.rules?.find((r) => r.validator)
      if (asyncRule?.validator) {
        const result = await asyncRule.validator(values[field.name])
        if (!result) {
          newErrors.push({ name: field.name, message: asyncRule.message })
        }
      }
    }
    setErrors(newErrors)
    // 标记所有字段已触发
    setTouched(new Set(fields.map((f) => f.name)))
    return newErrors.length === 0
  }, [fields, values])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const valid = await validateAll()
    if (valid) onSubmit?.(values)
  }, [validateAll, onSubmit, values])

  const handleReset = useCallback(() => {
    setValues(initialValues ?? {})
    setErrors([])
    setTouched(new Set())
    onReset?.()
  }, [initialValues, onReset])

  return (
    <form
      className={cn(styles.form, styles[layout], className)}
      style={style}
      onSubmit={handleSubmit}
      onReset={handleReset}
      noValidate
    >
      {fields.map((field) => (
        <div key={field.name} className={cn(styles.field, field.required && styles.isRequired)}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          <div className={styles.control}>
            <FieldRenderer
              field={field}
              value={values[field.name]}
              onChange={(v) => handleChange(field.name, v)}
              onBlur={() => handleBlur(field.name)}
              hasError={touched.has(field.name) && errorMap.has(field.name)}
            />
            {touched.has(field.name) && errorMap.has(field.name) && (
              <div className={styles.error}>{errorMap.get(field.name)}</div>
            )}
          </div>
        </div>
      ))}

      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn}>
          {submitText}
        </button>
        <button type="reset" className={styles.resetBtn}>
          {resetText}
        </button>
      </div>
    </form>
  )
}
