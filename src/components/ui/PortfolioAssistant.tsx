import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp, Loader2, X } from 'lucide-react';
import { buildSystemPrompt, getQuickQuestions, getWelcomeMessage } from '../../lib/ai/prompt';
import { sendChatMessage } from '../../lib/ai/client';

type Message = { role: 'user' | 'assistant'; content: string };
type Props = { language: string; isOpen: boolean; onClose: () => void };

export const PortfolioAssistant = ({ language, isOpen, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (!messages.length) setMessages([{ role: 'assistant', content: getWelcomeMessage(language) }]);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const keydown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', keydown);
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', keydown); };
  }, [isOpen, language, messages.length, onClose]);

  const ask = async (value: string) => {
    const question = value.trim();
    if (!question || loading) return;
    const next: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const answer = await sendChatMessage({ systemPrompt: buildSystemPrompt(language), messages: next.slice(-8), maxTokens: 320, temperature: 0.35 });
      setMessages((current) => [...current, { role: 'assistant', content: answer }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: language === 'es' ? 'No pude responder ahora. Puedes contactar a Sebastian directamente en la sección de contacto.' : 'I could not answer right now. You can contact Sebastian directly in the contact section.' }]);
    } finally {
      setLoading(false);
    }
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void ask(input); };
  if (!isOpen) return null;
  const spanish = language === 'es';

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-stone-950/35 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] border border-stone-200 bg-[#fbfaf7] shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:rounded-[28px]" role="dialog" aria-modal="true" aria-labelledby="portfolio-assistant-title">
        <header className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-5 dark:border-slate-800 sm:px-7">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">Portafolio · Asistente</p><h2 id="portfolio-assistant-title" className="mt-2 font-serif text-2xl font-semibold text-stone-900 dark:text-white">{spanish ? 'Conoce mejor mi trabajo' : 'Explore my work'}</h2><p className="mt-1 text-sm text-stone-500 dark:text-slate-400">{spanish ? 'Experiencia, proyectos y tecnologías, sin respuestas genéricas.' : 'Experience, projects and technologies, without generic answers.'}</p></div>
          <button onClick={onClose} className="rounded-full border border-stone-200 p-2.5 text-stone-500 hover:bg-stone-100 dark:border-slate-700 dark:hover:bg-slate-900" aria-label="Cerrar"><X size={18} /></button>
        </header>
        <div className="min-h-64 flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-7" aria-live="polite">
          {messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-md bg-stone-900 text-white dark:bg-white dark:text-slate-950' : 'rounded-bl-md border border-stone-200 bg-white text-stone-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'}`}>{message.content}</p></div>)}
          {loading && <p className="flex items-center gap-2 text-sm text-stone-500"><Loader2 size={16} className="animate-spin" />{spanish ? 'Revisando…' : 'Reviewing…'}</p>}
        </div>
        {messages.length <= 1 && <div className="flex flex-wrap gap-2 px-5 pb-4 sm:px-7">{getQuickQuestions(language).slice(0, 3).map((question) => <button key={question} onClick={() => void ask(question)} className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{question}</button>)}</div>}
        <form onSubmit={submit} className="border-t border-stone-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-2 rounded-2xl border border-stone-300 bg-[#fbfaf7] p-2 dark:border-slate-700 dark:bg-slate-950"><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} disabled={loading} maxLength={400} placeholder={spanish ? '¿Qué experiencia tiene con .NET?' : 'What is his .NET experience?'} className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none" /><button type="submit" disabled={loading || !input.trim()} className="grid h-10 w-10 place-items-center rounded-xl bg-stone-900 text-white disabled:opacity-35 dark:bg-white dark:text-slate-950" aria-label="Enviar"><ArrowUp size={18} /></button></div></form>
      </section>
    </div>
  );
};
