/* ═══════════════════════════════════════════════════════
   @kuka-fe/ui — 统一导出入口
   ═══════════════════════════════════════════════════════ */

// Design Tokens — 导入以触发 vite CSS 打包
import './tokens/index.css'

// Components
export { Button } from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'
export { Table } from './Table'
export type { Column, TableProps, PaginationConfig, SortDirection } from './Table'
export { Form } from './Form'
export type { FormProps, FormField, FormLayout, FieldType, ValidationRule, FieldError } from './Form'

// Hooks
export { useControllable, useMergeRefs } from './hooks'

// Utils
export { cn, isPromise } from './utils'
