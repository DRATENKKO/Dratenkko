import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
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

        <div className="max-w-4xl mx-auto space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card bg-white dark:bg-deep-ocean border border-gray-200 dark:border-gray-700 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="badge badge-primary">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className="badge badge-secondary">
                      <MapPin size={12} />
                      {language === 'es' ? 'Chile' : language === 'en' ? 'Chile' : language === 'pt' ? 'Chile' : 'Cile'}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
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