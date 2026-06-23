import { ArrowDownRight, Github, Linkedin, MapPin } from 'lucide-react';
import { translations } from '../../data/constants';

interface Props { language: string }

export const HeroEditorial = ({ language }: Props) => {
  const t = translations;
  const role = language === 'es' ? 'Desarrollador Full Stack · Chile' : 'Full Stack Developer · Chile';
  const statement = language === 'es' ? 'Construyo productos web, automatizaciones y sistemas claros, rápidos y fáciles de mantener.' : 'I build clear, fast and maintainable web products, automations and systems.';
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-stone-200 bg-[#f7f4ee] pt-24 dark:border-slate-800 dark:bg-slate-950 sm:pt-28">
      <div className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-stone-200 bg-[#eee9df] dark:border-slate-800 dark:bg-slate-900/60 lg:block" />
      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:px-10">
        <div className="max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400"><span>{role}</span><span className="h-px w-10 bg-stone-300" /><span className="flex items-center gap-1 normal-case tracking-normal"><MapPin size={14} /> Viña del Mar</span></div>
          <h1 className="font-serif text-[clamp(3.2rem,9vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-stone-950 dark:text-white">Sebastian<br />Vargas Bermejo</h1>
          <div className="mt-9 grid max-w-3xl gap-5 border-l-2 border-stone-900 pl-5 dark:border-white sm:grid-cols-2 sm:gap-10 sm:pl-7"><p className="text-lg font-semibold leading-7 text-stone-800 dark:text-slate-100">{t.hero.subtitle[language as keyof typeof t.hero.subtitle]}</p><p className="text-base leading-7 text-stone-600 dark:text-slate-300">{statement}</p></div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#proyectos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">{language === 'es' ? 'Ver proyectos' : 'View projects'}<ArrowDownRight size={17} /></a><a href="#contacto" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">{language === 'es' ? 'Conversemos' : 'Let’s talk'}</a></div>
        </div>
        <aside className="lg:pl-12"><div className="rounded-[2rem] border border-stone-300 bg-white/75 p-7 shadow-[0_30px_80px_rgba(41,37,36,0.10)] dark:border-slate-700 dark:bg-slate-900/80"><p className="flex items-center gap-2 text-sm text-stone-700 dark:text-slate-200"><span className="h-2 w-2 rounded-full bg-emerald-600" />{language === 'es' ? 'Disponible para nuevas oportunidades' : 'Available for new opportunities'}</p><blockquote className="mt-10 font-serif text-3xl leading-snug text-stone-900 dark:text-white">“Productos útiles, interfaces claras y código preparado para durar.”</blockquote><div className="mt-10 border-t border-stone-200 pt-6 dark:border-slate-700"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">Stack</p><p className="mt-3 text-sm leading-7 text-stone-700 dark:text-slate-200">.NET · Python · React · TypeScript · Flutter · PostgreSQL</p></div><div className="mt-6 flex gap-2"><a href="https://github.com/Dratenkko" className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 dark:border-slate-700" aria-label="GitHub"><Github size={19} /></a><a href="https://www.linkedin.com/in/svb404/" className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 dark:border-slate-700" aria-label="LinkedIn"><Linkedin size={19} /></a></div></div></aside>
      </div>
    </section>
  );
};
