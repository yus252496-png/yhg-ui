import type { ReactNode } from 'react'

/* ── 字段类型 ── */

export type FieldType = 'text' | 'number' | 'select' | 'switch' | 'textarea'

/* ── 校验规则 ── */

export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message: string
  validator?: (value: unknown) => boolean | Promise<boolean>
}

/* ── 字段配置 ── */

export interface FormField {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  rules?: ValidationRule[]
  options?: { label: string; value: string | number }[]
  component?: ReactNode
}

/* ── 布局类型 ── */

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

/* ── 表单 Props ── */

export interface FormProps {
  fields: FormField[]
  layout?: FormLayout
  initialValues?: Record<string, unknown>
  onSubmit?: (values: Record<string, unknown>) => void
  onReset?: () => void
  submitText?: string
  resetText?: string
  className?: string
  style?: React.CSSProperties
}

/* ── 校验结果 ── */

export interface FieldError {
  name: string
  message: string
}

export { Form } from './Form'
