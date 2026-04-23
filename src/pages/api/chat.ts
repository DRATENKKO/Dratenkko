import type { NextRequest } from 'next/server';

const MINIMAX_API_KEY = 'sk-cp-xhetS3mRR0cGsJJXc2kM9gboQphiLqLFEHdTpO8UE7EV2PN-LgwEVUr3M6iBq3coD0y-HB8eC8-tqN5wVUH8maYwZYySsKSVPLPhei_m660q1xNLKKvQ9GQ';
const MINIMAX_URL = 'https://api.minimax.chat/v1/chat/completions';

const SYSTEM_PROMPT = `Eres un asistente virtual para el portafolio de Sebastián Vargas Bermejo (svb.dev, GitHub: Dratenkko).

INFORMACIÓN SOBRE SEBASTIÁN:
- Nombre: Sebastián Alejandro Andrés Vargas Bermejo
- Ubicación: Viña del Mar, Chile
- Teléfono: +56 9 3639 6900
- Email: sebavarber@proton.me
- LinkedIn: linkedin.com/in/svb404
- GitHub: github.com/Dratenkko

EXPERIENCIA LABORAL:
1. SERVIPHAR (Feb 2026 - Actual): Desarrollador .NET - Cotizador de recetario magistral con .NET Core 10, APIs, seguridad de endpoints, generador de guías/facturas SII
2. I-GO (Feb 2024 - Abr 2024): Desarrollador .NET - CRUD con arquitectura limpia, .NET 8, Docker
3. NEOSOLTEC (Ago 2023 - Ene 2024): Desarrollador/Webscraper - Python + Selenium, PL/SQL, automatización de extracción de datos
4. PERMIFY (Nov 2022 - Ene 2023): Desarrollador Full Stack - Django, sitio web para personas mayores

EDUCACIÓN:
- Analista Programador Computacional - Duoc UC (Jul 2023, con dos votos de Distinción)

SKILLS:
- Lenguajes: Python, C#/.NET, Java, SQL, TypeScript, Dart
- Frameworks: Django, Flutter, Angular, Ionic, .NET Core, React
- Herramientas: Docker, Selenium, Git, PostgreSQL, MongoDB

PROYECTOS:
- ArtMind: Plataforma de terapia de arte (Django)
- Sparedrive: E-commerce de repuestos (Django + JS)
- Scrappers: Automatización de scraping (Python + Selenium)
- PetOut: App de gestión de mascotas (Flutter)
- Prac: Comunicación LoRa (Flutter + IoT)

REGLAS IMPORTANTES:
1. SOLO responde preguntas sobre Sebastián, su experiencia, skills, proyectos o portafolio
2. NO des código fuente bajo ninguna circunstancia
3. NO ayudes con tareas de programación, debugging, o escribir código
4. Si alguien pide código, responde: "Lo siento, no puedo ayudarte con código. ¿Hay algo más que quieras saber sobre Sebastián?"
5. Responde en el idioma del usuario (español/inglés)
6. Sé amable, profesional y conciso
7. Para contacto, menciona WhatsApp: +569 36396900`;

const BLOCKED_PATTERNS = [
  'codigo', 'código', 'source code', 'import ', 'function ', 'class ', 'const ', 'let ', 'var ',
  'def ', 'python', 'javascript', 'typescript', 'c#', '.net', 'write code', 'help me code',
  'dame el codigo', 'show me code', 'how to code', 'create a', 'build a', 'implement',
];

function isCodeRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_PATTERNS.some(pattern => lower.includes(pattern));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    if (isCodeRequest(message)) {
      return Response.json({
        response: "Lo siento, no puedo ayudarte con código. ¿Hay algo más que quieras saber sobre Sebastián o su trabajo?"
      });
    }

    // Build messages array - only user messages for history
    const messages: Array<{role: string, content: string}> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add history messages (filter out any malformed ones)
    if (history && Array.isArray(history)) {
      const validHistory = history.slice(-10).filter(
        (m: {role?: string, content?: string}) => 
          m && m.role && m.content && ['user', 'assistant'].includes(m.role)
      );
      messages.push(...validHistory);
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    const response = await fetch(MINIMAX_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-Text-01',
        messages,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MiniMax API error:', response.status, JSON.stringify(data));
      return Response.json({ 
        error: 'API error',
        details: data.error?.message || 'Unknown error'
      }, { status: 500 });
    }

    const aiMessage = data.choices?.[0]?.message?.content || 'No pude generar una respuesta.';

    return Response.json({ response: aiMessage });

  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Server error', message: String(error) }, { status: 500 });
  }
}