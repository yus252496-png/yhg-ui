import { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    /** 按钮变体 */
    variant?: ButtonVariant;
    /** 尺寸 */
    size?: ButtonSize;
    /** 禁用状态 */
    disabled?: boolean;
    /** 加载状态（显示 spinner，同时禁用点击） */
    loading?: boolean;
    /** 前置图标 */
    icon?: ReactNode;
    /** 按钮内容 */
    children?: ReactNode;
    /** 是否撑满父容器宽度 */
    block?: boolean;
    /** 点击回调 */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
/**
 * 工业级 Button 组件
 *
 * 支持 5 种 variant、3 种 size、loading、icon 前置、block 撑满。
 * 所有颜色引用 CSS 变量（`var(--kuka-*)`），受主题系统驱动。
 */
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map