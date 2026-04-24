import { motion } from 'framer-motion';
import { Send, Terminal, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useEffect } from 'react';
import { translations, contactInfo } from '../../data/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const RATE_LIMIT_KEY = 'contact_form_last_submission';
const RATE_LIMIT_MS = 300000; // 5 minutes

interface ContactSectionProps {
  language: string;
}

export const Contact = ({ language }: ContactSectionProps) => {
  const t = translations;
  const [state, handleSubmit] = useForm('mvzdqzeg');

  const [lastSubmission, setLastSubmission] = useState<number>(() => {
    const saved = localStorage.getItem(RATE_LIMIT_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (lastSubmission === 0) return 0;
    const elapsed = Date.now() - lastSubmission;
    return Math.max(0, RATE_LIMIT_MS - elapsed);
  });

  const [showCooldown, setShowCooldown] = useState(false);

  useEffect(() => {
    if (lastSubmission === 0) {
      setShowCooldown(false);
      return;
    }

    const elapsed = Date.now() - lastSubmission;
    const remaining = RATE_LIMIT_MS - elapsed;

    if (remaining <= 0) {
      setTimeLeft(0);
      setShowCooldown(false);
      localStorage.removeItem(RATE_LIMIT_KEY);
    } else {
      setTimeLeft(remaining);
      setShowCooldown(true);

      const interval = setInterval(() => {
        const newElapsed = Date.now() - lastSubmission;
        const newRemaining = RATE_LIMIT_MS - newElapsed;

        if (newRemaining <= 0) {
          setTimeLeft(0);
          setShowCooldown(false);
          localStorage.removeItem(RATE_LIMIT_KEY);
          clearInterval(interval);
        } else {
          setTimeLeft(newRemaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastSubmission]);

  useEffect(() => {
    if (state.succeeded && lastSubmission === 0) {
      const now = Date.now();
      localStorage.setItem(RATE_LIMIT_KEY, now.toString());
      setLastSubmission(now);
      setTimeLeft(RATE_LIMIT_MS);
      setShowCooldown(true);
    }
  }, [state.succeeded, lastSubmission]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showCooldown || timeLeft > 0) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    await handleSubmit(formData);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs}s`;
  };

  if (state.succeeded || (showCooldown && timeLeft > 0)) {
    return (
      <section id="contacto" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl p-8 sm:p-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                {language === 'es' ? '¡Mensaje enviado!' :
                 language === 'en' ? 'Message sent!' :
                 language === 'pt' ? 'Mensagem enviada!' :
                 'Messaggio inviato!'}
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                {t.contact.success[language as keyof typeof t.contact.success]}
              </p>
              {showCooldown && timeLeft > 0 && (
                <div className="mt-4 p-4 bg-green-200 dark:bg-green-800/50 rounded-xl">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    {language === 'es' ? 'Podrás enviar otro mensaje en:' :
                     language === 'en' ? 'You can send another message in:' :
                     language === 'pt' ? 'Você pode enviar outra mensagem em:' :
                     'Potrai inviare un altro messaggio tra:'}
                  </p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.contact.title[language as keyof typeof t.contact.title]}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            {t.contact.subtitle[language as keyof typeof t.contact.subtitle]}
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Terminal Style Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 dark:bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
          >
            <div className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs sm:text-sm text-gray-400 font-mono">{t.contact.terminalTitle[language as keyof typeof t.contact.terminalTitle]}</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 sm:space-y-3">
              <div className="text-green-400">
                {t.contact.terminalWelcome[language as keyof typeof t.contact.terminalWelcome]}
              </div>
              <div className="text-blue-400">
                {t.contact.terminalStatus[language as keyof typeof t.contact.terminalStatus]}
              </div>
              <div className="text-purple-400">
                {t.contact.terminalLocation[language as keyof typeof t.contact.terminalLocation]}
              </div>
              <div className="text-gray-400 mt-4 sm:mt-6">
                {t.contact.terminalPrompt[language as keyof typeof t.contact.terminalPrompt]}
              </div>

              {/* Contact Info Cards */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-800 rounded-lg p-2.5 sm:p-3">
                  <Mail size={16} className="text-blue-400 sm:w-[18px] sm:h-[18px]" />
                  <a href={`mailto:${contactInfo.email}`} className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors break-all">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-800 rounded-lg p-2.5 sm:p-3">
                  <Phone size={16} className="text-green-400 sm:w-[18px] sm:h-[18px]" />
                  <a href={`tel:${contactInfo.phone}`} className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-800 rounded-lg p-2.5 sm:p-3">
                  <Terminal size={16} className="text-purple-400 sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm text-gray-300">{contactInfo.location}</span>
                </div>
              </div>

              {/* CV Download Button */}
              <a
                href={language === 'en' ? `${import.meta.env.BASE_URL}Resume.pdf` : `${import.meta.env.BASE_URL}CV.pdf`}
                download
                className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 justify-center min-h-[48px] cursor-pointer"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-lg sm:text-xl" />
                <span className="text-xs sm:text-base">{t.contact.downloadCV[language as keyof typeof t.contact.downloadCV]}</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-deep-ocean rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <User size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.name[language as keyof typeof t.contact.name]}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder={language === 'es' ? 'Tu nombre' : language === 'en' ? 'Your name' : language === 'pt' ? 'Seu nome' : 'Il tuo nome'}
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Mail size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.email[language as keyof typeof t.contact.email]}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder="email@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Phone size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.phone[language as keyof typeof t.contact.phone]}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder={language === 'es' ? '+56 9...' : language === 'en' ? '+56 9...' : language === 'pt' ? '+56 9...' : '+56 9...'}
                />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <MessageSquare size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.message[language as keyof typeof t.contact.message]}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base min-h-[120px]"
                  placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto...' : language === 'en' ? 'Tell me about your project...' : language === 'pt' ? 'Conte-me sobre seu projeto...' : 'Parlami del tuo progetto...'}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-h-[52px] text-sm sm:text-base"
              >
                {state.submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.contact.sending[language as keyof typeof t.contact.sending]}
                  </>
                ) : (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    {t.contact.send[language as keyof typeof t.contact.send]}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};