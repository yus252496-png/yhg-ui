export interface ChatInputProps {
    /** 发送回调 */
    onSend: (text: string) => void;
    /** 是否处于加载态（禁用输入+按钮） */
    disabled?: boolean;
    /** 占位文案 */
    placeholder?: string;
    /** 最大字符数 */
    maxLength?: number;
    className?: string;
}
/**
 * 聊天输入框组件
 *
 * 支持 Enter 发送、Shift+Enter 换行、loading 禁用、字数限制。
 */
export declare function ChatInput({ onSend, disabled, placeholder, maxLength, className, }: ChatInputProps): import("react").JSX.Element;
//# sourceMappingURL=ChatInput.d.ts.map