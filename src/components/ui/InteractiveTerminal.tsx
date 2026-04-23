import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Sparkles, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

interface TerminalCommand {
  input: string;
  output: string;
  type: 'command' | 'response' | 'error';
}

const commands = {
  help: {
    es: `📖 Comandos disponibles:
  • help     → Muestra esta ayuda
  • about     → Sobre mí
  • skills    → Mis habilidades
  • projects  → Ver proyectos
  • contact   → Información de contacto
  • github    → Mi GitHub
  • linkedin  → Mi LinkedIn
  • clear     → Limpiar terminal`,
    en: `📖 Available commands:
  • help     → Show this help
  • about     → About me
  • skills    → My skills
  • projects  → View projects
  • contact   → Contact info
  • github    → My GitHub
  • linkedin  → My LinkedIn
  • clear     → Clear terminal`,
    pt: `📖 Comandos disponíveis:
  • help     → Mostra esta ajuda
  • about     → Sobre mim
  • skills    → Minhas habilidades
  • projects  → Ver projetos
  • contact   → Info de contato
  • github    → Meu GitHub
  • linkedin  → Meu LinkedIn
  • clear     → Limpar terminal`,
    it: `📖 Comandi disponibili:
  • help     → Mostra questo aiuto
  • about     → Chi sono
  • skills    → Le mie abilità
  • projects  → Vedi progetti
  • contact   → Info contatto
  • github    → Il mio GitHub
  • linkedin  → Il mio LinkedIn
  • clear     → Pulisci terminale`,
  },
  about: {
    es: `👋 Hola! Soy Sebastian Vargas B.
📍 Basado en Santiago, Chile
💼 .NET Developer en Serviphar
🎓 Analista Programador Computacional
🌐 Full Stack Developer
📧 sebavarber.proton.me
📱 +569 36396900`,
    en: `👋 Hi! I'm Sebastian Vargas B.
📍 Based in Santiago, Chile
💼 .NET Developer at Serviphar
🎓 Computer Programmer Analyst
🌐 Full Stack Developer
📧 sebavarber.proton.me
📱 +569 36396900`,
    pt: `👋 Olá! Eu sou Sebastian Vargas B.
📍 Baseado em Santiago, Chile
💼 .NET Developer na Serviphar
🎓 Analista Programador Computacional
🌐 Full Stack Developer
📧 sebavarber.proton.me
📱 +569 36396900`,
    it: `👋 Ciao! Sono Sebastian Vargas B.
📍 Basato a Santiago, Cile
💼 .NET Developer presso Serviphar
🎓 Analista Programmatore Informatico
🌐 Full Stack Developer
📧 sebavarber.proton.me
📱 +569 36396900`,
  },
  skills: {
    es: `🛠️ Stack Tecnológico:
  Languages:  Python, C#/.NET, Java, SQL, TypeScript, Dart
  Frameworks:  Django, Flutter, Angular, Ionic, .NET Core, React
  Tools:       Docker, Selenium, Git, PostgreSQL, MongoDB
  🌟 Destacado: .NET Core 92%, Flutter 90%, Python 95%`,
    en: `🛠️ Tech Stack:
  Languages:  Python, C#/.NET, Java, SQL, TypeScript, Dart
  Frameworks:  Django, Flutter, Angular, Ionic, .NET Core, React
  Tools:       Docker, Selenium, Git, PostgreSQL, MongoDB
  🌟 Featured: .NET Core 92%, Flutter 90%, Python 95%`,
    pt: `🛠️ Stack Tecnológico:
  Languages:  Python, C#/.NET, Java, SQL, TypeScript, Dart
  Frameworks:  Django, Flutter, Angular, Ionic, .NET Core, React
  Tools:       Docker, Selenium, Git, PostgreSQL, MongoDB
  🌟 Destacado: .NET Core 92%, Flutter 90%, Python 95%`,
    it: `🛠️ Stack Tecnologico:
  Languages:  Python, C#/.NET, Java, SQL, TypeScript, Dart
  Frameworks:  Django, Flutter, Angular, Ionic, .NET Core, React
  Tools:       Docker, Selenium, Git, PostgreSQL, MongoDB
  🌟 In evidenza: .NET Core 92%, Flutter 90%, Python 95%`,
  },
  projects: {
    es: `🚀 Proyectos destacados:
  • ArtMind     - Plataforma de terapia de arte
  • Sparedrive  - E-commerce de repuestos (EN PRODUCCIÓN)
  • Scrappers    - Sistema de scraping avanzado
  • App Mobile   - App Flutter de productividad
  • PetOut       - App de gestión de mascotas 🐕
  • Prac        - App de comunicación LoRa
  
  💻 github.com/Dratenkko`,
    en: `🚀 Featured projects:
  • ArtMind     - Art therapy platform
  • Sparedrive  - Auto parts e-commerce (IN PRODUCTION)
  • Scrappers    - Advanced scraping system
  • App Mobile   - Flutter productivity app
  • PetOut       - Pet management app 🐕
  • Prac        - LoRa communication app
  
  💻 github.com/Dratenkko`,
    pt: `🚀 Projetos em destaque:
  • ArtMind     - Plataforma de terapia de arte
  • Sparedrive  - E-commerce de peças (EM PRODUÇÃO)
  • Scrappers    - Sistema de scraping avançado
  • App Mobile   - App Flutter de produtividade
  • PetOut       - App de gestão de pets 🐕
  • Prac        - App de comunicação LoRa
  
  💻 github.com/Dratenkko`,
    it: `🚀 Progetti in evidenza:
  • ArtMind     - Piattaforma di arteterapia
  • Sparedrive  - E-commerce ricambi (IN PRODUZIONE)
  • Scrappers    - Sistema di scraping avanzato
  • App Mobile   - App Flutter di produttività
  • PetOut       - App gestione animali 🐕
  • Prac        - App comunicazione LoRa
  
  💻 github.com/Dratenkko`,
  },
  contact: {
    es: `📬 Información de contacto:
  📧 Email:    sebavarber.proton.me
  📱 Tel:      +569 36396900
  💼 LinkedIn: linkedin.com/in/svb404
  💻 GitHub:   github.com/Dratenkko
  📍 Ubicación: Santiago, Chile 🇨🇱

  ✨ Disponible para nuevos proyectos`,
    en: `📬 Contact information:
  📧 Email:    sebavarber.proton.me
  📱 Phone:    +569 36396900
  💼 LinkedIn: linkedin.com/in/svb404
  💻 GitHub:   github.com/Dratenkko
  📍 Location: Santiago, Chile 🇨🇱

  ✨ Available for new projects`,
    pt: `📬 Informações de contato:
  📧 Email:    sebavarber.proton.me
  📱 Tel:      +569 36396900
  💼 LinkedIn: linkedin.com/in/svb404
  💻 GitHub:   github.com/Dratenkko
  📍 Localização: Santiago, Chile 🇨🇱

  ✨ Disponível para novos projetos`,
    it: `📬 Informazioni di contatto:
  📧 Email:    sebavarber.proton.me
  📱 Tel:      +569 36396900
  💼 LinkedIn: linkedin.com/in/svb404
  💻 GitHub:   github.com/Dratenkko
  📍 Luogo:    Santiago, Cile 🇨🇱

  ✨ Disponibile per nuovi progetti`,
  },
  github: '🌐 Abriendo github.com/Dratenkko...',
  linkedin: '🌐 Abriendo linkedin.com/in/svb404...',
  clear: '__CLEAR__',
};

const quickLinks = [
  { label: 'GitHub', icon: Github, url: 'https://github.com/Dratenkko' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/svb404' },
  { label: 'Email', icon: Mail, url: 'mailto:sebavarber.proton.me' },
];

interface InteractiveTerminalProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal = ({ language, isOpen, onClose }: InteractiveTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      input: 'help',
      output: commands.help[language as keyof typeof commands.help],
      type: 'command',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
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

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();

    if (command === 'clear') {
      setHistory([]);
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
    } else {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: language === 'es'
            ? `❌ Comando no reconocido: "${cmd}"\n💡 Escribe "help" para ver los comandos disponibles.`
            : language === 'en'
            ? `❌ Unknown command: "${cmd}"\n💡 Type "help" to see available commands.`
            : `❌ Comando não reconhecido: "${cmd}"\n💡 Digite "help" para ver os comandos disponíveis.`,
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
      setTimeout(() => setIsTyping(false), 100);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 max-h-[500px] bg-gray-900 dark:bg-black rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-green-400" />
            <span className="text-sm font-bold text-green-400">sebastian@portfolio:~</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700"
        >
          {history.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              {/* Command line */}
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-mono text-sm">→</span>
                <span className="text-white font-mono text-sm">{cmd.input}</span>
              </div>

              {/* Output */}
              <div
                className={`pl-6 font-mono text-sm whitespace-pre-wrap leading-relaxed ${
                  cmd.type === 'error'
                    ? 'text-red-400'
                    : 'text-gray-300'
                }`}
              >
                {cmd.output}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ChevronRight size={16} className="text-green-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'es' ? 'Escribe un comando...' : 'Type a command...'}
              className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-gray-500"
              autoComplete="off"
            />
            <Sparkles size={14} className="text-purple-400 animate-pulse" />
          </div>

          {/* Quick links */}
          <div className="flex gap-2 mt-3">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => window.open(link.url, '_blank')}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs text-gray-300 transition-colors"
              >
                <link.icon size={12} />
                {link.label}
                <ExternalLink size={10} />
              </button>
            ))}
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
