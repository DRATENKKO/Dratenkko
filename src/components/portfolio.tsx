import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
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
import { CustomCursor } from './ui/CustomCursor';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

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

      {/* Floating Terminal Button - Creative Hub */}
      <div className="fixed bottom-24 left-4 sm:left-6 z-50">
        <motion.button
          onClick={() => setIsTerminalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
          aria-label="Abrir terminal interactivo"
        >
          {/* Glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          
          {/* Button */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-700">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Pulse */}
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
    </div>
  );
};

export default Portfolio;
