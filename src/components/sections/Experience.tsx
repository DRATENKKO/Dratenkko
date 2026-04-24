import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience, translations } from '../../data/constants';

interface ExperienceSectionProps {
  language: string;
}

export const Experience = ({ language }: ExperienceSectionProps) => {
  const t = translations;

  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-gray-50 dark:bg-deep-ocean relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t.experience.title[language as keyof typeof t.experience.title]}
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform sm:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.6, ease: 'easeOut' }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8 ${isLeft ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900">
                      <Briefcase size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:text-right' : 'sm:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white dark:bg-deep-lighter rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      <div className="relative z-10">
                        {/* Company Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3 ${isLeft ? 'sm:float-right sm:ml-3' : ''}`}>
                          <span className="text-xs font-bold text-white">{exp.company}</span>
                        </div>

                        {/* Clear float */}
                        <div className="clear-both sm:clear-none"></div>

                        {/* Role */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.role}
                        </h3>

                        {/* Meta Info */}
                        <div className={`flex flex-wrap gap-3 mb-4 ${isLeft ? 'sm:justify-end' : ''}`}>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-semibold">
                            <MapPin size={12} />
                            {language === 'es' ? 'Chile 🇨🇱' : language === 'en' ? 'Chile 🇨🇱' : 'Chile'}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {exp.description[language as keyof typeof exp.description]}
                        </p>

                        {/* Decorative element */}
                        <div className={`absolute top-4 ${isLeft ? 'left-4 sm:left-auto sm:right-4' : 'left-4'} w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:bg-gradient-to-br group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500`}></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden sm:block sm:w-[calc(50%-2rem)] ${isLeft ? '' : 'sm:text-right'}`}></div>
                </motion.div>
              );
            })}
          </div>

          {/* End Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center mt-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-900 animate-pulse">
              <span className="text-2xl">🚀</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
