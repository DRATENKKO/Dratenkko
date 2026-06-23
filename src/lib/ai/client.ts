import { sanitizeAssistantResponse } from './sanitize';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  systemPrompt: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
}

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '';
const REQUEST_TIMEOUT_MS = 20000;
const RATE_LIMIT_KEY = 'portfolio_chat_requests';

function checkRateLimit() {
  try {
    const now = Date.now();
    const recent = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]')
      .filter((time: number) => time > now - 60000);
    if (recent.length >= 8) return false;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...recent, now]));
  } catch {
    return true;
  }
  return true;
}

export class ChatError extends Error {
  constructor(
    message: string,
    public readonly code: 'NO_API_KEY' | 'RATE_LIMITED' | 'TIMEOUT' | 'NETWORK' | 'API_ERROR' | 'UNKNOWN'
  ) {
    super(message);
    this.name = 'ChatError';
  }
}

export async function sendChatMessage(options: ChatOptions): Promise<string> {
  if (!CHAT_API_URL) {
    throw new ChatError('Chat proxy is not configured.', 'NO_API_KEY');
  }
  if (!checkRateLimit()) {
    throw new ChatError('Too many requests.', 'RATE_LIMITED');
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        message: options.messages.at(-1)?.content || '',
        history: options.messages.slice(0, -1),
        systemPrompt: options.systemPrompt,
        maxTokens: options.maxTokens ?? 320,
        temperature: options.temperature ?? 0.35,
        language: localStorage.getItem('language') || 'es',
      }),
    });

    if (response.status === 429) {
      throw new ChatError('Too many requests.', 'RATE_LIMITED');
    }
    if (!response.ok) {
      throw new ChatError(`Chat service returned ${response.status}.`, 'API_ERROR');
    }

    const data = await response.json() as { response?: string; error?: string };
    if (!data.response) {
      throw new ChatError(data.error || 'Empty response.', 'API_ERROR');
    }

    const answer = sanitizeAssistantResponse(data.response);
    if (!answer || answer.length < 3) {
      throw new ChatError('Empty response.', 'API_ERROR');
    }
    return answer;
  } catch (error) {
    if (error instanceof ChatError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ChatError('Request timed out.', 'TIMEOUT');
    }
    if (error instanceof TypeError) {
      throw new ChatError('Network error.', 'NETWORK');
    }
    throw new ChatError(error instanceof Error ? error.message : 'Unknown error.', 'UNKNOWN');
  } finally {
    window.clearTimeout(timeout);
  }
}
