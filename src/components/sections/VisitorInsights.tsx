import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Globe2, ShieldCheck, Users } from 'lucide-react';

type CountryStat = {
  code: string;
  count: number;
};

type MonthlyStats = {
  month: string;
  total: number;
  countries: CountryStat[];
};

interface VisitorInsightsProps {
  language: string;
}

const API_BASE = (import.meta.env.VITE_PORTFOLIO_API_URL || '').replace(/\/$/, '');

function countryFlag(code: string) {
  const normalized = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return '🌍';
  return String.fromCodePoint(...[...normalized].map((char) => 127397 + char.charCodeAt(0)));
}

function countryName(code: string, language: string) {
  try {
    const locale = language === 'es' ? 'es-CL' : language === 'pt' ? 'pt-BR' : language === 'it' ? 'it-IT' : 'en-US';
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code.toUpperCase()) || code;
  } catch {
    return code.toUpperCase();
  }
}

export const VisitorInsights = ({ language }: VisitorInsightsProps) => {
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(API_BASE));

  useEffect(() => {
    if (!API_BASE) return;

    const controller = new AbortController();
    const registerAndLoad = async () => {
      try {
        await fetch(`${API_BASE}/api/analytics/hit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: window.location.pathname }),
          signal: controller.signal,
        });

        const response = await fetch(`${API_BASE}/api/analytics/month`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        setStats((await response.json()) as MonthlyStats);
      } catch {
        // Analytics must never block or degrade the portfolio.
      } finally {
        setIsLoading(false);
      }
    };

    registerAndLoad();
    return () => controller.abort();
  }, []);

  const labels = useMemo(() => ({
    eyebrow: language === 'es' ? 'Alcance del portafolio' : language === 'pt' ? 'Alcance do portfólio' : language === 'it' ? 'Portata del portfolio' : 'Portfolio reach',
    title: language === 'es' ? 'Visitas de este mes' : language === 'pt' ? 'Visitas deste mês' : language === 'it' ? 'Visite di questo mese' : 'Visits this month',
    privacy: language === 'es' ? 'Conteo aproximado y anónimo. No se almacenan direcciones IP.' : language === 'pt' ? 'Contagem aproximada e anônima. Endereços IP não são armazenados.' : language === 'it' ? 'Conteggio approssimativo e anonimo. Gli indirizzi IP non vengono conservati.' : 'Approximate, anonymous count. IP addresses are not stored.',
    preparing: language === 'es' ? 'La medición se activará al conectar el endpoint gratuito.' : language === 'pt' ? 'A medição será ativada ao conectar o endpoint gratuito.' : language === 'it' ? 'La misurazione verrà attivata collegando l’endpoint gratuito.' : 'Measurement will activate when the free endpoint is connected.',
  }), [language]);

  const topCountries = stats?.countries.slice(0, 6) || [];
  const maxCount = Math.max(...topCountries.map((item) => item.count), 1);

  return (
    <section aria-labelledby="visitor-insights-title" className="border-y border-stone-200 bg-stone-50/80 py-10 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">
            <BarChart3 size={16} aria-hidden="true" />
            {labels.eyebrow}
          </div>
          <div className="flex items-end gap-4">
            <strong id="visitor-insights-title" className="font-serif text-5xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-6xl">
              {isLoading ? '—' : stats?.total.toLocaleString() || '0'}
            </strong>
            <span className="pb-2 text-sm text-stone-600 dark:text-slate-300">{labels.title}</span>
          </div>
          <p className="mt-5 flex max-w-md items-start gap-2 text-sm leading-6 text-stone-500 dark:text-slate-400">
            <ShieldCheck className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
            {API_BASE ? labels.privacy : labels.preparing}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_50px_rgba(28,25,23,0.06)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-slate-100">
              <Globe2 size={18} aria-hidden="true" />
              {language === 'es' ? 'Países de origen' : language === 'pt' ? 'Países de origem' : language === 'it' ? 'Paesi di origine' : 'Visitor countries'}
            </div>
            <Users size={18} className="text-stone-400" aria-hidden="true" />
          </div>

          {topCountries.length > 0 ? (
            <ul className="space-y-4">
              {topCountries.map((item) => (
                <li key={item.code}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 text-stone-700 dark:text-slate-200">
                      <span className="text-lg" aria-hidden="true">{countryFlag(item.code)}</span>
                      <span className="truncate">{countryName(item.code, language)}</span>
                    </span>
                    <strong className="tabular-nums text-stone-900 dark:text-white">{item.count.toLocaleString()}</strong>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-stone-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-stone-700 dark:bg-slate-300" style={{ width: `${Math.max((item.count / maxCount) * 100, 5)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50 px-6 text-center text-sm leading-6 text-stone-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
              {isLoading ? (language === 'es' ? 'Cargando visitas…' : 'Loading visits…') : labels.preparing}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
