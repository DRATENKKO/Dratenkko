import { motion } from 'framer-motion';
import { Code2, Wrench, Globe2, Award } from 'lucide-react';
import { skills, languageSkills, translations } from '../../data/constants';

interface SkillsSectionProps {
  language: string;
}

export const Skills = ({ language }: SkillsSectionProps) => {
  const t = translations;

  const categories = {
    languages: { icon: Code2, title: t.skills.languages[language as keyof typeof t.skills.languages] },
    frameworks: { icon: Code2, title: t.skills.frameworks[language as keyof typeof t.skills.frameworks] },
    tools: { icon: Wrench, title: t.skills.tools[language as keyof typeof t.skills.tools] },
  };

  return (
    <section id="habilidades" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-deep-ocean dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            {t.skills.title[language as keyof typeof t.skills.title]}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium px-4">
            {t.skills.subtitle[language as keyof typeof t.skills.subtitle]}
          </p>
          <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4 sm:mt-6 shadow-lg"></div>
        </motion.div>

        {/* Tech Skills by Category */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          {Object.entries(categories).map(([categoryKey, categoryData], catIndex) => (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
              className="mb-10 sm:mb-12"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <categoryData.icon size={24} className="text-blue-600 dark:text-blue-400 sm:w-7 sm:h-7" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {categoryData.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {skills
                  .filter((skill) => skill.category === categoryKey)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.08, y: -8 }}
                      className="bg-white dark:bg-deep-lighter rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="text-center relative z-10">
                        <div className="text-3xl sm:text-5xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                          {skill.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-base mb-2 sm:mb-3">
                          {skill.name}
                        </h4>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                          />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2">{skill.level}%</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
            <Globe2 size={24} className="text-purple-600 dark:text-purple-400 sm:w-7 sm:h-7" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t.skills.languageSkills[language as keyof typeof t.skills.languageSkills]}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {languageSkills.map((langSkill, index) => (
              <motion.div
                key={langSkill.language}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-700 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center relative z-10">
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 filter drop-shadow-md">{langSkill.flag}</div>
                  <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-1.5 sm:mb-2">{langSkill.language}</h4>
                  <p className="text-sm sm:text-base text-purple-700 dark:text-purple-300 font-bold mb-2 sm:mb-3">
                    {langSkill.level}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                    {langSkill.description[language as keyof typeof langSkill.description]}
                  </p>
                  {langSkill.certifications && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                      {langSkill.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white dark:bg-purple-900/40 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold text-purple-800 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-600 shadow-sm"
                        >
                          <Award size={12} className="sm:w-3.5 sm:h-3.5" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
