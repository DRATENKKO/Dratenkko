import type { NextRequest } from 'next/server';

const MINIMAX_API_KEY = 'sk-cp-xhetS3mRR0cGsJJXc2kM9gboQphiLqLFEHdTpO8UE7EV2PN-LgwEVUr3M6iBq3coD0y-HB8eC8-tqN5wVUH8maYwZYySsKSVPLPhei_m660q1xNLKKvQ9GQ';

const SYSTEM_PROMPT = `Eres un asistente virtual para el portafolio de Sebastián Vargas Bermejo (svb.dev, GitHub: Dratenkko).

INFORMACIÓN SOBRE SEBASTIÁN:
- Nombre: Sebastián Alejandro Andrés Vargas Bermejo
- Ubicación: Viña del Mar, Chile
- Teléfono: +56 9 3639 6900
- Email: sebavarber@proton.me
- LinkedIn: linkedin.com/in/svb404
- GitHub: github.com/Dratenkko

EXPERIENCIA LABORAL:
1. SERVIPHAR (Feb 2026 - Actual): Desarrollador .NET
2. I-GO (Feb 2024 - Abr 2024): Desarrollador .NET
3. NEOSOLTEC (Ago 2023 - Ene 2024): Desarrollador/Webscraper
4. PERMIFY (Nov 2022 - Ene 2023): Desarrollador Full Stack

EDUCACIÓN: Analista Programador Computacional - Duoc UC (Jul 2023)

SKILLS: Python, C#/.NET, Django, Flutter, Angular, Docker, Selenium, SQL

PROYECTOS: ArtMind, Sparedrive, Scrappers, PetOut, Prac

REGLAS:
1. Solo responde sobre Sebastián
2. No des código fuente
3. Si piden código, rechaza amablemente
4. Responde en español o inglés según el usuario`;

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: Array<{type: 'text'; text: string}>;
}

interface AnthropicResponse {
  id?: string;
  type?: string;
  role?: string;
  model?: string;
  content?: Array<{type: 'text' | 'thinking'; text?: string; thinking?: string}>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
  };
  stop_reason?: string;
  base_resp?: {status_code: number; status_msg: string};
  error?: {
    type: string;
    message: string;
    http_code: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const anthropicMessages: AnthropicMessage[] = [];

    // Add history
    if (history && Array.isArray(history)) {
      const validHistory = history.slice(-10).filter(
        (m: {role?: string; content?: string}) => 
          m && m.role && m.content && ['user', 'assistant'].includes(m.role)
      );
      for (const m of validHistory) {
        anthropicMessages.push({
          role: m.role as 'user' | 'assistant',
          content: [{ type: 'text', text: m.content }]
        });
      }
    }

    // Add current message
    anthropicMessages.push({
      role: 'user',
      content: [{ type: 'text', text: message }]
    });

    const response = await fetch('https://api.minimax.io/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: anthropicMessages,
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        temperature: 0.8,
      }),
    });

    const data: AnthropicResponse = await response.json();

    // Check for error in response body (MiniMax returns {type: "error", error: {...}})
    if (data.type === 'error' && data.error) {
      console.error('MiniMax API error:', data.error);
      return Response.json({ 
        error: data.error.message || 'API error',
        details: data.error
      }, { status: 401 });
    }

    if (!response.ok) {
      console.error('MiniMax HTTP error:', response.status, JSON.stringify(data));
      return Response.json({ 
        error: `HTTP error: ${response.status}`,
        details: data
      }, { status: response.status });
    }

    // Extract text from response
    let aiMessage = '';
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === 'text' && block.text) {
          aiMessage += block.text;
        }
      }
    }

    if (!aiMessage) {
      aiMessage = 'No pude generar una respuesta.';
    }

    return Response.json({ response: aiMessage });

  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ 
      error: 'Server error', 
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}