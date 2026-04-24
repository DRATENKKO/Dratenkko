import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ElegantThemeToggleProps {
  currentMode: boolean; // isDarkMode
  toggleMode: () => void;
  language?: string;
}

export const ElegantThemeToggle = ({
  currentMode,
  toggleMode,
  language = 'es',
}: ElegantThemeToggleProps) => {
  const labels = {
    es: { light: 'Modo Claro', dark: 'Modo Oscuro' },
    en: { light: 'Light Mode', dark: 'Dark Mode' },
    pt: { light: 'Modo Claro', dark: 'Modo Escuro' },
    it: { light: 'Modo Chiaro', dark: 'Modo Scuro' },
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleMode}
        className="relative w-20 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-purple-900/50 dark:via-blue-900/50 dark:to-purple-900/50 border-2 border-gray-300 dark:border-purple-500/50 shadow-lg overflow-hidden cursor-pointer"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Background transition */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: currentMode
              ? ['from-purple-900/50', 'via-blue-900/50', 'to-purple-900/50']
              : ['from-gray-200', 'via-gray-100', 'to-gray-200'],
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Toggle knob */}
        <motion.div
          className="absolute top-1 w-8 h-8 rounded-full bg-white dark:bg-gradient-to-br from-purple-500 to-blue-500 shadow-xl flex items-center justify-center"
          animate={{
            left: currentMode ? 'calc(100% - 36px)' : '4px',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode ? 'dark' : 'light'}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentMode ? <Moon size={20} className="text-purple-400" /> : <Sun size={20} className="text-yellow-500" />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Decorative stars for dark mode */}
        {currentMode && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 20)}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ))}
          </>
        )}
      </motion.button>

      {/* Mode label */}
      <motion.p
        className="absolute -bottom-6 left-0 right-0 text-center text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap"
        key={currentMode ? 'dark-label' : 'light-label'}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentMode
          ? labels[language as keyof typeof labels].dark
          : labels[language as keyof typeof labels].light}
      </motion.p>
    </div>
  );
};

// Animated gradient background for hero
export const AnimatedGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(139, 92, 246, 0.1), 
            rgba(59, 130, 246, 0.1), 
            rgba(236, 72, 153, 0.1), 
            rgba(139, 92, 246, 0.1))`,
        }}
      />
    </div>
  );
};

// Smooth page transition
interface PageTransitionProps {
  children: React.ReactNode;
  routeKey?: string;
}

export const PageTransition = ({ children, routeKey }: PageTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Theme-aware animated border
export const AnimatedBorder = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-spin-slow" />
      <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-deep-ocean" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
