export type MessageRole = 'user' | 'assistant';
export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: number;
}
export interface StreamChatOptions {
    /** API 端点 URL */
    url?: string;
    /** 自定义 fetch 函数（覆盖 url 时使用） */
    fetch?: (messages: ChatMessage[]) => Promise<Response>;
    /** 从 SSE data 行解析出文本片段 */
    parseChunk?: (line: string) => string | null;
    /** 请求头 */
    headers?: Record<string, string>;
    /** 请求体生成器 */
    buildBody?: (messages: ChatMessage[]) => unknown;
    /** 流结束标记 */
    doneToken?: string;
    /** 出错回调 */
    onError?: (error: Error) => void;
}
/**
 * useStreamChat — SSE 流式聊天 Hook
 *
 * 封装 fetch + ReadableStream 解析，返回 messages / send / abort / loading / error。
 */
export declare function useStreamChat(options?: StreamChatOptions): {
    messages: ChatMessage[];
    loading: boolean;
    error: string | null;
    send: (content: string) => Promise<void>;
    abort: () => void;
    clear: () => void;
    removeMessage: (id: string) => void;
};
//# sourceMappingURL=useStreamChat.d.ts.map