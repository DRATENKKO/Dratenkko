import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: {
    es: string;
    en: string;
    pt: string;
    it: string;
  };
  rating: number;
  avatar?: string;
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

interface TestimonialsSectionProps {
  language: string;
}

export const Testimonials = ({ language }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonios" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-deep-ocean dark:to-deep-lighter relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 rounded-full mb-4">
            <Star size={16} className="text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">Testimonios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Lo que dicen de mí
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comentarios de colegas y clientes con quienes he trabajado
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white dark:bg-deep-lighter rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
          >
            {/* Background quote icon */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-10">
              <Quote size={80} className="text-purple-500" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Star size={24} className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed mb-8">
                "{currentTestimonial.quote[language as keyof typeof currentTestimonial.quote]}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
                  {currentTestimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTestimonial.role} • {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Previous button */}
            <button
              onClick={goToPrevious}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-deep-ocean shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 w-8 sm:w-10'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goToNext}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-deep-ocean shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
