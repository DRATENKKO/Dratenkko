import { motion } from 'framer-motion';
import { Code2, Cpu, Smartphone, Database, BookOpen, Clock, Eye, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  icon: typeof Code2;
  readTime: string;
  views: string;
  date: string;
  tags: string[];
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering .NET Core 10: Nuevas Features que Debes Conocer',
    excerpt: 'Un深度 análisis de las nuevas características en .NET Core 10, incluyendo mejoras en performance, nuevos APIs y mejores prácticas para desarrollo empresarial.',
    category: '.NET',
    icon: Cpu,
    readTime: '8 min',
    views: '2.4K',
    date: 'Mar 2026',
    tags: ['C#', '.NET 10', 'Backend'],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: '2',
    title: 'Flutter 4.0: Construye Apps Nativas como Nunca Antes',
    excerpt: 'Explora las nuevas capacidades de Flutter 4.0 con ejemplos prácticos de código, benchmarks de rendimiento y guías de migración desde versiones anteriores.',
    category: 'Flutter',
    icon: Smartphone,
    readTime: '12 min',
    views: '3.1K',
    date: 'Feb 2026',
    tags: ['Dart', 'Flutter', 'Mobile'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '3',
    title: 'Web Scraping Avanzado con Python: +10,000 Datos/Día',
    excerpt: 'Técnicas avanzadas de web scraping utilizando Python, Selenium y Playwright. Incluye manejo de CAPTCHAs, rotación de proxies y arquitectura escalable.',
    category: 'Python',
    icon: Database,
    readTime: '15 min',
    views: '4.8K',
    date: 'Ene 2026',
    tags: ['Python', 'Selenium', 'Data'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: '4',
    title: 'Clean Architecture en Aplicaciones .NET: Guía Práctica',
    excerpt: 'Implementa Clean Architecture en tus proyectos .NET con ejemplos del mundo real. Estructura capas, maneja dependencias y aplica patrones CQRS.',
    category: '.NET',
    icon: Code2,
    readTime: '10 min',
    views: '1.9K',
    date: 'Dic 2025',
    tags: ['Arquitectura', 'C#', 'Patrones'],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: '5',
    title: 'State Management en Flutter: BLoC vs Riverpod vs Redux',
    excerpt: 'Comparativa exhaustiva de las principales soluciones de state management en Flutter. Pros, contras, benchmarks y recomendaciones para cada caso de uso.',
    category: 'Flutter',
    icon: Smartphone,
    readTime: '14 min',
    views: '5.2K',
    date: 'Nov 2025',
    tags: ['Flutter', 'BLoC', 'State'],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: '6',
    title: 'Automatización DevOps con Python: From Zero to Hero',
    excerpt: 'Crea pipelines de CI/CD automatizados con Python. Scripting para deployments, testing automático y monitoreo con alertas personalizadas.',
    category: 'DevOps',
    icon: BookOpen,
    readTime: '11 min',
    views: '2.7K',
    date: 'Oct 2025',
    tags: ['DevOps', 'Python', 'Automation'],
    gradient: 'from-violet-500 to-purple-500',
  },
];

interface BlogSectionProps {
  language: string;
}

export const Blog = ({ language }: BlogSectionProps) => {
  return (
    <section id="blog" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-deep-ocean dark:to-deep-lighter relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
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
            <BookOpen size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">Blog Técnico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Artículos & Tutoriales
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comparto conocimiento sobre desarrollo de software, arquitectura y mejores prácticas
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white dark:bg-deep-lighter rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 relative cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              {/* Category badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${post.gradient} rounded-full text-xs font-bold text-white shadow-lg`}>
                  <post.icon size={12} />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <post.icon size={28} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye size={12} />
                    {post.views}
                  </span>
                  <span>{post.date}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read more link */}
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>
                    {language === 'es' ? 'Leer más' : language === 'en' ? 'Read more' : 'Ler mais'}
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className={`h-1 bg-gradient-to-r ${post.gradient} transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-500`}></div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <BookOpen size={20} />
            {language === 'es' ? 'Ver Todos los Artículos' : language === 'en' ? 'View All Articles' : 'Ver Todos os Artigos'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
