import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Project } from '../data/constants';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certificates } from './sections/Certificates';
import { Contact } from './sections/Contact';
import { ProjectModal } from './ui/ProjectModal';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    </div>
  );
};

export default Portfolio;
