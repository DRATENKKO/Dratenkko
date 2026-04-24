export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const anthropicMessages: {role: 'user' | 'assistant'; content: string}[] = [];

    if (history && Array.isArray(history)) {
      const validHistory = history.slice(-10).filter(
        (m: {role?: string; content?: string}) =>
          m && m.role && m.content && ['user', 'assistant'].includes(m.role)
      );
      for (const m of validHistory) {
        anthropicMessages.push({ role: m.role as 'user' | 'assistant', content: m.content });
      }
    }

    anthropicMessages.push({ role: 'user', content: message });

    const API_KEY = (await import.meta.env.VITE_MINIMAX_API_KEY) || '';

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
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: `HTTP error: ${response.status}`, details: data }, { status: response.status });
    }

    let aiMessage = '';
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === 'text' && block.text) {
          aiMessage += block.text;
        }
      }
    }

    return Response.json({ response: aiMessage || 'No pude generar una respuesta.' });
  } catch (error) {
    return Response.json({ error: 'Server error', message: String(error) }, { status: 500 });
  }
}
