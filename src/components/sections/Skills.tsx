import { motion } from 'framer-motion';
import { Code2, Wrench, Globe2, Award, Zap } from 'lucide-react';
import { skills, languageSkills, translations } from '../../data/constants';

interface SkillsSectionProps {
  language: string;
}

const categories = {
  languages: { icon: Code2, titleKey: 'languages' as const, color: 'from-blue-500 to-cyan-500' },
  frameworks: { icon: Zap, titleKey: 'frameworks' as const, color: 'from-purple-500 to-pink-500' },
  tools: { icon: Wrench, titleKey: 'tools' as const, color: 'from-green-500 to-emerald-500' },
};

const getSkillIcon = (skillName: string) => {
  const iconUrls: Record<string, string> = {
    Python: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg',
    'C#/.NET': 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/csharp.svg',
    Java: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/java.svg',
    SQL: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postgresql.svg',
    TypeScript: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/typescript.svg',
    Dart: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dart.svg',
    Django: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/django.svg',
    Flutter: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/flutter.svg',
    Angular: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/angular.svg',
    Ionic: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ionic.svg',
    '.NET Core': 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dotnet.svg',
    React: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg',
    Docker: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg',
    Selenium: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/selenium.svg',
    Git: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/git.svg',
    PostgreSQL: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postgresql.svg',
    MongoDB: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mongodb.svg',
  };
  return iconUrls[skillName] || null;
};

export const Skills = ({ language }: SkillsSectionProps) => {
  const t = translations;

  return (
    <section id="habilidades" className="py-20 sm:py-28 bg-gradient-to-b from-white via-gray-50 to-white dark:from-deep-ocean dark:via-gray-900 dark:to-deep-ocean relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full mb-6"
          >
            <Zap size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Tech Stack</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.skills.title[language as keyof typeof t.skills.title]}
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.skills.subtitle[language as keyof typeof t.skills.subtitle]}
          </p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-8"
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto space-y-16">
          {Object.entries(categories).map(([categoryKey, categoryData], catIndex) => (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.15 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryData.color} shadow-lg`}>
                  <categoryData.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {t.skills[categoryData.titleKey][language as keyof typeof t.skills.languages]}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {skills
                  .filter((skill) => skill.category === categoryKey)
                  .map((skill, index) => {
                    const iconUrl = getSkillIcon(skill.name);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ y: -6, scale: 1.05 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                          {/* Skill Icon */}
                          <div className="flex justify-center mb-3">
                            {iconUrl ? (
                              <img
                                src={iconUrl}
                                alt={skill.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryData.color} flex items-center justify-center`}>
                                <categoryData.icon size={24} className="text-white" />
                              </div>
                            )}
                          </div>

                          {/* Skill Name */}
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white text-center mb-3">
                            {skill.name}
                          </h4>

                          {/* Progress Bar */}
                          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.08 }}
                              className={`h-full bg-gradient-to-r ${categoryData.color} rounded-full`}
                            />
                          </div>

                          {/* Level */}
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-center mt-2">
                            {skill.level}%
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Globe2 size={28} className="text-purple-600 dark:text-purple-400" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t.skills.languageSkills[language as keyof typeof t.skills.languageSkills]}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {languageSkills.map((langSkill, index) => (
              <motion.div
                key={langSkill.language}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 rounded-3xl shadow-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl filter drop-shadow-lg">{langSkill.flag}</span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{langSkill.language}</h4>
                      <p className="text-purple-700 dark:text-purple-300 font-semibold">{langSkill.level}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {langSkill.description[language as keyof typeof langSkill.description]}
                  </p>
                  
                  {langSkill.certifications && (
                    <div className="flex flex-wrap gap-2">
                      {langSkill.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full text-xs font-bold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                        >
                          <Award size={12} />
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
