import { motion } from 'framer-motion';
import { Code2, Wrench, Globe2, Award } from 'lucide-react';
import { skills, languageSkills, translations } from '../../data/constants';

interface SkillsSectionProps {
  language: string;
}

const categories = {
  languages: { icon: Code2, titleKey: 'languages' as const },
  frameworks: { icon: Code2, titleKey: 'frameworks' as const },
  tools: { icon: Wrench, titleKey: 'tools' as const },
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
                  {t.skills[categoryData.titleKey][language as keyof typeof t.skills.languages]}
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills
                  .filter((skill) => skill.category === categoryKey)
                  .map((skill, index) => {
                    const iconUrl = getSkillIcon(skill.name);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="card bg-white dark:bg-deep-lighter border border-gray-200 dark:border-gray-700 group cursor-pointer"
                      >
                        <div className="text-center">
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={skill.name}
                              className="tech-icon mx-auto mb-3 group-hover:scale-110 transition-transform duration-200"
                            />
                          ) : (
                            <Code2 size={24} className="mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                          )}
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                            {skill.name}
                          </h4>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                            />
                          </div>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">{skill.level}%</p>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>

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
                whileHover={{ y: -4 }}
                className="card bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 filter drop-shadow-md">{langSkill.flag}</div>
                  <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-1">{langSkill.language}</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-bold mb-2">
                    {langSkill.level}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {langSkill.description[language as keyof typeof langSkill.description]}
                  </p>
                  {langSkill.certifications && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {langSkill.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="badge badge-primary"
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