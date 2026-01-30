import { motion } from 'framer-motion';
import { Send, Terminal, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { translations, contactInfo } from '../../data/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

interface ContactSectionProps {
  language: string;
}

export const Contact = ({ language }: ContactSectionProps) => {
  const t = translations;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      return;
    }

    setIsSending(true);

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSending(false);
      setCanSubmit(false);
      setTimeLeft(300);

      const now = new Date().getTime();
      localStorage.setItem('lastSubmissionTime', now.toString());

      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

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
                <span className="text-xs sm:text-sm text-gray-400 font-mono">sebastian@portfolio:~</span>
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
                className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 justify-center min-h-[48px]"
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
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <User size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.name[language as keyof typeof t.contact.name]}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder={language === 'es' ? 'Tu nombre' : language === 'en' ? 'Your name' : language === 'pt' ? 'Seu nome' : 'Il tuo nome'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Mail size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.email[language as keyof typeof t.contact.email]}
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder="email@example.com"
                />
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Phone size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.phone[language as keyof typeof t.contact.phone]}
                </label>
                <input
                  type="tel"
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[48px]"
                  placeholder={language === 'es' ? '+56 9...' : language === 'en' ? '+56 9...' : language === 'pt' ? '+56 9...' : '+56 9...'}
                />
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <MessageSquare size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  {t.contact.message[language as keyof typeof t.contact.message]}
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 bg-gray-50 dark:bg-deep-lighter border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base min-h-[120px]"
                  placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto...' : language === 'en' ? 'Tell me about your project...' : language === 'pt' ? 'Conte-me sobre seu projeto...' : 'Parlami del tuo progetto...'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit || isSending}
                className="w-full px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-h-[52px] text-sm sm:text-base"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.contact.sending[language as keyof typeof t.contact.sending]}
                  </>
                ) : canSubmit ? (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    {t.contact.send[language as keyof typeof t.contact.send]}
                  </>
                ) : (
                  <>
                    <Terminal size={18} className="sm:w-5 sm:h-5" />
                    {t.contact.wait[language as keyof typeof t.contact.wait]} {timeLeft} {t.contact.seconds[language as keyof typeof t.contact.seconds]}
                  </>
                )}
              </button>

              {/* Success Message */}
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg sm:rounded-xl text-green-800 dark:text-green-200 text-center font-medium text-sm sm:text-base"
                >
                  ✓ {t.contact.success[language as keyof typeof t.contact.success]}
                </motion.div>
              )}

              {/* Error Message */}
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg sm:rounded-xl text-red-800 dark:text-red-200 text-center font-medium text-sm sm:text-base"
                >
                  ⚠ {t.contact.errorLimit[language as keyof typeof t.contact.errorLimit]}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
