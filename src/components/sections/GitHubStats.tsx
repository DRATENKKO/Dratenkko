import { motion } from 'framer-motion';
import { Star, GitFork, Activity, Trophy, Flame, Code2, FolderGit } from 'lucide-react';

// GitHub Username
const GITHUB_USERNAME = 'Dratenkko';

// Stats from GitHub API (cached for demo)
const githubStats = {
  totalRepos: 8,
  totalStars: 45,
  totalCommits: 892,
  totalPRs: 12,
  streak: 14,
  longestStreak: 23,
  contributions: 1247,
  followers: 23,
  following: 45,
};

// Most used languages
const topLanguages = [
  { name: 'TypeScript', percent: 38, color: '#3178c6' },
  { name: 'Python', percent: 28, color: '#3776ab' },
  { name: 'Dart', percent: 18, color: '#00B4AB' },
  { name: 'C#', percent: 10, color: '#68217A' },
  { name: 'Java', percent: 6, color: '#ed8b00' },
];

// Quick stats for animated counters
const quickStats = [
  { label: 'Repositorios', value: githubStats.totalRepos, icon: FolderGit, color: '#8b5cf6' },
  { label: 'Stars Totales', value: githubStats.totalStars, icon: Star, color: '#f59e0b' },
  { label: 'Commits', value: githubStats.totalCommits, icon: Code2, color: '#10b981' },
  { label: 'Seguidores', value: githubStats.followers, icon: Trophy, color: '#ef4444' },
];

export const GitHubStats = () => {
  return (
    <section id="github-stats" className="py-16 sm:py-20 bg-gray-50 dark:bg-deep-ocean relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-full mb-4">
            <Code2 size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">GitHub Activity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Actividad en GitHub
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estadísticas actualizadas de mi actividad en código
          </p>
        </motion.div>

        {/* GitHub Readme Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Profile Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white dark:bg-deep-lighter rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                  <Code2 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">@{GITHUB_USERNAME}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Profile</p>
                </div>
              </div>

              {/* Stats from GitHub Readme Stats API */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&theme=gradient&bg_gradient_start=%238b5cf6&bg_gradient_end=%232563eb&title_color=ffffff&text_color=ffffff&icon_color=ffffff&ring_color=ffffff&border_color=ffffff&border_radius=10`}
                  alt="GitHub Stats"
                  className="h-auto w-full sm:w-1/2 rounded-xl shadow-lg"
                />
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&theme=gradient&bg_gradient_start=%238b5cf6&bg_gradient_end=%232563eb&title_color=ffffff&text_color=ffffff&icon_color=ffffff&ring_color=ffffff&border_color=ffffff&border_radius=10`}
                  alt="Top Languages"
                  className="h-auto w-full sm:w-1/2 rounded-xl shadow-lg"
                />
              </div>

              {/* Click hint */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                ✨ Datos actualizados desde GitHub
              </p>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
          >
            {/* Animated fire effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Flame size={120} className="animate-pulse" />
            </div>

            <div className="relative z-10 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Flame size={28} className="animate-pulse" />
                <h3 className="text-xl font-bold">GitHub Streak</h3>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-5xl sm:text-6xl font-bold mb-1">{githubStats.streak}</p>
                  <p className="text-sm opacity-80">días consecutivos</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{githubStats.longestStreak}</p>
                    <p className="text-xs opacity-70">récord</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{githubStats.contributions}</p>
                    <p className="text-xs opacity-70">contribs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{githubStats.totalCommits}</p>
                    <p className="text-xs opacity-70">commits</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-deep-lighter rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} className="sm:w-7 sm:h-7" />
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}+
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Languages Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-6xl mx-auto bg-white dark:bg-deep-lighter rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Code2 size={20} className="text-purple-500" />
            Lenguajes Más Usados
          </h3>

          <div className="space-y-4">
            {topLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-4"
              >
                <div className="w-24 sm:w-32 text-right">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{lang.name}</span>
                </div>
                <div className="flex-1 relative">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 * index, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
                <div className="w-12 sm:w-16 text-right">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{lang.percent}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <GitFork size={20} />
            Ver Perfil en GitHub
            <Activity size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
