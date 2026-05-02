import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Trash2, Loader2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  buildSystemPrompt,
  getQuickQuestions,
  getWelcomeMessage,
  getCodeBlockMessage,
  getErrorFallbackMessage,
  getPlaceholder,
} from '../../lib/ai/prompt';
import { sendChatMessage, ChatError } from '../../lib/ai/client';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface InteractiveTerminalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Lightweight guard against code requests.
 * These patterns are specific enough to avoid false positives
 * while catching obvious programming help requests.
 */
const BLOCKED_PATTERNS = [
  'codigo', 'código', 'source code', 'import ', 'function ', 'class ',
  'def ', 'write code', 'help me code', 'dame el codigo', 'dame código',
  'show me code', 'how to code', 'crea un script', 'crea una funcion',
  'crea una función', 'hazme un script', 'programa en python',
  'programa en javascript', 'programa en c#', 'programa en dart',
  'resuelve este ejercicio', 'debug this', 'arregla este codigo',
];

function isCodeRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_PATTERNS.some((pattern) => lower.includes(pattern));
}

/** Animated typing dots for the assistant */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 pl-4 py-1" aria-live="assertive" aria-label="El asistente está escribiendo">
      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export const InteractiveTerminal = ({ language, isOpen, onClose }: InteractiveTerminalProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages, isTyping, error]);

  // Initialize welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: getWelcomeMessage(language),
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, language]);

  // Close on Escape + trap focus when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      // Code request guard
      if (isCodeRequest(trimmed)) {
        setMessages((prev) => [
          ...prev,
          { role: 'user', content: trimmed },
          { role: 'assistant', content: getCodeBlockMessage(language) },
        ]);
        setInput('');
        return;
      }

      const userMessage = { role: 'user' as const, content: trimmed };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setIsTyping(true);
      setError(null);

      try {
        const recentMessages = newMessages.slice(-10);
        const systemPrompt = buildSystemPrompt(language);

        const response = await sendChatMessage({
          systemPrompt,
          messages: recentMessages,
          maxTokens: 450,
          temperature: 0.5,
        });

        setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      } catch (err) {
        console.error('Chat error:', err);
        let friendly = getErrorFallbackMessage(language);
        if (err instanceof ChatError) {
          switch (err.code) {
            case 'RATE_LIMITED':
              friendly = 'Has enviado muchos mensajes. Espera un momento antes de continuar.';
              break;
            case 'NO_API_KEY':
              friendly = 'El asistente no está configurado. Contacta a Sebastian directamente.';
              break;
            case 'TIMEOUT':
              friendly = 'El asistente tardó demasiado. Inténtalo de nuevo.';
              break;
            case 'NETWORK':
              friendly = 'Problema de conexión. Revisa tu red e inténtalo de nuevo.';
              break;
            case 'API_ERROR':
              friendly = 'El servicio de IA tuvo un problema. Inténtalo más tarde.';
              break;
          }
        }
        setError(friendly);
        setMessages((prev) => [...prev, { role: 'assistant', content: friendly }]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages, language]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    setMessages([{ role: 'assistant', content: getWelcomeMessage(language) }]);
    setError(null);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  if (!isOpen) return null;

  const quickQuestions = getQuickQuestions(language);

  return (
    <AnimatePresence>
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
        className="fixed bottom-24 sm:bottom-24 right-4 left-4 sm:left-auto w-auto sm:w-[400px] lg:w-[420px] z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Asistente virtual"
        aria-busy={isTyping}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-30" />

        <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden max-h-[80vh] sm:max-h-[85vh] flex flex-col">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot size={16} className="text-cyan-400" aria-hidden="true" />
                {!reducedMotion && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-cyan-400 rounded-full blur-sm"
                  />
                )}
              </div>
              <span className="text-xs font-mono text-cyan-400/80">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={handleClear}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Limpiar conversación"
                  title="Limpiar conversación"
                >
                  <Trash2 size={14} className="text-gray-400" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Cerrar asistente"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={terminalRef}
            className="flex-1 min-h-[240px] max-h-[50vh] sm:max-h-[56vh] overflow-y-auto p-3 sm:p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-md'
                      : 'bg-gray-800/80 text-cyan-100 border border-gray-700/30 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isTyping && <TypingIndicator />}

            {error && messages[messages.length - 1]?.content !== error && (
              <div className="text-red-400 font-mono text-xs text-center py-1">{error}</div>
            )}
          </div>

          {/* Suggested questions */}
          {messages.length <= 2 && !isTyping && (
            <div className="px-3 sm:px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 rounded-full text-xs text-gray-300 hover:text-white transition-colors border border-gray-700/40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-3 bg-gray-800/60 border-t border-gray-700/30">
            <div className="flex items-center gap-2 px-3 sm:px-3 py-2.5 sm:py-2.5 bg-gray-900/50 rounded-xl border border-gray-700/30 focus-within:border-cyan-500/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholder(language)}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500 disabled:opacity-50"
                autoComplete="off"
                disabled={isTyping}
                aria-label="Escribe tu mensaje"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="p-2 sm:p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 active:bg-cyan-500/40 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-cyan-500/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Enviar mensaje"
              >
                {isTyping ? (
                  <Loader2 size={18} className="text-cyan-400 animate-spin" />
                ) : (
                  <Send size={18} className="text-cyan-400" />
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
