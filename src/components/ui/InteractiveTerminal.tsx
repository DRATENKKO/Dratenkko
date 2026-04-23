import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Code2, Send, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `IMPORTANTE: Eres el ASISTENTE VIRTUAL de SEBASTIAN VARGAS. NO eres otro asistente. Solo das INFORMACION sobre Sebastian.

SOBRE SEBASTIAN:
- Nombre completo: Sebastian Alejandro Andres Vargas Bermejo
- Ubicacion: Vina del Mar, Chile
- Telefono: +56 9 3639 6900
- Email: sebavarber@proton.me
- LinkedIn: linkedin.com/in/svb404
- GitHub: github.com/Dratenkko

EXPERIENCIA:
1. SERVIPHAR (Feb 2026 - Actual): Desarrollador .NET
2. I-GO (Feb 2024 - Abr 2024): Desarrollador .NET  
3. NEOSOLTEC (Ago 2023 - Ene 2024): Desarrollador/Webscraper
4. PERMIFY (Nov 2022 - Ene 2023): Desarrollador Full Stack

EDUCACION: Analista Programador Computacional - Duoc UC (Jul 2023)

SKILLS: Python, C#/.NET, Django, Flutter, Angular, Docker, Selenium, SQL

PROYECTOS: ArtMind, Sparedrive, Scrappers, PetOut, Prac

INSTRUCCIONES MUY IMPORTANTES:
- NUNCA menciones a Massiel Beatriz Cubas ni ninguna otra persona
- NUNCA des codigo fuente, solo informacion
- Solo habla sobre Sebastian y su trabajo
- Si te preguntan algo que no sea sobre Sebastian, responde: "Solo puedo dar informacion sobre Sebastian Vargas. Preguntame sobre el!"
- Responde en el mismo idioma que el usuario`

const BLOCKED_PATTERNS = [
  'codigo', 'código', 'source code', 'import ', 'function ', 'class ', 'const ', 'let ', 'var ',
  'def ', 'python', 'javascript', 'typescript', 'c#', '.net', 'write code', 'help me code',
  'dame el codigo', 'show me code', 'how to code', 'create a', 'build a', 'implement',
];

function isCodeRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_PATTERNS.some(pattern => lower.includes(pattern));
}

const WELCOME_ES = `⚡ ¡Hola! Soy el asistente de Sebastián.
💡 Pregúntame sobre él, su experiencia, proyectos o habilidades.

❌ No puedo ayudarte con código, pero puedo contarte sobre el trabajo de Sebastián.`;

const WELCOME_EN = `⚡ Hi! I'm Sebastián's assistant.
💡 Ask me about him, his experience, projects or skills.

❌ I can't help with code, but I can tell you about Sebastián's work.`;

const CODE_BLOCK_ES = "Lo siento, no puedo ayudarte con código. ¿Hay algo más que quieras saber sobre Sebastián o su trabajo?";

const CODE_BLOCK_EN = "Sorry, I can't help with code. Is there something else you'd like to know about Sebastián or his work?";

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
        content: language === 'es' ? WELCOME_ES : WELCOME_EN,
      }]);
    }
  }, [isOpen, language, showWelcome]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    if (isCodeRequest(text)) {
      setMessages(prev => [...prev, 
        { role: 'user', content: text },
        { role: 'assistant', content: language === 'es' ? CODE_BLOCK_ES : CODE_BLOCK_EN }
      ]);
      return;
    }

    const userMessage = text.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      // Build messages in MiniMax format
      const msgs = newMessages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Use standard MiniMax endpoint for Token Plan
      const response = await fetch('https://api.minimax.io/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-cp-xhetS3mRR0cGsJJXc2kM9gboQphiLqLFEHdTpO8UE7EV2PN-LgwEVUr3M6iBq3coD0y-HB8eC8-tqN5wVUH8maYwZYySsKSVPLPhei_m660q1xNLKKvQ9GQ',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'MiniMax-M2.7',
          messages: msgs,
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      // Extract text from MiniMax standard response
      let aiMessage = '';
      if (data.choices && data.choices[0]?.message?.content) {
        aiMessage = data.choices[0].message.content;
      } else if (data.content) {
        aiMessage = data.content;
      }

      // Strip thinking blocks: remove content between ━ and ━ markers
      aiMessage = aiMessage.replace(/━━━━━━━━━━━━━━━━━━[\s\S]*?━━━━━━━━━━━━━━━━━━/g, '').trim();

      if (!aiMessage && data.error) {
        throw new Error(data.error.message || 'API error');
      }

      if (!aiMessage) {
        aiMessage = 'No pude generar una respuesta.';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage }]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${errorMessage}`
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
        className="fixed inset-x-4 bottom-24 sm:inset-auto sm:right-4 sm:w-[380px] lg:w-96 z-50 mx-auto sm:mx-0"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-30" />
        
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden max-h-[85vh] flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
          
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

          <div
            ref={terminalRef}
            className="h-72 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700"
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
                  className={`max-w-[85%] sm:max-w-[85%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm sm:text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-md'
                      : 'bg-gray-800/80 text-cyan-100 border border-gray-700/30 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 pl-4"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-cyan-400 font-mono text-base sm:text-sm"
                >
                  ▋
                </motion.span>
              </motion.div>
            )}

            {error && (
              <div className="text-red-400 font-mono text-xs sm:text-sm text-center">
                ❌ {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 sm:p-3 bg-gray-800/60 border-t border-gray-700/30">
            <div className="flex items-center gap-2 px-3 sm:px-3 py-2.5 sm:py-2.5 bg-gray-900/50 rounded-xl border border-gray-700/30">
              <Code2 size={16} className="text-purple-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'es' ? 'pregúntame sobre Sebastián...' : 'ask me about Sebastián...'}
                className="flex-1 bg-transparent text-white text-base sm:text-sm outline-none placeholder-gray-500"
                autoComplete="off"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isTyping || !input.trim()}
                className="p-2 sm:p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Send size={18} className="text-cyan-400" />
              </motion.button>
            </div>

            <div className="flex gap-2 mt-2 hidden sm:flex">
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