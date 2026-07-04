import { useState, useRef, useCallback } from 'react'

/* ── 类型 ── */

export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: number
}

export interface StreamChatOptions {
  /** API 端点 URL */
  url?: string
  /** 自定义 fetch 函数（覆盖 url 时使用） */
  fetch?: (messages: ChatMessage[]) => Promise<Response>
  /** 从 SSE data 行解析出文本片段 */
  parseChunk?: (line: string) => string | null
  /** 请求头 */
  headers?: Record<string, string>
  /** 请求体生成器 */
  buildBody?: (messages: ChatMessage[]) => unknown
  /** 流结束标记 */
  doneToken?: string
  /** 出错回调 */
  onError?: (error: Error) => void
}

const defaultParseChunk = (line: string): string | null => {
  if (!line.startsWith('data: ')) return null
  const payload = line.slice(6)
  if (payload === '[DONE]') return null
  try {
    const json = JSON.parse(payload)
    return json.choices?.[0]?.delta?.content || null
  } catch {
    return null
  }
}

const defaultBuildBody = (messages: ChatMessage[]) => ({
  model: 'deepseek-v4-flash',
  messages: messages.map((m) => ({ role: m.role, content: m.content })),
  stream: true,
})

/* ── Hook ── */

/**
 * useStreamChat — SSE 流式聊天 Hook
 *
 * 封装 fetch + ReadableStream 解析，返回 messages / send / abort / loading / error。
 */
export function useStreamChat(options: StreamChatOptions = {}) {
  const {
    url = 'https://api.deepseek.com/chat/completions',
    headers,
    parseChunk = defaultParseChunk,
    buildBody = defaultBuildBody,
    doneToken = '[DONE]',
    onError,
    fetch: customFetch,
  } = options

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  /** 追加用户消息，发起流式请求 */
  const send = useCallback(async (content: string) => {
    if (!content.trim() || loading) return

    setError(null)
    setLoading(true)

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    }

    const assistantId = `msg-${Date.now() + 1}`
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const allMessages = [...messages, userMsg]
      const body = buildBody(allMessages)

      let response: Response

      if (customFetch) {
        response = await customFetch(allMessages)
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        })
      }

      if (!response.ok) {
        const errText = await response.text().catch(() => 'Unknown error')
        throw new Error(`API ${response.status}: ${errText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Response body is not readable')

      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === `data: ${doneToken}`) continue

          const chunk = parseChunk(trimmed)
          if (chunk) {
            fullContent += chunk
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: fullContent } : m,
              ),
            )
          }
        }
      }

      setLoading(false)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setLoading(false)
        return
      }
      const message = err instanceof Error ? err.message : '请求失败'
      setError(message)
      setLoading(false)
      onError?.(err instanceof Error ? err : new Error(message))
    }
  }, [url, headers, parseChunk, buildBody, doneToken, onError, loading, messages, customFetch])

  /** 中止当前请求 */
  const abort = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setLoading(false)
  }, [])

  /** 清空消息 */
  const clear = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  /** 删除单条消息 */
  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  return {
    messages,
    loading,
    error,
    send,
    abort,
    clear,
    removeMessage,
  }
}
