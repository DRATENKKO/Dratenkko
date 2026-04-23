import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Sparkles, Code2, Send, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const BLOCKED_PATTERNS = [
  'codigo', 'código', 'source code', '源代码', 'import ', 'function ', 'class ', 'const ', 'let ', 'var ',
  'def ', 'python', 'javascript', 'typescript', 'c#', '.net', 'write code', 'help me code',
  'dame el codigo', 'show me code', 'how to code', 'create a', 'build a', 'implement',
];

function isCodeRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_PATTERNS.some(pattern => lower.includes(pattern));
}

const quickLinks = [
  { label: 'GitHub', url: 'https://github.com/Dratenkko' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/svb404' },
  { label: 'WhatsApp', url: 'https://wa.me/56936396900' },
];

interface InteractiveTerminalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal = ({ language, isOpen, onClose }: InteractiveTerminalProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && showWelcome) {
      setShowWelcome(false);
      setMessages([{
        role: 'assistant',
        content: language === 'es' 
          ? '⚡ ¡Hola! Soy el asistente de Sebastián.\n💡 Pregúntame sobre él, su experiencia, proyectos o habilidades.\n\n❌ No puedo ayudarte con código, pero puedo contarte sobre el trabajo de Sebastián.'
          : '⚡ Hi! I\'m Sebastián\'s assistant.\n💡 Ask me about him, his experience, projects or skills.\n\n❌ I can\'t help with code, but I can tell you about Sebastián\'s work.',
      }]);
    }
  }, [isOpen, language, showWelcome]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Check for code requests
    if (isCodeRequest(text)) {
      setMessages(prev => [...prev, 
        { role: 'user', content: text },
        { role: 'assistant', content: language === 'es' 
          ? 'Lo siento, no puedo ayudarte con código. ¿Hay algo más que quieras saber sobre Sebastián o su trabajo?'
          : 'Sorry, I can\'t help with code. Is there something else you'd like to know about Sebastián or his work?' }
      ]);
      return;
    }

    const userMessage = text.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'es' 
            ? '❌ Error de conexión. Intenta de nuevo.'
            : '❌ Connection error. Please try again.'
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (err) {
      setError('Network error');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'es'
          ? '❌ No pude conectar con el servidor.'
          : '❌ Could not connect to server.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-[380px] lg:w-96"
        style={{ perspective: '1000px' }}
      >
        {/* Glow background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-30" />
        
        {/* Terminal Card */}
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Animated top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot size={16} className="text-cyan-400" />
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-cyan-400 rounded-full blur-sm"
                />
              </div>
              <span className="text-xs font-mono text-cyan-400/80">AI Assistant</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={terminalRef}
            className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl font-mono text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-md'
                      : 'bg-gray-800/80 text-cyan-300/90 border border-gray-700/30 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 pl-4"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-cyan-400 font-mono text-sm"
                >
                  ▋
                </motion.span>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-red-400 font-mono text-xs text-center">
                ❌ {error}
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-gray-800/60 border-t border-gray-700/30">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-900/50 rounded-xl border border-gray-700/30">
              <Code2 size={14} className="text-purple-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'es' ? 'pregúntame sobre Sebastián...' : 'ask me about Sebastián...'}
                className="flex-1 bg-transparent text-white/90 font-mono text-sm outline-none placeholder-gray-600"
                autoComplete="off"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTyping || !input.trim()}
                className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send size={14} className="text-cyan-400" />
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-xs text-gray-400 hover:text-white transition-colors border border-gray-700/30"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};