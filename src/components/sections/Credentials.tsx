import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, MessageSquare, ExternalLink, FileText, Image as ImageIcon, ChevronLeft, ChevronRight, Quote, Star, Clock, ArrowRight } from 'lucide-react';
import { certificates, translations } from '../../data/constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CredentialsSectionProps {
  language: string;
}

type TabKey = 'certificates' | 'testimonials' | 'blog';

const tabConfig: Record<TabKey, { labelKey: string; icon: typeof Award }> = {
  certificates: { labelKey: 'certificates', icon: Award },
  testimonials: { labelKey: 'testimonials', icon: MessageSquare },
  blog: { labelKey: 'blog', icon: BookOpen },
};

// --- Testimonials Data ---
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: { es: string; en: string; pt: string; it: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    role: 'Tech Lead',
    company: 'Serviphar',
    quote: {
      es: 'Sebastian es un desarrollador excepcional. Su capacidad para aprender nuevas tecnologías y entregar código de calidad es admirable. Muy recomendado.',
      en: 'Sebastian is an exceptional developer. His ability to learn new technologies and deliver quality code is admirable. Highly recommended.',
      pt: 'Sebastian é um desenvolvedor excepcional. Sua capacidade de aprender novas tecnologias e entregar código de qualidade é admirável. Altamente recomendado.',
      it: 'Sebastian è uno sviluppatore eccezionale. La sua capacità di imparare nuove tecnologie e consegnare codice di qualità è ammirabile. Altamente consigliato.',
    },
    rating: 5,
  },
  {
    id: '2',
    name: 'María Elena Fernández',
    role: 'Gerente de Proyecto',
    company: 'Permify',
    quote: {
      es: 'Trabajar con Sebastian fue una gran experiencia. Siempre disponible para resolver dudas y entregar soluciones creativas a los problemas.',
      en: 'Working with Sebastian was a great experience. Always available to resolve doubts and deliver creative solutions to problems.',
      pt: 'Trabalhar com Sebastian foi uma excelente experiência. Sempre disponível para resolver dúvidas e entregar soluções criativas para os problemas.',
      it: 'Lavorare con Sebastian è stata una grande esperienza. Sempre disponibile per risolvere dubbi e fornire soluzioni creative ai problemi.',
    },
    rating: 5,
  },
  {
    id: '3',
    name: 'Roberto García',
    role: 'CTO',
    company: 'Neosoltec',
    quote: {
      es: 'Sebastian demostró un alto nivel de profesionalismo en el desarrollo de nuestros sistemas de scraping. Su código es limpio y bien documentado.',
      en: 'Sebastian demonstrated a high level of professionalism in developing our scraping systems. His code is clean and well documented.',
      pt: 'Sebastian demonstrou um alto nível de profissionalismo no desenvolvimento de nossos sistemas de scraping. Seu código é limpo e bem documentado.',
      it: 'Sebastian ha dimostrato un alto livello di professionalità nello sviluppo dei nostri sistemi di scraping. Il suo codice è pulito e ben documentato.',
    },
    rating: 5,
  },
  {
    id: '4',
    name: 'Andrea López',
    role: 'Product Manager',
    company: 'Freelance',
    quote: {
      es: 'La app que desarrolló para nuestra startup superó todas las expectativas. Sebastian es un profesional muy talentoso y detallista.',
      en: 'The app he developed for our startup exceeded all expectations. Sebastian is a very talented and detail-oriented professional.',
      pt: 'O aplicativo que ele desenvolveu para nossa startup superou todas as expectativas. Sebastian é um profissional muito talentoso e detalhista.',
      it: "L'app che ha sviluppato per la nostra startup ha superato tutte le aspettative. Sebastian è un professionista molto talentuoso e attento ai dettagli.",
    },
    rating: 5,
  },
];

// --- Blog Data ---
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering .NET Core 10: Nuevas Features que Debes Conocer',
    excerpt: 'Un análisis de las nuevas características en .NET Core 10, incluyendo mejoras en performance, nuevos APIs y mejores prácticas para desarrollo empresarial.',
    category: '.NET',
    readTime: '8 min',
    date: 'Mar 2026',
    tags: ['C#', '.NET 10', 'Backend'],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: '2',
    title: 'Flutter 4.0: Construye Apps Nativas como Nunca Antes',
    excerpt: 'Explora las nuevas capacidades de Flutter 4.0 con ejemplos prácticos, benchmarks de rendimiento y guías de migración desde versiones anteriores.',
    category: 'Flutter',
    readTime: '12 min',
    date: 'Feb 2026',
    tags: ['Dart', 'Flutter', 'Mobile'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '3',
    title: 'Web Scraping Avanzado con Python: +10,000 Datos/Día',
    excerpt: 'Técnicas avanzadas de web scraping utilizando Python, Selenium y Playwright. Incluye manejo de CAPTCHAs, rotación de proxies y arquitectura escalable.',
    category: 'Python',
    readTime: '15 min',
    date: 'Ene 2026',
    tags: ['Python', 'Selenium', 'Data'],
    gradient: 'from-green-500 to-emerald-500',
  },
];

function getFileIcon(fileType: string) {
  switch (fileType) {
    case 'pdf':
      return <FileText size={24} className="text-red-500" />;
    case 'jpg':
    case 'png':
      return <ImageIcon size={24} className="text-blue-500" />;
    default:
      return <FileText size={24} className="text-gray-500" />;
  }
}

function CertificatesTab({ language }: { language: string }) {
  const t = translations;
  const reducedMotion = useReducedMotion();

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 }}
          whileHover={reducedMotion ? {} : { scale: 1.02, y: -4 }}
          className="bg-white dark:bg-deep-ocean rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex-shrink-0">
              <Award size={24} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.title[language as keyof typeof cert.title]}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cert.issuer[language as keyof typeof cert.issuer]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>{cert.date}</span>
            </div>
            <div className="flex items-center gap-2">
              {getFileIcon(cert.fileType)}
              <span className="uppercase">{cert.fileType}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={cert.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FileText size={18} aria-hidden="true" />
              {language === 'es' ? 'Ver Certificado' : language === 'en' ? 'View Certificate' : language === 'pt' ? 'Ver Certificado' : 'Vedi Certificato'}
            </a>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-gray-300 dark:border-gray-600"
                title={t.certificates.viewCredential[language as keyof typeof t.certificates.viewCredential]}
              >
                <ExternalLink size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-2 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
          <Award size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span className="text-sm text-blue-900 dark:text-blue-100 font-medium">
            {language === 'es' ? 'Más certificaciones disponibles bajo solicitud' :
             language === 'en' ? 'More certifications available upon request' :
             language === 'pt' ? 'Mais certificações disponíveis sob solicitação' :
             'Ulteriori certificazioni disponibili su richiesta'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function TestimonialsTab({ language }: { language: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reducedMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? {} : { opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-white dark:bg-deep-lighter rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-10">
            <Quote size={80} className="text-purple-500" aria-hidden="true" />
          </div>

          <div className="relative z-10">
            <div className="flex gap-1 mb-6">
              {Array(current.rating).fill(0).map((_, i) => (
                <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed mb-8">
              &ldquo;{current.quote[language as keyof typeof current.quote]}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                {current.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">{current.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {current.role} • {current.company}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-deep-ocean shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300 group"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-8 sm:w-10'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-deep-ocean shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300 group"
          aria-label="Testimonio siguiente"
        >
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function BlogTab({ language }: { language: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={reducedMotion ? {} : { y: -6, scale: 1.02 }}
          className="group bg-white dark:bg-deep-lighter rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 relative cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${post.gradient} rounded-full text-xs font-bold text-white shadow-lg`}>
              {post.category}
            </span>
          </div>

          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
              <span>
                {language === 'es' ? 'Leer más' : language === 'en' ? 'Read more' : language === 'pt' ? 'Ler mais' : 'Leggi ancora'}
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </div>
          </div>

          <div className={`h-1 bg-gradient-to-r ${post.gradient} transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-500`} />
        </motion.article>
      ))}
    </div>
  );
}

export const Credentials = ({ language }: CredentialsSectionProps) => {
  const t = translations;
  const [activeTab, setActiveTab] = useState<TabKey>('certificates');
  const reducedMotion = useReducedMotion();

  const tabs: TabKey[] = ['certificates', 'testimonials', 'blog'];

  return (
    <section id="credenciales" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-deep-ocean dark:to-deep-lighter relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-full mb-4">
            <Award size={16} className="text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
              {language === 'en' ? 'Credentials' : language === 'pt' ? 'Credenciais' : language === 'it' ? 'Credenziali' : 'Credenciales'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            {language === 'en' ? 'More About Me' : language === 'pt' ? 'Mais Sobre Mim' : language === 'it' ? 'Di Più Su Di Me' : 'Más Sobre Mí'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Certifications, testimonials, and articles that support my professional profile.'
              : language === 'pt'
              ? 'Certificações, depoimentos e artigos que respaldam meu perfil profissional.'
              : language === 'it'
              ? 'Certificazioni, testimonianze e articoli che supportano il mio profilo professionale.'
              : 'Certificaciones, testimonios y artículos que respaldan mi perfil profesional.'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const config = tabConfig[tab];
              const Icon = config.icon;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {isActive && (
                    <motion.div
                      layoutId="credentials-active-tab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} aria-hidden="true" />
                    <span className="hidden sm:inline">
                      {t[tab].title[language as keyof typeof t.certificates.title]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'certificates' && <CertificatesTab language={language} />}
            {activeTab === 'testimonials' && <TestimonialsTab language={language} />}
            {activeTab === 'blog' && <BlogTab language={language} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
