import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experience, translations } from '../../data/constants';

interface ExperienceSectionProps {
  language: string;
}

export const Experience = ({ language }: ExperienceSectionProps) => {
  const t = translations;

  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-gray-50 dark:bg-deep-lighter">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.experience.title[language as keyof typeof t.experience.title]}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-deep-ocean rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Briefcase size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-2">
                    {exp.company}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                    {exp.period}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description[language as keyof typeof exp.description]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
