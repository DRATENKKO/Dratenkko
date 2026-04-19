import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText, Image as ImageIcon } from 'lucide-react';
import { certificates, translations } from '../../data/constants';

interface CertificatesSectionProps {
  language: string;
}

export const Certificates = ({ language }: CertificatesSectionProps) => {
  const t = translations;

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'jpg':
      case 'png':
        return <ImageIcon size={24} className="text-blue-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };

  return (
    <section id="certificados" className="py-20 bg-gray-50 dark:bg-deep-lighter">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.certificates.title[language as keyof typeof t.certificates.title]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.certificates.subtitle[language as keyof typeof t.certificates.subtitle]}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-deep-ocean rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex-shrink-0">
                  <Award size={24} className="text-white" />
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

              {/* Metadata */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{cert.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getFileIcon(cert.fileType)}
                  <span className="uppercase">{cert.fileType}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {/* View File - Opens in new tab like LinkedIn */}
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FileText size={18} />
                  {language === 'es' ? 'Ver Certificado' :
                   language === 'en' ? 'View Certificate' :
                   language === 'pt' ? 'Ver Certificado' : 'Vedi Certificato'}
                </a>

                {/* View Credential (if available) */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-gray-300 dark:border-gray-600"
                    title={t.certificates.viewCredential[language as keyof typeof t.certificates.viewCredential]}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Certificate Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
            <Award size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-900 dark:text-blue-100 font-medium">
              {language === 'es' ? 'Más certificaciones disponibles bajo solicitud' :
               language === 'en' ? 'More certifications available upon request' :
               'Ulteriori certificazioni disponibili su richiesta'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
