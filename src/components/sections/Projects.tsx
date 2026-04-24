import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { projects, translations, Project } from '../../data/constants';

// Helper function to get image URL with base path
const getImageUrl = (path: string | undefined): string => {
  if (!path) return '';
  return `${import.meta.env.BASE_URL}${path}`;
};

// Helper function to get video URL with base path
const getVideoUrl = (path: string | undefined): string => {
  if (!path) return '';
  return `${import.meta.env.BASE_URL}${path}`;
};

interface ProjectsSectionProps {
  language: string;
  onSelectProject: (project: Project) => void;
}

// 3D Tilt Card Component
const TiltCard = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full transition-shadow duration-300"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>

      {/* 3D Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)`,
          transform: 'translateZ(30px)',
        }}
      />
    </motion.div>
  );
};

export const Projects = ({ language, onSelectProject }: ProjectsSectionProps) => {
  const t = translations;

  return (
    <section id="proyectos" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-deep-ocean relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header - Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full mb-4"
          >
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">✨</span>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{t.projects.title[language as keyof typeof t.projects.title]}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            {t.projects.title[language as keyof typeof t.projects.title]}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium px-4">
            {t.projects.subtitle[language as keyof typeof t.projects.subtitle]}
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4 sm:mt-6 shadow-lg"
          />
        </motion.div>

        {/* Responsive Grid: 1 col → 2 cols (640px+) → 3 cols (1024px+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group"
            >
              <TiltCard onClick={() => onSelectProject(project)}>
                <div className="bg-white dark:bg-deep-ocean rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 relative h-full">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>

                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    {project.videoUrl ? (
                      <video
                        src={getVideoUrl(project.videoUrl)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : project.thumbnail ? (
                      <img
                        src={getImageUrl(project.thumbnail)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/95 dark:bg-black/95 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-gray-900 dark:text-white backdrop-blur-md shadow-lg border-2 border-blue-500 dark:border-blue-400">
                      {project.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {project.shortDescription[language as keyof typeof project.shortDescription]}
                    </p>

                    {/* Company & Role */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Database size={14} className="text-blue-500 sm:w-4 sm:h-4" />
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {project.company}
                      </p>
                      <span className="text-gray-400">•</span>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {project.role}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-800 dark:text-blue-200 rounded-lg sm:rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 sm:px-2.5 py-1 sm:py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-3 sm:mt-4">
                      <span className="font-medium">{project.company}</span>
                      <span>{project.period.split('—')[0]}</span>
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 pointer-events-none" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
