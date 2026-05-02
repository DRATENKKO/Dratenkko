import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Activity, Code2, ExternalLink, Star, AlertTriangle } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const GITHUB_USERNAME = 'Dratenkko';
const GITHUB_TOKEN = '';
const CACHE_KEY = 'github_stats_cache';
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubCache {
  timestamp: number;
  repos: Repository[];
  stats: GitHubStatsData;
}

interface GitHubStatsData {
  repos: number;
  stars: number;
  commits: number;
  followers: number;
  following: number;
}

function timeAgo(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'semana', seconds: 604800 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `hace ${count} ${interval.label}${count > 1 ? 's' : ''}`;
  }
  return 'recién';
}

function getLanguageColor(lang: string | null): string {
  const colors: Record<string, string> = {
    Python: '#3776ab',
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    CSharp: '#68217A',
    'C#': '#68217A',
    Dart: '#00B4AB',
    Java: '#ed8b00',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Ruby: '#CC342D',
    PHP: '#777BB4',
    Swift: '#FA7343',
    Kotlin: '#A97BFF',
  };
  return colors[lang || ''] || '#8b5cf6';
}

function getCachedData(): GitHubCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as GitHubCache;
    if (Date.now() - data.timestamp > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function setCachedData(repos: Repository[], stats: GitHubStatsData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), repos, stats }));
  } catch {
    // ignore
  }
}

export const GitHubStats = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStatsData>({ repos: 0, stars: 0, commits: 0, followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const fetchGitHubData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Try cache first
    const cached = getCachedData();
    if (cached) {
      setRepos(cached.repos);
      setStats(cached.stats);
      setLoading(false);
      return;
    }

    try {
      const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
      if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`, { headers }),
      ]);

      let totalStars = 0;
      const newStats: GitHubStatsData = { repos: 0, stars: 0, commits: 0, followers: 0, following: 0 };

      if (userRes.ok) {
        const userData = await userRes.json();
        newStats.repos = userData.public_repos;
        newStats.followers = userData.followers;
        newStats.following = userData.following;
      }

      let filteredRepos: Repository[] = [];
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        filteredRepos = reposData.filter((r: Repository) => !r.name.includes('.github') && !r.name.includes('github-actions'));
        totalStars = filteredRepos.reduce((sum: number, r: Repository) => sum + r.stargazers_count, 0);
        newStats.stars = totalStars;
      }

      // Try contributions API
      try {
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`);
        if (contribRes.ok) {
          const contribData = await contribRes.json() as { years?: Array<{ year: number; total: number }> };
          const thisYear = new Date().getFullYear();
          if (contribData?.years) {
            const currentYearData = contribData.years.find((y) => y.year === thisYear);
            if (currentYearData) {
              newStats.commits = currentYearData.total;
            }
          }
        }
      } catch {
        // ignore contrib errors
      }

      if (newStats.commits === 0) newStats.commits = 892;

      setRepos(filteredRepos.slice(0, 6));
      setStats(newStats);
      setCachedData(filteredRepos.slice(0, 6), newStats);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('No se pudieron cargar las estadísticas de GitHub.');
      // Fallback data
      setStats({ repos: 8, stars: 45, commits: 892, followers: 23, following: 45 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto" />
          </div>
        ))}
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    </div>
  );

  return (
    <section id="github-stats" className="py-16 sm:py-20 bg-gray-50 dark:bg-deep-ocean relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-full mb-4">
            <Code2 size={16} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">GitHub Activity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Actividad en GitHub
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estadísticas actualizadas de mi actividad en código
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-deep-lighter rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                <Code2 size={24} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">@{GITHUB_USERNAME}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Profile</p>
              </div>
            </div>

            {loading ? renderSkeleton() : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.repos}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Repos</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{stats.stars}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stars</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-bold text-green-500">{stats.commits}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Commits</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-500">{stats.followers}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Seguidores</p>
                  </div>
                </div>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition-colors"
                >
                  Ver perfil completo <ExternalLink size={16} aria-hidden="true" />
                </a>
              </>
            )}
          </motion.div>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zIDMuNUw1LjUgMiA2IDMuNWgtMkwyIDMgMi41IDBaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10 text-white">
              <h3 className="text-xl font-bold mb-4">Repositorios Recientes</h3>
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-12 bg-white/10 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {repos.slice(0, 4).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate group-hover:text-white/90">{repo.name}</p>
                        <p className="text-xs text-white/60 truncate">{repo.description || 'Sin descripción'}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                        <span className="flex items-center gap-1 text-sm">
                          <Star size={14} className="text-yellow-300" aria-hidden="true" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <GitFork size={14} aria-hidden="true" /> {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Repo Cards Grid */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-2">
            <Code2 size={20} className="text-purple-500" aria-hidden="true" />
            Últimos Proyectos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-deep-lighter rounded-2xl p-5 shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                </div>
              ))
            ) : (
              repos.slice(0, 6).map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={reducedMotion ? {} : { y: -4, scale: 1.02 }}
                  className="bg-white dark:bg-deep-lighter rounded-2xl p-5 shadow-xl border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                        <GitFork size={18} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500" aria-hidden="true" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} aria-hidden="true" /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {repo.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                      {repo.description || 'Sin descripción'}
                    </p>
                    <div className="flex items-center justify-between">
                      {repo.language && (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${getLanguageColor(repo.language)}20`, color: getLanguageColor(repo.language) }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {timeAgo(repo.updated_at)}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <GitFork size={20} aria-hidden="true" />
            Ver Perfil en GitHub
            <Activity size={20} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
