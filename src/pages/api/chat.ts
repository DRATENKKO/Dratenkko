// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any | undefined;

/**
 * Alternative MiniMax API endpoint (Anthropic-compatible format).
 *
 * NOTE: This file is NOT used by the current frontend implementation.
 * The frontend calls MiniMax directly from the browser via src/lib/ai/client.ts.
 *
 * If you migrate to a framework with real API routes (Next.js, Nuxt, SvelteKit,
 * or serverless functions on Vercel/Netlify/Cloudflare), you can use this file
 * as the backend proxy to hide the API key from the client.
 *
 * To activate: replace the direct fetch in client.ts with a call to this endpoint.
 */

import { sanitizeAssistantResponse } from '../../lib/ai/sanitize';
import { buildSystemPrompt } from '../../lib/ai/prompt';

export async function POST(request: Request) {
  try {
    const { message, history, language = 'es' } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const anthropicMessages: { role: 'user' | 'assistant'; content: string }[] = [];

    if (history && Array.isArray(history)) {
      const validHistory = history.slice(-10).filter(
        (m: { role?: string; content?: string }) =>
          m && m.role && m.content && ['user', 'assistant'].includes(m.role)
      );
      for (const m of validHistory) {
        anthropicMessages.push({ role: m.role as 'user' | 'assistant', content: m.content });
      }
    }

    anthropicMessages.push({ role: 'user', content: message });

    // In a real server environment, use process.env instead of import.meta.env
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (typeof process !== 'undefined' ? (process as any).env : undefined) || {};
    const API_KEY = env.VITE_MINIMAX_API_KEY || env.MINIMAX_API_KEY || '';

    if (!API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.minimax.io/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: anthropicMessages,
        system: buildSystemPrompt(language),
        max_tokens: 280,
        temperature: 0.4,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: `HTTP error: ${response.status}`, details: data },
        { status: response.status }
      );
    }

    let aiMessage = '';
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === 'text' && block.text) {
          aiMessage += block.text;
        }
      }
    }

    const sanitized = sanitizeAssistantResponse(aiMessage);

    return Response.json({ response: sanitized || 'No pude generar una respuesta.' });
  } catch (error) {
    return Response.json({ error: 'Server error', message: String(error) }, { status: 500 });
  }
}
