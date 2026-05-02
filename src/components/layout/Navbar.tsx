import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { languageOptions, translations } from '../../data/constants';
import { useSectionObserver } from '../../hooks/useSectionObserver';

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

const sectionIds = ['inicio', 'experiencia', 'habilidades', 'proyectos', 'credenciales', 'contacto'];

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
  const activeSection = useSectionObserver(sectionIds);

  // PNG Flags
  const Flags: Record<string, React.ReactNode> = {
    es: <img src={`${import.meta.env.BASE_URL}flags/chile.png`} alt="Chile" className="w-full h-full object-contain" />,
    en: <img src={`${import.meta.env.BASE_URL}flags/usa.png`} alt="USA" className="w-full h-full object-contain" />,
    pt: <img src={`${import.meta.env.BASE_URL}flags/brazil.png`} alt="Brazil" className="w-full h-full object-contain" />,
    it: <img src={`${import.meta.env.BASE_URL}flags/italia.png`} alt="Italy" className="w-full h-full object-contain" />,
  };

  const navItems = [
    { href: '#inicio', label: t.nav.home },
    { href: '#experiencia', label: t.nav.experience },
    { href: '#habilidades', label: t.nav.skills },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#credenciales', label: t.nav.certificates },
    { href: '#contacto', label: t.nav.contact },
  ];

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-deep-ocean/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <motion.a
              href="#inicio"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight"
              aria-label="Inicio - Sebastian Vargas Portfolio"
            >
              SVB
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {item.label[language as keyof typeof item.label]}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Controls - Right side */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                whileTap={{ scale: 0.95 }}
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDarkMode ? 'moon' : 'sun'}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? (
                      <Moon size={18} className="text-purple-500" aria-hidden="true" />
                    ) : (
                      <Sun size={18} className="text-orange-500" aria-hidden="true" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Language Selector */}
              <motion.div className="relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-all duration-200"
                  aria-label="Cambiar idioma"
                  aria-expanded={isLanguageMenuOpen}
                  aria-haspopup="listbox"
                >
                  <Globe size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <div className="w-8 h-5 sm:w-10 sm:h-6 flex items-center justify-center overflow-hidden rounded-md shadow inner-shadow-sm">
                    {Flags[language]}
                  </div>
                  <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      role="listbox"
                      aria-label="Seleccionar idioma"
                    >
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Seleccionar idioma</p>
                      </div>
                      {languageOptions.map((option) => (
                        <button
                          key={option.code}
                          onClick={() => {
                            toggleLanguage(option.code);
                            setIsLanguageMenuOpen(false);
                          }}
                          role="option"
                          aria-selected={language === option.code}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            language === option.code
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className={`w-8 h-5 flex items-center justify-center overflow-hidden rounded-md ${
                            language === option.code ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            {Flags[option.code]}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{option.name}</p>
                          </div>
                          {language === option.code && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="xl:hidden p-3 min-w-[48px] min-h-[48px] rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="xl:hidden py-3 mt-2 border-t border-gray-200 dark:border-gray-700"
              >
                {navItems.map((item, i) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center px-4 py-3 rounded-xl my-0.5 font-medium ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label[language as keyof typeof item.label]}
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};
