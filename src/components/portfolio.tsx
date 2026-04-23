import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Sparkles, PartyPopper } from 'lucide-react';
import { Project } from '../data/constants';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
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

      {/* Creative Terminal Button */}
      <div className="fixed bottom-24 left-4 sm:left-6 z-50">
        <motion.button
          onClick={() => setIsTerminalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
          aria-label="Abrir terminal creativo"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-700">
            <Sparkles size={20} className="text-cyan-400" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-ping opacity-20" />
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
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl z-50 border-2 border-white/20 hover:shadow-2xl transition-all min-w-[56px] min-h-[56px]"
      >
        <MessageCircle size={26} className="text-white" />
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50" />
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
