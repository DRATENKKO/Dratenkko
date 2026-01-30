import { motion } from 'framer-motion';
import { translations } from '../../data/constants';

interface FooterProps {
  language: string;
}

export const Footer = ({ language: _language }: FooterProps) => {
  const t = translations;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 dark:from-deep-ocean dark:via-blue-900/20 dark:to-purple-900/20 border-t-2 border-blue-200 dark:border-blue-800 py-12">
      <div className="container mx-auto px-4 text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 dark:text-gray-300 font-medium"
        >
          {t.footer.copyright.replace('{year}', year.toString())}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 rounded-2xl border-2 border-blue-400 dark:border-blue-500 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="text-3xl filter drop-shadow-md">🌟</span>
          <span className="text-base font-bold text-blue-900 dark:text-blue-100">
            {t.footer.inclusion}
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Hecho con 💜 using React + TypeScript + Tailwind CSS
        </motion.p>
      </div>
    </footer>
  );
};
