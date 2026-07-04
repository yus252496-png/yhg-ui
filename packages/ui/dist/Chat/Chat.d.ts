import { StreamChatOptions } from '../hooks/useStreamChat.js';
export interface ChatProps {
    /** SSE 配置（url / headers / parseChunk / buildBody / onError） */
    options?: StreamChatOptions;
    /** 初始消息 */
    initialMessages?: {
        role: 'user' | 'assistant';
        content: string;
    }[];
    /** 占位文案 */
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * 完整聊天组件
 *
 * 串联 useStreamChat + ChatMessage + ChatInput 实现打字机效果。
 * 只需配置 API 端点即可使用。
 */
export declare function Chat({ options, initialMessages, placeholder, className, style }: ChatProps): import("react").JSX.Element;
//# sourceMappingURL=Chat.d.ts.map