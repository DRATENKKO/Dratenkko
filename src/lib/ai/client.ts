/**
 * MiniMax AI client.
 *
 * IMPORTANT SECURITY NOTE:
 * This project is built as a static site (Vite → docs/ → GitHub Pages).
 * The API key is exposed in the frontend bundle via import.meta.env.VITE_MINIMAX_API_KEY.
 * For production security, deploy a small backend proxy (e.g., Vercel/Netlify Edge Function,
 * Cloudflare Worker, or use the existing src/pages/api/chat.ts if migrating to a framework
 * with API routes like Next.js).
 *
 * As a lightweight mitigation, this module includes a local rate limiter.
 */

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

const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY || '';
const API_URL = 'https://api.minimax.io/v1/chat/completions';
const REQUEST_TIMEOUT_MS = 20000;

// Local rate limiter
const RATE_LIMIT_KEY = 'ai_chat_rate_limit';
const MAX_REQUESTS_PER_MINUTE = 10;

function checkRateLimit(): { allowed: boolean; retryAfter?: number } {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window

    let timestamps: number[] = [];
    if (raw) {
      try {
        timestamps = JSON.parse(raw);
      } catch {
        timestamps = [];
      }
    }

    timestamps = timestamps.filter((t) => t > windowStart);

    if (timestamps.length >= MAX_REQUESTS_PER_MINUTE) {
      const oldest = timestamps[0];
      const retryAfter = Math.ceil((oldest + 60000 - now) / 1000);
      return { allowed: false, retryAfter };
    }

    timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
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
  if (!API_KEY) {
    throw new ChatError('API key not configured. Set VITE_MINIMAX_API_KEY in your environment.', 'NO_API_KEY');
  }

  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    throw new ChatError(
      `Rate limit exceeded. Try again in ${rateLimit.retryAfter || 60} seconds.`,
      'RATE_LIMITED'
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: options.messages,
        system: options.systemPrompt,
        max_tokens: options.maxTokens ?? 450,
        temperature: options.temperature ?? 0.5,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        throw new ChatError('Too many requests. Please wait a moment.', 'RATE_LIMITED');
      }
      let details = '';
      try {
        const errData = await response.json();
        details = errData?.error?.message || JSON.stringify(errData);
      } catch {
        details = await response.text().catch(() => '');
      }
      throw new ChatError(`API error (${status}): ${details}`, 'API_ERROR');
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      content?: string;
      error?: { message?: string };
    };

    let content = '';
    if (data.choices && data.choices[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else if (data.content) {
      content = data.content;
    }

    if (!content && data.error) {
      throw new ChatError(data.error.message || 'Unknown API error', 'API_ERROR');
    }

    const sanitized = sanitizeAssistantResponse(content);

    // If after sanitization the response is empty, it likely contained only reasoning blocks
    if (!sanitized || sanitized.length < 3) {
      return 'No pude generar una respuesta clara. Intenta reformular tu pregunta.';
    }

    return sanitized;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof ChatError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ChatError('Request timed out. Please try again.', 'TIMEOUT');
    }

    if (err instanceof TypeError) {
      throw new ChatError('Network error. Check your connection.', 'NETWORK');
    }

    throw new ChatError(
      err instanceof Error ? err.message : 'Unknown error',
      'UNKNOWN'
    );
  }
}
