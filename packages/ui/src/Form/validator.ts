import type { FormField, FieldError, ValidationRule } from './index'

/**
 * 校验单个字段
 * 顺序：required → min/max → pattern → validator（同步部分）
 * 返回 FieldError | null
 */
export function validateField(
  field: FormField,
  values: Record<string, unknown>,
): FieldError | null {
  const value = values[field.name]
  const rules = field.rules ?? []

  // 若字段标记 required，自动添加必填规则
  if (field.required && (value === undefined || value === null || value === '')) {
    return { name: field.name, message: `${field.label}不能为空` }
  }

  for (const rule of rules) {
    const error = executeRule(rule, value, field.label)
    if (error) return { name: field.name, message: error }
  }

  // 若字段为 required 但未显示定义校验，上面已处理
  // 若字段非 required 且值为空，跳过后续校验
  if (value === undefined || value === null || value === '') {
    return null
  }

  return null
}

function executeRule(
  rule: ValidationRule,
  value: unknown,
  label: string,
): string | null {
  // required
  if (rule.required && (value === undefined || value === null || value === '')) {
    return rule.message || `${label}不能为空`
  }

  // min（数字）
  if (rule.min !== undefined && typeof value === 'number' && value < rule.min) {
    return rule.message || `${label}不能小于${rule.min}`
  }

  // max（数字）
  if (rule.max !== undefined && typeof value === 'number' && value > rule.max) {
    return rule.message || `${label}不能大于${rule.max}`
  }

  // pattern（字符串）
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return rule.message || `${label}格式不正确`
  }

  // validator（同步部分，异步由 Form.tsx 处理）
  if (rule.validator && typeof value !== 'undefined') {
    const result = rule.validator(value)
    if (typeof result === 'boolean' && !result) {
      return rule.message || `${label}验证失败`
    }
  }

  return null
}
