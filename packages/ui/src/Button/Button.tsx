import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import styles from './Button.module.css'

/* ── 类型 ── */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮变体 */
  variant?: ButtonVariant
  /** 尺寸 */
  size?: ButtonSize
  /** 禁用状态 */
  disabled?: boolean
  /** 加载状态（显示 spinner，同时禁用点击） */
  loading?: boolean
  /** 前置图标 */
  icon?: ReactNode
  /** 按钮内容 */
  children?: ReactNode
  /** 是否撑满父容器宽度 */
  block?: boolean
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

/* ── 组件 ── */

/**
 * 工业级 Button 组件
 *
 * 支持 5 种 variant、3 种 size、loading、icon 前置、block 撑满。
 * 所有颜色引用 CSS 变量（`var(--yhg-*)`），受主题系统驱动。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    block = false,
    icon,
    children,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        block && styles.block,
        loading && styles.loading,
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      onClick={handleClick}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.content}>{children}</span>}
    </button>
  )
})
