import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Zap, Mail, Github, Linkedin, ExternalLink, Sparkles, Code2 } from 'lucide-react';

interface TerminalCommand {
  input: string;
  output: string;
  type: 'command' | 'response' | 'error';
}

const commands = {
  help: {
    es: `⚡ Comandos disponibles:
  about     → Sobre mí
  skills    → Stack tecnológico
  projects  → Ver proyectos
  contact   → Contacto directo
  clear     → Limpiar terminal`,
    en: `⚡ Available commands:
  about     → About me
  skills    → Tech stack
  projects  → View projects
  contact   → Direct contact
  clear     → Clear terminal`,
    pt: `⚡ Comandos disponíveis:
  about     → Sobre mim
  skills    → Stack tecnológico
  projects  → Ver projetos
  contact   → Contato direto
  clear     → Limpar terminal`,
    it: `⚡ Comandi disponibili:
  about     → Chi sono
  skills    → Stack tecnologico
  projects  → Vedi progetti
  contact   → Contatto diretto
  clear     → Pulisci terminale`,
  },
  about: {
    es: `👋 ¡Hola! Soy Sebastian Vargas B.

📍 Santiago, Chile ��🇱
💼 .NET Developer @ Serviphar
🎓 Analista Programador Computacional
⚡ Full Stack Developer

💡 Transformando ideas en código desde 2022`,
    en: `👋 Hi! I'm Sebastian Vargas B.

📍 Santiago, Chile 🇨🇱
💼 .NET Developer @ Serviphar
🎓 Computer Programmer Analyst
⚡ Full Stack Developer

💡 Turning ideas into code since 2022`,
    pt: `👋 Olá! Eu sou Sebastian Vargas B.

📍 Santiago, Chile 🇨🇱
💼 .NET Developer @ Serviphar
🎓 Analista Programador Computacional
⚡ Full Stack Developer

💡 Transformando ideias em código desde 2022`,
    it: `👋 Ciao! Sono Sebastian Vargas B.

📍 Santiago, Cile 🇨🇱
💼 .NET Developer @ Serviphar
🎓 Analista Programmatore Informatico
⚡ Full Stack Developer

💡 Trasformando idee in codice dal 2022`,
  },
  skills: {
    es: `🛠️ Mi Stack:

⚡ Lenguajes:     Python, C#/.NET, Java, SQL, TypeScript, Dart
🚀 Frameworks:   Django, Flutter, Angular, Ionic, .NET Core, React
🔧 Herramientas: Docker, Selenium, Git, PostgreSQL, MongoDB

🏆 Top Skills: .NET Core 92% | Flutter 90% | Python 95%`,
    en: `🛠️ My Stack:

⚡ Languages:     Python, C#/.NET, Java, SQL, TypeScript, Dart
🚀 Frameworks:   Django, Flutter, Angular, Ionic, .NET Core, React
🔧 Tools:        Docker, Selenium, Git, PostgreSQL, MongoDB

🏆 Top Skills: .NET Core 92% | Flutter 90% | Python 95%`,
    pt: `🛠️ Meu Stack:

⚡ Languages:     Python, C#/.NET, Java, SQL, TypeScript, Dart
🚀 Frameworks:    Django, Flutter, Angular, Ionic, .NET Core, React
🔧 Ferramentas:  Docker, Selenium, Git, PostgreSQL, MongoDB

🏆 Top Skills: .NET Core 92% | Flutter 90% | Python 95%`,
    it: `🛠️ Il Mio Stack:

⚡ Linguaggi:     Python, C#/.NET, Java, SQL, TypeScript, Dart
🚀 Framework:    Django, Flutter, Angular, Ionic, .NET Core, React
🔧 Strumenti:     Docker, Selenium, Git, PostgreSQL, MongoDB

🏆 Top Skills: .NET Core 92% | Flutter 90% | Python 95%`,
  },
  projects: {
    es: `🚀 Proyectos:

• ArtMind     → Plataforma de terapia de arte (Django)
• Sparedrive  → E-commerce repuestos (Django + JS)  
• Scrappers    → Scraping automation (Python + Selenium)
• PetOut       → App de mascotas (Flutter) 📱
• Prac        → Comunicación LoRa (Flutter + IoT)

📌 Ver todos: #proyectos`,
    en: `🚀 Projects:

• ArtMind     → Art therapy platform (Django)
• Sparedrive  → Auto parts e-commerce (Django + JS)
• Scrappers    → Scraping automation (Python + Selenium)
• PetOut       → Pet management app (Flutter) 📱
• Prac        → LoRa communication (Flutter + IoT)

📌 View all: #proyectos`,
    pt: `🚀 Projetos:

• ArtMind     → Plataforma de arteterapia (Django)
• Sparedrive  → E-commerce de peças (Django + JS)
• Scrappers    → Automação de scraping (Python + Selenium)
• PetOut       → App de gestão de pets (Flutter) 📱
• Prac        → Comunicação LoRa (Flutter + IoT)

📌 Ver todos: #proyectos`,
    it: `🚀 Progetti:

• ArtMind     → Piattaforma di arteterapia (Django)
• Sparedrive  → E-commerce ricambi (Django + JS)
• Scrappers    → Automazione scraping (Python + Selenium)
• PetOut       → App gestione animali (Flutter) 📱
• Prac        → Comunicazione LoRa (Flutter + IoT)

📌 Vedi tutti: #proyectos`,
  },
  contact: {
    es: `📬 ¡Conectemos!

📧 Email:    sebavarber.proton.me
📱 WhatsApp: +569 36396900
💼 LinkedIn: linkedin.com/in/svb404
💻 GitHub:   github.com/Dratenkko

✨ Disponible para proyectos freelance`,
    en: `📬 Let's connect!

📧 Email:    sebavarber.proton.me
📱 WhatsApp: +569 36396900
💼 LinkedIn: linkedin.com/in/svb404
💻 GitHub:   github.com/Dratenkko

✨ Available for freelance projects`,
    pt: `📬 Vamos nos conectar!

📧 Email:    sebavarber.proton.me
📱 WhatsApp: +569 36396900
💼 LinkedIn: linkedin.com/in/svb404
💻 GitHub:   github.com/Dratenkko

✨ Disponível para projetos freelance`,
    it: `📬 Connettiamoci!

📧 Email:    sebavarber.proton.me
📱 WhatsApp: +569 36396900
💼 LinkedIn: linkedin.com/in/svb404
💻 GitHub:   github.com/Dratenkko

✨ Disponibile per progetti freelance`,
  },
  github: '🌐 Abriendo GitHub...',
  linkedin: '🌐 Abriendo LinkedIn...',
  clear: '__CLEAR__',
};

const quickLinks = [
  { label: 'GitHub', icon: Github, url: 'https://github.com/Dratenkko' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/svb404' },
  { label: 'WhatsApp', icon: Mail, url: 'https://wa.me/56936396900' },
];

interface InteractiveTerminalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal = ({ language, isOpen, onClose }: InteractiveTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
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
  }, [history]);

  useEffect(() => {
    if (isOpen && showWelcome) {
      setShowWelcome(false);
      setHistory([{
        input: 'init',
        output: language === 'es' 
          ? `⚡ Bienvenido al Terminal Interactivo\n💡 Escribe "help" para ver comandos\n─`.padEnd(40, '─')
          : `⚡ Welcome to Interactive Terminal\n💡 Type "help" for commands\n─`.padEnd(40, '─'),
        type: 'response',
      }]);
    }
  }, [isOpen, language, showWelcome]);

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();

    if (command === 'clear') {
      setHistory([{
        input: 'clear',
        output: language === 'es' ? '🧹 Terminal limpiado' : '🧹 Terminal cleared',
        type: 'response',
      }]);
      return;
    }

    if (command === 'github') {
      window.open('https://github.com/Dratenkko', '_blank');
      setHistory((prev) => [
        ...prev,
        { input: cmd, output: commands.github, type: 'command' },
      ]);
      return;
    }

    if (command === 'linkedin') {
      window.open('https://linkedin.com/in/svb404', '_blank');
      setHistory((prev) => [
        ...prev,
        { input: cmd, output: commands.linkedin, type: 'command' },
      ]);
      return;
    }

    const commandKeys = ['help', 'about', 'skills', 'projects', 'contact'];
    if (commandKeys.includes(command)) {
      setHistory((prev) => [
        ...prev,
        { input: cmd, output: (commands[command as keyof typeof commands] as Record<string, string>)[language] ?? '', type: 'command' },
      ]);
    } else if (cmd.trim()) {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: language === 'es'
            ? `❌ "${cmd}" no encontrado\n💡 Escribe "help"`
            : `❌ "${cmd}" not found\n💡 Type "help"`,
          type: 'error',
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      setIsTyping(true);
      processCommand(input);
      setInput('');
      setTimeout(() => setIsTyping(false), 50);
    }
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
                <Terminal size={16} className="text-cyan-400" />
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-cyan-400 rounded-full blur-sm"
                />
              </div>
              <span className="text-xs font-mono text-cyan-400/80">sebastian@dev</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700"
          >
            {history.map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="space-y-1"
              >
                {cmd.input !== 'init' && (
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-sm">❯</span>
                    <span className="text-white/90 font-mono text-sm">{cmd.input}</span>
                  </div>
                )}
                <div
                  className={`pl-6 font-mono text-sm whitespace-pre-wrap leading-relaxed ${
                    cmd.type === 'error'
                      ? 'text-red-400'
                      : cmd.type === 'response'
                      ? 'text-cyan-300/90'
                      : 'text-gray-300'
                  }`}
                >
                  {cmd.output}
                </div>
              </motion.div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 pl-6"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-cyan-400 font-mono text-sm"
                >
                  ▋
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-gray-800/60 border-t border-gray-700/30">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-xl border border-gray-700/30">
              <Code2 size={14} className="text-purple-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'es' ? 'escribe un comando...' : 'type a command...'}
                className="flex-1 bg-transparent text-white/90 font-mono text-sm outline-none placeholder-gray-600"
                autoComplete="off"
              />
              <Sparkles size={12} className="text-cyan-400 animate-pulse flex-shrink-0" />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.label}
                  type="button"
                  onClick={() => window.open(link.url, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-xs text-gray-400 hover:text-white transition-colors border border-gray-700/30"
                >
                  <link.icon size={11} />
                  {link.label}
                  <ExternalLink size={9} className="opacity-50" />
                </motion.button>
              ))}
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
