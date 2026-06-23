import { Award, ExternalLink, FileText } from 'lucide-react';
import { certificates, translations } from '../../data/constants';

interface Props { language: string }

export const Credentials = ({ language }: Props) => {
  const text = translations.certificates;
  return (
    <section id="credenciales" className="border-y border-stone-200 bg-[#f1ede5] py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">Documentos</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-stone-950 dark:text-white sm:text-6xl">{text.title[language as keyof typeof text.title]}</h2>
          <p className="mt-5 text-lg text-stone-600 dark:text-slate-300">{text.subtitle[language as keyof typeof text.subtitle]}</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((certificate) => (
            <article key={certificate.id} className="rounded-[1.75rem] border border-stone-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-start gap-4">
                <Award className="mt-1 shrink-0" size={22} aria-hidden="true" />
                <div><h3 className="font-serif text-2xl font-semibold text-stone-900 dark:text-white">{certificate.title[language as keyof typeof certificate.title]}</h3><p className="mt-2 text-sm text-stone-500 dark:text-slate-400">{certificate.issuer[language as keyof typeof certificate.issuer]} · {certificate.date}</p></div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`${import.meta.env.BASE_URL}${certificate.fileUrl.replace(/^\//, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"><FileText size={17} />Abrir documento</a>
                {certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold dark:border-slate-700"><ExternalLink size={16} />Credencial externa</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
