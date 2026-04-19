import { motion } from 'framer-motion';
import { Linkedin, Github, Award, Sparkles, Code2 } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Title con icono flotante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-3 sm:gap-4"
          >
            <div className="relative">
              <Code2 className="absolute -left-10 sm:-left-14 top-1/2 -translate-y-1/2 text-purple-500 w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                {t.hero.title}
              </h1>
              <Sparkles className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl inline-block"
          >
            {t.hero.subtitle[language as keyof typeof t.hero.subtitle]}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            {t.hero.description[language as keyof typeof t.hero.description]}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 w-full max-w-md mx-auto"
          >
            <a
              href="#proyectos"
              className="btn btn-primary w-full sm:w-auto"
            >
              {t.hero.cta1[language as keyof typeof t.hero.cta1]}
              <Sparkles className="w-4 h-4" />
            </a>
            <a
              href="#contacto"
              className="btn btn-secondary w-full sm:w-auto"
            >
              {t.hero.cta2[language as keyof typeof t.hero.cta2]}
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
          >
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !p-3 !min-h-[48px] !min-w-[48px] sm:!p-4 sm:!min-h-[52px] sm:!min-w-[52px]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://github.com/Dratenkko"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !p-3 !min-h-[48px] !min-w-[48px] sm:!p-4 sm:!min-h-[52px] sm:!min-w-[52px]"
              aria-label="GitHub Profile"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
          </motion.div>

          {/* Disability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 rounded-xl sm:rounded-2xl border-2 border-blue-400 dark:border-blue-500 shadow-lg hover:shadow-xl transition-shadow max-w-full"
          >
            <Award size={18} className="text-blue-600 dark:text-blue-400 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-100 text-left">
              {t.hero.disabilityBadge[language as keyof typeof t.hero.disabilityBadge]}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};