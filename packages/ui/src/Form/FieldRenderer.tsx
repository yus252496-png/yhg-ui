import type { FormField } from './index'
import styles from './Form.module.css'

interface FieldRendererProps {
  field: FormField
  value: unknown
  onChange: (value: unknown) => void
  onBlur: () => void
  hasError: boolean
}

/**
 * 字段渲染器 — 根据 field.type 渲染对应输入控件
 */
export function FieldRenderer({ field, value, onChange, onBlur, hasError }: FieldRendererProps) {
  // 使用 field.name 作为 id，与 label htmlFor 匹配
  const id = field.name

  if (field.component) {
    return <>{field.component}</>
  }

  const cls = `${styles.input} ${hasError ? styles.inputError : ''}`.trim()

  switch (field.type) {
    case 'text':
      return (
        <input
          id={id}
          className={cls}
          type="text"
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )

    case 'number':
      return (
        <input
          id={id}
          className={cls}
          type="number"
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          onBlur={onBlur}
        />
      )

    case 'select':
      return (
        <select
          id={id}
          className={cls}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        >
          <option value="" disabled>
            {field.placeholder ?? '请选择'}
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )

    case 'switch': {
      const checked = !!value
      return (
        <label className={styles.switch}>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            className={styles.switchInput}
          />
          <span className={styles.switchTrack}>
            <span className={styles.switchThumb} />
          </span>
        </label>
      )
    }

    case 'textarea':
      return (
        <textarea
          id={id}
          className={`${cls} ${styles.textarea}`}
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={3}
        />
      )

    default:
      return (
        <input
          id={id}
          className={cls}
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )
  }
}
