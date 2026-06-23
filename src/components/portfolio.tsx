import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import { Project } from '../data/constants';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { HeroEditorial } from './sections/HeroEditorial';
import { VisitorReach } from './sections/VisitorReach';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { GitHubStats } from './sections/GitHubStats';
import { Credentials } from './sections/Credentials';
import { Contact } from './sections/Contact';
import { InteractiveTerminal } from './ui/InteractiveTerminal';
import { ProjectModal } from './ui/ProjectModal';
import '../pro.css';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme === null ? systemDark : savedTheme === 'true';
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', String(next));
  };

  const toggleLanguage = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  const assistantLabel = language === 'es' ? 'Pregúntame sobre mi experiencia' : language === 'pt' ? 'Pergunte sobre minha experiência' : language === 'it' ? 'Chiedi della mia esperienza' : 'Ask about my experience';

  return (
    <div className="portfolio-pro min-h-screen">
      <Navbar isDarkMode={isDarkMode} language={language} isMenuOpen={isMenuOpen} isLanguageMenuOpen={isLanguageMenuOpen} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} setIsMenuOpen={setIsMenuOpen} setIsLanguageMenuOpen={setIsLanguageMenuOpen} />
      <main id="main-content">
        <HeroEditorial language={language} />
        <VisitorReach language={language} />
        <Experience language={language} />
        <Skills language={language} />
        <Projects language={language} onSelectProject={setSelectedProject} />
        <GitHubStats />
        <Credentials language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} language={language} />}</AnimatePresence>
      <button type="button" onClick={() => setIsAssistantOpen(true)} className="fixed bottom-5 right-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-full border border-stone-300 bg-white/95 px-4 py-3 text-sm font-semibold text-stone-800 shadow-[0_12px_35px_rgba(41,37,36,0.14)] backdrop-blur hover:border-stone-500 dark:border-slate-700 dark:bg-slate-900/95 dark:text-white dark:hover:border-slate-500 sm:right-6" aria-label={assistantLabel}><MessageSquareText size={18} aria-hidden="true" /><span className="hidden sm:inline">{assistantLabel}</span></button>
      <InteractiveTerminal language={language} isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default Portfolio;
