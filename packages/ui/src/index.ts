/* ═══════════════════════════════════════════════════════
   @yhg/ui — 统一导出入口
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
export { ChatMessage } from './ChatMessage'
export type { ChatMessageProps, MessageRole } from './ChatMessage'
export { ChatInput } from './ChatInput'
export type { ChatInputProps } from './ChatInput'
export { Chat } from './Chat'
export type { ChatProps } from './Chat'

// Hooks
export { useControllable, useMergeRefs } from './hooks'
export { useStreamChat } from './hooks/useStreamChat.js'
export type { ChatMessage as StreamMessage, StreamChatOptions } from './hooks/useStreamChat.js'

// Utils
export { cn, isPromise } from './utils'
