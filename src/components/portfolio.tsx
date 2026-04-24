import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Sparkles, PartyPopper } from 'lucide-react';
import { Project } from '../data/constants';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { InteractiveTerminal } from './ui/InteractiveTerminal';
import { ProjectModal } from './ui/ProjectModal';
import { CustomCursor, useEasterEgg } from './ui/CustomCursor';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { showEasterEgg } = useEasterEgg();

  // Load preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
      document.documentElement.classList.toggle('dark', savedDarkMode === 'true');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLanguageMenuOpen(false);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-deep-ocean transition-colors duration-500">
      <CustomCursor />
      <Navbar
        isDarkMode={isDarkMode}
        language={language}
        isMenuOpen={isMenuOpen}
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
        setIsMenuOpen={setIsMenuOpen}
        setIsLanguageMenuOpen={setIsLanguageMenuOpen}
      />

      <main>
        <Hero language={language} />
        <Experience language={language} />
        <Skills language={language} />
        <Projects language={language} onSelectProject={handleSelectProject} />
        <Contact language={language} />
      </main>

      <Footer language={language} />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* AI Terminal Button - WhatsApp style pulsing */}
      <div className="fixed bottom-24 right-6 z-50">
        <motion.button
          onClick={() => setIsTerminalOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative group"
          aria-label="Abrir terminal creativo"
        >
          {/* Outer pulsing ring - WhatsApp style */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-ping opacity-30" style={{animationDuration: '2s', animationDelay: '0s'}} />
          {/* Middle ring */}
          <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-40 animate-pulse" style={{animationDuration: '2.5s'}} />
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-cyan-500/50">
            <Sparkles size={20} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </div>
        </motion.button>
      </div>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/56936396900"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-colors"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#FFFFFF">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      {/* Interactive Terminal */}
      <InteractiveTerminal
        language={language}
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Konami Code Easter Egg - Creative Focus */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 text-center max-w-sm">
                {/* Emoji burst */}
                <div className="text-6xl mb-4">🎉</div>
                
                <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                  ¡Easter Egg!
                </h2>
                
                <p className="text-gray-300 text-lg mb-2">
                  {language === 'es' ? '¡Encontraste el código secreto!' :
                   language === 'en' ? 'You found the secret code!' :
                   'Você encontrou o código secreto!'}
                </p>
                
                <div className="flex justify-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-mono">↑</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-mono">↑</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-mono">↓</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-mono">↓</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-mono">←</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-mono">→</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-mono">←</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-mono">→</span>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Sebastian sabe que eres un developer 👨‍💻
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
