import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { languageOptions, translations } from '../../data/constants';

interface NavbarProps {
  isDarkMode: boolean;
  language: string;
  isMenuOpen: boolean;
  isLanguageMenuOpen: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: (lang: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  setIsLanguageMenuOpen: (open: boolean) => void;
}

export const Navbar = ({
  isDarkMode,
  language,
  isMenuOpen,
  isLanguageMenuOpen,
  toggleDarkMode,
  toggleLanguage,
  setIsMenuOpen,
  setIsLanguageMenuOpen,
}: NavbarProps) => {
  const t = translations;

  // PNG Flags - Imágenes descargadas en public/flags/
  const Flags = {
    es: (
      <img
        src={`${import.meta.env.BASE_URL}flags/chile.png`}
        alt="Chile"
        className="w-full h-full object-contain"
      />
    ),
    en: (
      <img
        src={`${import.meta.env.BASE_URL}flags/usa.png`}
        alt="USA"
        className="w-full h-full object-contain"
      />
    ),
    pt: (
      <img
        src={`${import.meta.env.BASE_URL}flags/brazil.png`}
        alt="Brazil"
        className="w-full h-full object-contain"
      />
    ),
    it: (
      <img
        src={`${import.meta.env.BASE_URL}flags/italia.png`}
        alt="Italy"
        className="w-full h-full object-contain"
      />
    ),
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-deep-ocean/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo - Responsive sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            SVB
          </motion.div>

          {/* Desktop Navigation - Hide on small screens */}
          <div className="hidden lg:flex items-center gap-4 sm:gap-6 lg:gap-8">
            <a href="#inicio" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.home[language as keyof typeof t.nav.home]}
            </a>
            <a href="#experiencia" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.experience[language as keyof typeof t.nav.experience]}
            </a>
            <a href="#habilidades" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.skills[language as keyof typeof t.nav.skills]}
            </a>
            <a href="#proyectos" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.projects[language as keyof typeof t.nav.projects]}
            </a>
            <a href="#certificados" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.certificates[language as keyof typeof t.nav.certificates]}
            </a>
            <a href="#contacto" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2">
              {t.nav.contact[language as keyof typeof t.nav.contact]}
            </a>
          </div>

          {/* Controls - Better spacing */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle - Touch-friendly size */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-yellow-400/20 dark:to-yellow-600/20 hover:from-gray-200 hover:to-gray-300 dark:hover:from-yellow-400/30 dark:hover:to-yellow-600/30 border border-gray-300 dark:border-yellow-500/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              title={isDarkMode ? t.lightMode[language as keyof typeof t.lightMode] : t.darkMode[language as keyof typeof t.darkMode]}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </motion.button>

            {/* Language Selector - Responsive dropdown */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50 border-2 border-blue-300 dark:border-blue-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[44px]"
                title={t.changeLanguage[language as keyof typeof t.changeLanguage]}
                aria-label="Change language"
              >
                <Globe size={16} className="text-blue-600 dark:text-blue-400 sm:w-[18px] sm:h-[18px]" />
                <div className="w-12 h-8 sm:w-16 sm:h-10 flex items-center justify-center overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600">
                  {Flags[language as keyof typeof Flags]}
                </div>
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 sm:mt-3 w-[280px] sm:w-72 bg-white dark:bg-deep-ocean rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 overflow-hidden z-50 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-b border-blue-200 dark:border-blue-800 sticky top-0">
                      <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100 px-2 py-1 sm:py-1.5">Seleccionar idioma</p>
                    </div>
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => toggleLanguage(option.code)}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-blue-50 dark:bg-blue-900/20 text-left flex items-center gap-3 sm:gap-4 transition-all duration-200 border-b last:border-b-0 border-gray-300 dark:border-gray-700 min-h-[60px] ${
                          language === option.code
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                            : 'text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-white/10 hover:shadow-md'
                        }`}
                      >
                        <div className={`w-10 h-7 sm:w-12 sm:h-8 flex items-center justify-center overflow-hidden rounded-xl shadow-md flex-shrink-0 ${
                          language === option.code ? 'bg-white/20' : 'bg-white'
                        }`}>
                          {Flags[option.code as keyof typeof Flags]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-xs sm:text-sm ${language === option.code ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                            {option.name}
                          </p>
                          <p className={`text-[10px] sm:text-xs mt-0.5 ${language === option.code ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            {language === 'es' && option.code === 'es' ? 'Idioma actual' :
                             language === 'en' && option.code === 'en' ? 'Current language' :
                             language === 'pt' && option.code === 'pt' ? 'Idioma atual' :
                             language === 'it' && option.code === 'it' ? 'Lingua attuale' :
                             language === 'es' ? 'Cambiar' : language === 'en' ? 'Change' : language === 'pt' ? 'Mudar' : 'Cambia'}
                          </p>
                        </div>
                        {language === option.code && (
                          <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu Button - Larger touch target */}
          <motion.button
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu - Better spacing */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 space-y-1"
            >
              <a href="#inicio" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.home[language as keyof typeof t.nav.home]}
              </a>
              <a href="#experiencia" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.experience[language as keyof typeof t.nav.experience]}
              </a>
              <a href="#habilidades" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.skills[language as keyof typeof t.nav.skills]}
              </a>
              <a href="#proyectos" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.projects[language as keyof typeof t.nav.projects]}
              </a>
              <a href="#certificados" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.certificates[language as keyof typeof t.nav.certificates]}
              </a>
              <a href="#contacto" className="block px-4 py-3 rounded-lg text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-lighter transition-colors min-h-[48px] flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t.nav.contact[language as keyof typeof t.nav.contact]}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
