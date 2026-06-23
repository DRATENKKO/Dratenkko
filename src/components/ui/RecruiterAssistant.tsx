import { X } from 'lucide-react';

type Props = {
  language: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RecruiterAssistant = ({ language, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-stone-950/35 backdrop-blur-sm sm:items-center sm:p-6">
      <section className="w-full max-w-xl rounded-t-[28px] border border-stone-200 bg-[#fbfaf7] p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:rounded-[28px]" role="dialog" aria-modal="true">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Asistente del portafolio</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 dark:text-white">{language === 'es' ? 'Conoce mejor mi trabajo' : 'Explore my work'}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-slate-300">{language === 'es' ? 'Consulta experiencia, proyectos y tecnologías desde el asistente integrado.' : 'Ask about experience, projects and technologies using the integrated assistant.'}</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-stone-200 p-2.5 text-stone-500 dark:border-slate-700" aria-label="Cerrar"><X size={18} /></button>
        </div>
      </section>
    </div>
  );
};
