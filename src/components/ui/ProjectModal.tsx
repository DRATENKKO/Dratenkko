import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code2, Award, Database, XCircle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Project } from '../../data/constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Helper function to get image URL with base path
const getImageUrl = (path: string): string => {
  return `${import.meta.env.BASE_URL}${path}`;
};

// Helper function to get video URL with base path
const getVideoUrl = (path: string): string => {
  return `${import.meta.env.BASE_URL}${path}`;
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  language: string;
}

export const ProjectModal = ({ project, onClose, language }: ProjectModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  // Focus trap + close on Escape + click outside
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <motion.div
          ref={modalRef}
          initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="bg-white dark:bg-deep-ocean rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-deep-ocean border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4 z-10">
            <div className="flex-1 min-w-0">
              <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {project.company} | {project.period}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center flex-shrink-0"
              aria-label="Cerrar modal"
            >
              <XCircle size={28} className="sm:w-8 sm:h-8 text-gray-600 dark:text-gray-400" aria-hidden="true" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Video Section */}
            {project.videoUrl && (
              <div className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden aspect-video">
                <video
                  className="w-full h-full object-contain"
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  poster={getImageUrl(project.thumbnail)}
                >
                  <source src={getVideoUrl(project.videoUrl)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.role}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {project.fullDescription[language as keyof typeof project.fullDescription]}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Code2 size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                {language === 'en' ? 'Technologies' : language === 'pt' ? 'Tecnologias' : language === 'it' ? 'Tecnologie' : 'Tecnologías'}
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-green-200 dark:border-green-800">
              <h4 className="text-base sm:text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                <Award size={18} className="text-green-600 dark:text-green-400" aria-hidden="true" />
                {language === 'en' ? 'Achievements' : language === 'pt' ? 'Conquistas' : language === 'it' ? 'Risultati' : 'Logros'}
              </h4>
              <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 whitespace-pre-line leading-relaxed">
                {project.achievements[language as keyof typeof project.achievements]}
              </p>
            </div>

            {/* Image Gallery */}
            {project.images.length > 0 && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Database size={18} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  {language === 'en' ? 'Gallery' : language === 'pt' ? 'Galeria' : language === 'it' ? 'Galleria' : 'Galería'}
                </h4>
                <div className="relative">
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl" ref={emblaRef}>
                    <div className="flex">
                      {project.images.map((image, idx) => (
                        <div key={idx} className="flex-[0_0_100%] min-w-0">
                          <div className="p-1">
                            <img
                              src={getImageUrl(image.url)}
                              alt={image.caption[language as keyof typeof image.caption]}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-lg sm:rounded-xl"
                            />
                            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 px-2">
                              {image.caption[language as keyof typeof image.caption]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Navigation */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={scrollPrev}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200" aria-hidden="true" />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Imagen siguiente"
                      >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200" aria-hidden="true" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center gap-2 mt-4">
                        {project.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => emblaApi?.scrollTo(idx)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                              idx === selectedIndex
                                ? 'bg-blue-600 w-6 sm:w-8'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            aria-label={`Ir a imagen ${idx + 1}`}
                            aria-current={idx === selectedIndex ? 'true' : undefined}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
