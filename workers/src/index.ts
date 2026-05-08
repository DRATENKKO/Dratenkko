interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Env {
  MINIMAX_API_KEY: string;
}

function sanitize(text: string): string {
  let out = text
    .replace(/<reasoning>[^]*?<\/reasoning>/gi, '')
    .replace(/<thinking>[^]*?<\/thinking>/gi, '')
    .replace(/<analysis>[^]*?<\/analysis>/gi, '')
    .replace(/<reflection>[^]*?<\/reflection>/gi, '')
    .replace(/<thinking>/gi, '')
    .replace(/<\/thinking>/gi, '')
    .replace(/<reasoning>/gi, '')
    .replace(/<\/reasoning>/gi, '')
    .replace(/<analysis>/gi, '')
    .replace(/<\/analysis>/gi, '')
    .trim();

  if (out.startsWith('"') && out.endsWith('"')) {
    out = out.slice(1, -1).trim();
  }

  return out;
}

function buildSystemPrompt(language: string): string {
  const isEs = language === 'es';
  return `Eres un asistente IA en el portafolio de Sebastian Vargas (Dratenkko), desarrollador full-stack. ${isEs ? 'Responde en español, sé conciso (máx 3 oraciones), amigable y profesional. NO uses markdown, asteriscos ni emojis. Datos: GitHub: Dratenkko, sitio: sebavb.dev, stack: React, TypeScript, Node.js, Python, Tailwind, PostgreSQL, Docker, AWS/GCP. Experiencia: desarrollador full-stack, ingeniero de software, proyectos de IA, automatización y web scraping.' : 'Answer in English, be concise (max 3 lines), friendly and professional. DO NOT use markdown, asterisks or emojis. Data: GitHub: Dratenkko, site: sebavb.dev, stack: React, TypeScript, Node.js, Python, Tailwind, PostgreSQL, Docker, AWS/GCP. Experience: full-stack developer, software engineer, AI projects, automation and web scraping.'}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/api/chat' || request.method !== 'POST') {
      return new Response('Not found', { status: 404 });
    }

    if (!env.MINIMAX_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
      const { message, history, language = 'es' } = await request.json() as {
        message?: string;
        history?: ChatMessage[];
        language?: string;
      };

      if (!message || typeof message !== 'string') {
        return Response.json({ error: 'Message is required' }, { status: 400 });
      }

      const messages: ChatMessage[] = [];
      if (history && Array.isArray(history)) {
        const valid = history
          .slice(-10)
          .filter((m) => m?.role && m?.content && ['user', 'assistant'].includes(m.role));
        messages.push(...valid);
      }
      messages.push({ role: 'user', content: message });

      const response = await fetch('https://api.minimax.io/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.MINIMAX_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'MiniMax-M2.7',
          messages,
          system: buildSystemPrompt(language),
          max_tokens: 450,
          temperature: 0.5,
        }),
      });

      const data = await response.json() as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (!response.ok) {
        return Response.json(
          { error: data.error?.message || `HTTP ${response.status}` },
          { status: response.status }
        );
      }

      const content = data.choices?.[0]?.message?.content || '';
      const sanitized = sanitize(content);

      return Response.json(
        { response: sanitized || 'No pude generar una respuesta.' },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (err) {
      return Response.json(
        { error: 'Server error', message: String(err) },
        { status: 500 }
      );
    }
  },
};
