import { useEffect, useState } from 'react';
import { Globe2, ShieldCheck } from 'lucide-react';

type Country = { code: string; count: number };
type Stats = { total: number; countries: Country[] };

interface Props { language: string }

const chatUrl = import.meta.env.VITE_CHAT_API_URL || '';
const explicitUrl = import.meta.env.VITE_PORTFOLIO_API_URL || '';
const apiBase = (explicitUrl || chatUrl.replace(/\/api\/chat\/?$/, '')).replace(/\/$/, '');

const names: Record<string, Record<string, string>> = {
  CL: { es: 'Chile', en: 'Chile' },
  AR: { es: 'Argentina', en: 'Argentina' },
  BR: { es: 'Brasil', en: 'Brazil' },
  US: { es: 'Estados Unidos', en: 'United States' },
  MX: { es: 'México', en: 'Mexico' },
  PE: { es: 'Perú', en: 'Peru' },
  CO: { es: 'Colombia', en: 'Colombia' },
  ES: { es: 'España', en: 'Spain' },
  DE: { es: 'Alemania', en: 'Germany' },
  GB: { es: 'Reino Unido', en: 'United Kingdom' },
  CA: { es: 'Canadá', en: 'Canada' },
};

function flag(code: string) {
  if (!/^[A-Z]{2}$/.test(code)) return '🌍';
  return String.fromCodePoint(127397 + code.charCodeAt(0), 127397 + code.charCodeAt(1));
}

export const VisitorReach = ({ language }: Props) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(Boolean(apiBase));

  useEffect(() => {
    if (!apiBase) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        await fetch(`${apiBase}/api/analytics/hit`, { method: 'POST', signal: controller.signal });
        const response = await fetch(`${apiBase}/api/analytics/month`, { signal: controller.signal });
        if (response.ok) setStats(await response.json() as Stats);
      } catch {
        // Metrics never block the portfolio.
      } finally {
        setLoading(false);
      }
    };
    void load();
    return () => controller.abort();
  }, []);

  const spanish = language === 'es';
  const countries = stats?.countries.slice(0, 6) || [];
  const max = Math.max(1, ...countries.map((item) => item.count));

  return (
    <section className="border-y border-stone-200 bg-stone-50/80 py-10 dark:border-slate-800 dark:bg-slate-950/40" aria-label={spanish ? 'Alcance del portafolio' : 'Portfolio reach'}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">{spanish ? 'Alcance del portafolio' : 'Portfolio reach'}</p>
          <div className="mt-4 flex items-end gap-4"><strong className="font-serif text-6xl font-semibold text-stone-900 dark:text-white">{loading ? '—' : (stats?.total || 0).toLocaleString()}</strong><span className="pb-2 text-sm text-stone-600 dark:text-slate-300">{spanish ? 'visitas este mes' : 'visits this month'}</span></div>
          <p className="mt-5 flex max-w-md gap-2 text-sm leading-6 text-stone-500 dark:text-slate-400"><ShieldCheck size={17} className="mt-1 shrink-0" />{apiBase ? (spanish ? 'Conteo anónimo y aproximado; no se guardan direcciones IP.' : 'Anonymous approximate count; IP addresses are not stored.') : (spanish ? 'La medición se activará al conectar el endpoint del Worker.' : 'Measurement activates when the Worker endpoint is connected.')}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(28,25,23,0.06)] dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-white"><Globe2 size={18} />{spanish ? 'Países de origen' : 'Visitor countries'}</h2>
          {countries.length ? <ul className="space-y-4">{countries.map((item) => <li key={item.code}><div className="mb-1.5 flex justify-between gap-3 text-sm"><span>{flag(item.code)} {names[item.code]?.[spanish ? 'es' : 'en'] || item.code}</span><strong>{item.count}</strong></div><div className="h-1.5 rounded-full bg-stone-100 dark:bg-slate-800"><div className="h-full rounded-full bg-stone-700 dark:bg-slate-300" style={{ width: `${Math.max(6, item.count / max * 100)}%` }} /></div></li>)}</ul> : <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-stone-200 px-5 text-center text-sm text-stone-500 dark:border-slate-700 dark:text-slate-400">{loading ? (spanish ? 'Cargando visitas…' : 'Loading visits…') : (spanish ? 'Aún no hay datos mensuales.' : 'No monthly data yet.')}</div>}
        </div>
      </div>
    </section>
  );
};
