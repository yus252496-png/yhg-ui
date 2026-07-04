export type MessageRole = 'user' | 'assistant';
export interface ChatMessageProps {
    role: MessageRole;
    content: string;
    /** 是否正在流式输出中 */
    streaming?: boolean;
    /** 是否显示错误态 */
    error?: boolean;
    className?: string;
}
/**
 * 消息气泡组件
 *
 * 区分 user / assistant，支持流式输出的闪烁光标、错误状态。
 */
export declare function ChatMessage({ role, content, streaming, error, className }: ChatMessageProps): import("react").JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map