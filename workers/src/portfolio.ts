type ChatMessage = { role: 'user' | 'assistant'; content: string };

type KVList = { keys: Array<{ name: string }> };
type KVStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options: { prefix: string }): Promise<KVList>;
};

interface Env {
  MINIMAX_API_KEY: string;
  VISITOR_SALT?: string;
  SITE_ORIGIN?: string;
  VISITS?: KVStore;
}

const month = () => new Date().toISOString().slice(0, 7);
const json = (data: unknown, status = 200, headers: HeadersInit = {}) => Response.json(data, { status, headers });

function allowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get('Origin') || '';
  const site = env.SITE_ORIGIN || 'https://sebavb.dev';
  if (origin === site || origin.startsWith('http://localhost:')) return origin;
  return site;
}

function cors(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function sanitize(text: string) {
  return text
    .replace(/<(reasoning|thinking|analysis|reflection)>[^]*?<\/\1>/gi, '')
    .replace(/<\/?(reasoning|thinking|analysis|reflection)>/gi, '')
    .trim();
}

function systemPrompt(language: string) {
  const spanish = language === 'es';
  return spanish
    ? 'Eres el asistente profesional del portafolio de Sebastian Vargas Bermejo, desarrollador Full Stack chileno. Responde en español, en máximo cuatro oraciones, con tono directo y humano. Habla solo de su experiencia, proyectos, stack, disponibilidad y contacto. Stack principal: .NET, C#, Python, React, TypeScript, Flutter, PostgreSQL y automatización. No inventes datos ni muestres razonamiento interno.'
    : 'You are the professional portfolio assistant for Sebastian Vargas Bermejo, a Chilean Full Stack Developer. Answer in English in no more than four sentences, using a direct, human tone. Discuss only his experience, projects, stack, availability and contact details. Main stack: .NET, C#, Python, React, TypeScript, Flutter, PostgreSQL and automation. Never invent facts or reveal internal reasoning.';
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function chat(request: Request, env: Env, headers: HeadersInit) {
  if (!env.MINIMAX_API_KEY) return json({ error: 'Chat is not configured' }, 503, headers);
  const body = await request.json() as { message?: string; history?: ChatMessage[]; language?: string };
  const message = body.message?.trim();
  if (!message || message.length > 500) return json({ error: 'Invalid message' }, 400, headers);

  const history = Array.isArray(body.history)
    ? body.history.slice(-8).filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    : [];

  const response = await fetch('https://api.minimax.io/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.MINIMAX_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'MiniMax-M3',
      system: systemPrompt(body.language || 'es'),
      messages: [...history, { role: 'user', content: message }],
      max_tokens: 360,
      temperature: 0.35,
    }),
  });

  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
  if (!response.ok) return json({ error: data.error?.message || `MiniMax ${response.status}` }, response.status, headers);
  const answer = sanitize(data.choices?.[0]?.message?.content || '');
  return json({ response: answer || 'No pude generar una respuesta clara.' }, 200, headers);
}

async function recordVisit(request: Request, env: Env, headers: HeadersInit) {
  if (!env.VISITS) return json({ ok: false, reason: 'Analytics storage not configured' }, 200, headers);
  const cf = (request as Request & { cf?: { country?: string } }).cf;
  const country = (cf?.country || 'UN').toUpperCase();
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const agent = request.headers.get('User-Agent') || 'unknown';
  const currentMonth = month();
  const id = await digest(`${env.VISITOR_SALT || 'portfolio'}:${currentMonth}:${ip}:${agent}`);
  const seenKey = `seen:${currentMonth}:${id}`;
  if (await env.VISITS.get(seenKey)) return json({ ok: true, counted: false }, 200, headers);

  const totalKey = `total:${currentMonth}`;
  const countryKey = `country:${currentMonth}:${country}`;
  const [total, countryTotal] = await Promise.all([env.VISITS.get(totalKey), env.VISITS.get(countryKey)]);
  await Promise.all([
    env.VISITS.put(seenKey, '1', { expirationTtl: 60 * 60 * 24 * 40 }),
    env.VISITS.put(totalKey, String(Number(total || 0) + 1), { expirationTtl: 60 * 60 * 24 * 400 }),
    env.VISITS.put(countryKey, String(Number(countryTotal || 0) + 1), { expirationTtl: 60 * 60 * 24 * 400 }),
  ]);
  return json({ ok: true, counted: true }, 200, headers);
}

async function monthly(env: Env, headers: HeadersInit) {
  if (!env.VISITS) return json({ month: month(), total: 0, countries: [] }, 200, headers);
  const currentMonth = month();
  const keys = await env.VISITS.list({ prefix: `country:${currentMonth}:` });
  const countries = await Promise.all(keys.keys.map(async ({ name }) => ({
    code: name.split(':').at(-1) || 'UN',
    count: Number(await env.VISITS!.get(name) || 0),
  })));
  countries.sort((a, b) => b.count - a.count);
  const total = Number(await env.VISITS.get(`total:${currentMonth}`) || 0);
  return json({ month: currentMonth, total, countries: countries.slice(0, 12) }, 200, headers);
}

export default {
  async fetch(request: Request, env: Env) {
    const origin = allowedOrigin(request, env);
    const headers = cors(origin);
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    const path = new URL(request.url).pathname;
    try {
      if (path === '/api/chat' && request.method === 'POST') return await chat(request, env, headers);
      if (path === '/api/analytics/hit' && request.method === 'POST') return await recordVisit(request, env, headers);
      if (path === '/api/analytics/month' && request.method === 'GET') return await monthly(env, headers);
      if (path === '/health') return json({ ok: true }, 200, headers);
      return json({ error: 'Not found' }, 404, headers);
    } catch {
      return json({ error: 'Service unavailable' }, 500, headers);
    }
  },
};
