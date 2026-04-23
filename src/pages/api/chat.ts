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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages: Array<{role: string, content: string}> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (history && Array.isArray(history)) {
      const validHistory = history.slice(-10).filter(
        (m: {role?: string, content?: string}) => 
          m && m.role && m.content && ['user', 'assistant'].includes(m.role)
      );
      messages.push(...validHistory);
    }

    messages.push({ role: 'user', content: message });

    // MiniMax M2.7 API call
    const response = await fetch('https://api.minimax.chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages,
        max_tokens: 256,
        temperature: 0.9,
        top_p: 0.95,
      }),
    });

    const data = await response.json();
    console.log('MiniMax response:', JSON.stringify(data));

    if (!response.ok) {
      return Response.json({ 
        error: `API error: ${response.status}`,
        details: data
      }, { status: 500 });
    }

    const aiMessage = data.choices?.[0]?.message?.content || 'No pude generar una respuesta.';
    return Response.json({ response: aiMessage });

  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ 
      error: 'Server error', 
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}