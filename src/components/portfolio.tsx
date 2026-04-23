import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Sparkles, PartyPopper } from 'lucide-react';
import { Project } from '../data/constants';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Testimonials } from './sections/Testimonials';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certificates } from './sections/Certificates';
import { GitHubStats } from './sections/GitHubStats';
import { Contact } from './sections/Contact';
import { Blog } from './sections/Blog';
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
  const [showTerminalHint, setShowTerminalHint] = useState(true);
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

    // Hide terminal hint after 5 seconds
    const timer = setTimeout(() => setShowTerminalHint(false), 5000);
    return () => clearTimeout(timer);
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
        <Testimonials language={language} />
        <Skills language={language} />
        <GitHubStats />
        <Blog language={language} />
        <Projects language={language} onSelectProject={handleSelectProject} />
        <Certificates language={language} />
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

      {/* Floating Terminal Button */}
      <div className="fixed bottom-24 left-4 sm:left-8 z-50">
        <AnimatePresence>
          {showTerminalHint && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-2 px-3 py-2 bg-gray-800/90 dark:bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700"
            >
              <p className="text-xs text-gray-300 whitespace-nowrap">
                💡 Terminal interactiva disponible
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsTerminalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20">
            <Sparkles size={24} className="text-white" />
          </div>

          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-30"></div>
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
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl z-50 border-2 border-white/20"
      >
        <MessageCircle size={28} className="text-white" />
        {/* Green glow */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50"></div>
      </motion.a>

      {/* Interactive Terminal */}
      <InteractiveTerminal
        language={language}
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Konami Code Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 p-12 rounded-3xl shadow-2xl text-center"
            >
              <PartyPopper size={80} className="mx-auto mb-4 text-yellow-400 animate-bounce" />
              <h2 className="text-4xl font-bold text-white mb-4">🎉 ¡Easter Egg! 🎉</h2>
              <p className="text-xl text-white/80 mb-6">¡Encontraste el código secreto!</p>
              <p className="text-sm text-white/60">Sebastián sabe que eres un developer de verdad 👨‍💻</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
