import { motion } from 'framer-motion';
import { Linkedin, Github, Award, Sparkles } from 'lucide-react';
import { translations, contactInfo } from '../../data/constants';

interface HeroProps {
  language: string;
}

export const Hero = ({ language }: HeroProps) => {
  const t = translations;

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 relative overflow-hidden">
      {/* Animated Background - Responsive blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-deep-ocean dark:via-blue-900/20 dark:to-purple-900/20 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Title with floating icon - Fluid typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <Sparkles className="text-purple-500 w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              {t.hero.title}
            </h1>
            <Sparkles className="text-purple-500 w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
          </motion.div>

          {/* Subtitle - Responsive sizing */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl inline-block"
          >
            {t.hero.subtitle[language as keyof typeof t.hero.subtitle]}
          </motion.p>

          {/* Description - Fluid text with better readability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t.hero.description[language as keyof typeof t.hero.description]}
          </motion.p>

          {/* Enhanced CTA Buttons - Stack on mobile, side-by-side on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 px-4 w-full sm:w-auto"
          >
            <a
              href="#proyectos"
              className="group px-8 py-4 sm:px-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-h-[52px]"
            >
              {t.hero.cta1[language as keyof typeof t.hero.cta1]}
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 sm:px-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-blue-500 dark:border-blue-400 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[52px] flex items-center justify-center"
            >
              {t.hero.cta2[language as keyof typeof t.hero.cta2]}
            </a>
          </motion.div>

          {/* Enhanced Social Links - Better touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 sm:gap-6 justify-center pt-4 sm:pt-6"
          >
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 text-blue-600 border-2 border-transparent hover:border-blue-500 min-w-[56px] min-h-[56px] flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} className="sm:w-7 sm:h-7" />
            </a>
            <a
              href="https://github.com/Dratenkko"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 text-gray-900 dark:text-white border-2 border-transparent hover:border-gray-400 min-w-[56px] min-h-[56px] flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <Github size={24} className="sm:w-7 sm:h-7" />
            </a>
          </motion.div>

          {/* Enhanced Disability Badge - Responsive padding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 rounded-2xl border-2 border-blue-400 dark:border-blue-500 shadow-lg hover:shadow-xl transition-shadow max-w-full"
          >
            <Award size={24} className="text-blue-600 dark:text-blue-400 sm:w-7 sm:h-7" />
            <span className="text-sm sm:text-base font-bold text-blue-900 dark:text-blue-100">
              {t.hero.disabilityBadge[language as keyof typeof t.hero.disabilityBadge]}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
