// Language Options with SVG Flag Data
export const languageOptions = [
  {
    code: 'es',
    name: 'Español (Chile)',
    flag: '🇨🇱',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇵🇹',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
  }
];

// Interfaces
export interface Description {
  es: string;
  en: string;
  pt: string;
  it: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'languages' | 'frameworks' | 'tools';
  level: number;
}

export interface ProjectImage {
  url: string;
  caption: Description;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: Description;
  fullDescription: Description;
  type: string;
  thumbnail: string;
  technologies: string[];
  videoUrl?: string;
  images: ProjectImage[];
  company: string;
  role: string;
  period: string;
  achievements: Description;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: Description;
}

export interface Certificate {
  id: string;
  title: Description;
  issuer: Description;
  date: string;
  credentialUrl?: string;
  fileUrl: string; // Path to PDF or image in public folder
  fileType: 'pdf' | 'jpg' | 'png';
}

// Skills Data
export const skills: Skill[] = [
  // Languages
  { name: 'Python', icon: 'Code2', category: 'languages', level: 95 },
  { name: 'C#/.NET', icon: 'Hexagon', category: 'languages', level: 90 },
  { name: 'Java', icon: 'Coffee', category: 'languages', level: 75 },
  { name: 'SQL', icon: 'Database', category: 'languages', level: 88 },
  { name: 'TypeScript', icon: 'FileCode', category: 'languages', level: 82 },
  { name: 'Dart', icon: 'Target', category: 'languages', level: 85 },

  // Frameworks
  { name: 'Django', icon: 'Guitar', category: 'frameworks', level: 88 },
  { name: 'Flutter', icon: 'Smartphone', category: 'frameworks', level: 90 },
  { name: 'Angular', icon: 'Layout', category: 'frameworks', level: 78 },
  { name: 'Ionic', icon: 'Layers', category: 'frameworks', level: 80 },
  { name: '.NET Core', icon: 'Cpu', category: 'frameworks', level: 92 },
  { name: 'React', icon: 'Hexagon', category: 'frameworks', level: 85 },

  // Tools
  { name: 'Docker', icon: 'Box', category: 'tools', level: 85 },
  { name: 'Selenium', icon: 'Bot', category: 'tools', level: 88 },
  { name: 'Git', icon: 'GitBranch', category: 'tools', level: 90 },
  { name: 'PostgreSQL', icon: 'Database', category: 'tools', level: 82 },
  { name: 'MongoDB', icon: 'Leaf', category: 'tools', level: 80 },
];

// Language Skills with Certifications
export const languageSkills = [
  {
    language: 'Español',
    level: 'Nativo',
    flag: '🇨🇱',
    description: { es: 'Idioma materno', en: 'Native language', pt: 'Língua materna', it: 'Lingua madre' }
  },
  {
    language: 'English',
    level: 'C2 - Avanzado',
    flag: '🇬🇧',
    certifications: ['TOEIC Bridge', 'EF SET C2'],
    description: { es: 'Avanzado - Certificado C2', en: 'Advanced - C2 Certified', pt: 'Avançado - Certificado C2', it: 'Avanzato - Certificato C2' }
  },
];

// Certificates Data
export const certificates: Certificate[] = [
  {
    id: 'toeic-bridge',
    title: {
      es: 'TOEIC Bridge™',
      en: 'TOEIC Bridge™',
      pt: 'TOEIC Bridge™',
      it: 'TOEIC Bridge™'
    },
    issuer: {
      es: 'ETS - Educational Testing Service',
      en: 'ETS - Educational Testing Service',
      pt: 'ETS - Educational Testing Service',
      it: 'ETS - Educational Testing Service'
    },
    date: '2022',
    credentialUrl: 'https://www.ets.org/toeic/bridge',
    fileUrl: '/toeic.pdf',
    fileType: 'pdf'
  },
  {
    id: 'ef-set-c2',
    title: {
      es: 'EF SET English Certificate C2',
      en: 'EF SET English Certificate C2',
      pt: 'EF SET English Certificate C2',
      it: 'EF SET English Certificate C2'
    },
    issuer: {
      es: 'EF Education First',
      en: 'EF Education First',
      pt: 'EF Education First',
      it: 'EF Education First'
    },
    date: '2026',
    credentialUrl: 'https://www.efset.org/',
    fileUrl: '/ef_set.pdf',
    fileType: 'pdf'
  },
  {
    id: 'certificados-duoc',
    title: {
      es: 'Certificados Duoc UC',
      en: 'Duoc UC Certificates',
      pt: 'Certificados Duoc UC',
      it: 'Certificati Duoc UC'
    },
    issuer: {
      es: 'Duoc UC',
      en: 'Duoc UC',
      pt: 'Duoc UC',
      it: 'Duoc UC'
    },
    date: '2023',
    credentialUrl: '',
    fileUrl: '/certificados-duoc.pdf',
    fileType: 'pdf'
  },
  {
    id: 'certificado-titulo',
    title: {
      es: 'Certificado de Título',
      en: 'Degree Certificate',
      pt: 'Certificado de Diploma',
      it: 'Certificato di Laurea'
    },
    issuer: {
      es: 'Duoc UC',
      en: 'Duoc UC',
      pt: 'Duoc UC',
      it: 'Duoc UC'
    },
    date: '2023',
    credentialUrl: '',
    fileUrl: '/certificado-titulo.pdf',
    fileType: 'pdf'
  }
];

// Enhanced Projects Data
export const projects: Project[] = [
  {
    id: 'artmind',
    title: 'ArtMind - Plataforma de Terapia de Arte',
    shortDescription: {
      es: 'Plataforma de arte terapia para personas mayores',
      en: 'Art therapy platform for elderly people',
      pt: 'Plataforma de arteterapia para idosos',
      it: 'Piattaforma di arteterapia per anziani'
    },
    fullDescription: {
      es: 'Desarrollo de plataforma web completa en Django para terapia de arte y estimulación de memoria en adultos mayores. Incluye módulos de expresión creativa, seguimiento personalizado del progreso, y herramientas de análisis para terapeutas. La plataforma mejora las funciones cognitivas mediante ejercicios artísticos interactivos.',
      en: 'Complete web platform in Django for art therapy and memory stimulation in elderly adults. Includes creative expression modules, personalized progress tracking, and analysis tools for therapists. The platform improves cognitive functions through interactive artistic exercises.',
      pt: 'Plataforma web completa em Django para terapia de arte e estimulação de memória em idosos. Inclui módulos de expressão criativa, acompanhamento personalizado do progresso e ferramentas de análise para terapeutas. A plataforma melhora as funções cognitivas através de exercícios artísticos interativos.',
      it: 'Piattaforma web completa in Django per terapia dell\'arte e stimolazione della memoria negli anziani. Include moduli di espressione creativa, monitoraggio personalizzato dei progressi e strumenti di analisi per i terapisti. La piattaforma migliora le funzioni cognitive attraverso esercizi artistici interattivi.'
    },
    type: 'Web Application',
    thumbnail: 'art.png',
    technologies: ['Django', 'Python', 'PythonAnywhere'],
    company: 'Permify',
    role: 'Full Stack Developer',
    period: 'Noviembre 2022 — Enero 2023',
    achievements: {
      es: '•+500 usuarios activos mensuales\n• Mejora del 35% en funciones cognitivas\n• Sistema de tracking en tiempo real',
      en: '•+500 monthly active users\n• 35% improvement in cognitive functions\n• Real-time tracking system',
      pt: '•+500 usuários mensais ativos\n• Melhoria de 35% nas funções cognitivas\n• Sistema de rastreamento em tempo real',
      it: '•+500 utenti mensili attivi\n• Miglioramento del 35% nelle funzioni cognitive\n• Sistema di tracking in tempo reale'
    },
    images: [
      { url: 'art.png', caption: { es: 'ArtMind Platform', en: 'ArtMind Platform', pt: 'ArtMind Platform', it: 'ArtMind Platform' } },
    ]
  },
  {
    id: 'sparedrive',
    title: 'Sparedrive - Tienda de Repuestos de Autos',
    shortDescription: {
      es: 'Plataforma e-commerce para venta de repuestos automotrices',
      en: 'E-commerce platform for auto parts sales',
      pt: 'Plataforma e-commerce para venda de peças automotivas',
      it: 'Piattaforma e-commerce per vendita ricambi auto'
    },
    fullDescription: {
      es: 'Plataforma web completa para la venta de repuestos de automóviles con sistema de control de usuarios, carrito de compras, generación de boletas electrónicas, y gestión de servicios. Desarrollado con Django como backend, Python para la lógica de negocio, y JavaScript vanilla junto con CSS customizado para el frontend. Incluye panel de administración, inventario en tiempo real, y pasarela de integración para pagos.',
      en: 'Complete web platform for automobile parts sales with user control system, shopping cart, electronic receipt generation, and service management. Developed with Django as backend, Python for business logic, and vanilla JavaScript with custom CSS for frontend. Includes admin panel, real-time inventory, and payment gateway integration.',
      pt: 'Plataforma web completa para venda de peças de automóveis com sistema de controle de usuários, carrinho de compras, geração de recibos eletrônicos e gestão de serviços. Desenvolvido com Django como backend, Python para lógica de negócios e JavaScript vanilla com CSS customizado para frontend. Inclui painel administrativo, inventário em tempo real e integração de gateway de pagamento.',
      it: 'Piattaforma web completa per la vendita di ricambi automobilistici con sistema di controllo utenti, carrello della spesa, generazione di ricevute elettroniche e gestione dei servizi. Sviluppato con Django come backend, Python per la logica di business e JavaScript vanilla con CSS personalizzato per il frontend. Include pannello di amministrazione, inventario in tempo reale e integrazione gateway di pagamento.'
    },
    type: 'E-Commerce',
    thumbnail: 'spare.png',
    technologies: ['Django', 'Python', 'JavaScript', 'CSS', 'SQLite', 'Bootstrap'],
    company: 'Sparedrive',
    role: 'Full Stack Developer',
    period: 'Marzo 2024 — Presente',
    achievements: {
      es: '• +1000 productos en catálogo\n• Sistema de boletas electrónicas\n• Control completo de inventario y usuarios',
      en: '• +1000 products in catalog\n• Electronic receipt system\n• Complete inventory and user control',
      pt: '• +1000 produtos no catálogo\n• Sistema de recibos eletrônicos\n• Controle completo de inventário e usuários',
      it: '• +1000 prodotti nel catalogo\n• Sistema di ricevute elettroniche\n• Controllo completo inventario e utenti'
    },
    videoUrl: 'Sparedrive.mp4',
    images: [
      { url: 'spare1.png', caption: { es: 'Catálogo de Productos', en: 'Product Catalog', pt: 'Catálogo de Produtos', it: 'Catalogo Prodotti' } },
      { url: 'spare2.png', caption: { es: 'Carrito de Compras', en: 'Shopping Cart', pt: 'Carrinho de Compras', it: 'Carrello della Spesa' } },
      { url: 'spare3.png', caption: { es: 'Panel de Administración', en: 'Admin Panel', pt: 'Painel Administrativo', it: 'Pannello Admin' } },
      { url: 'spare4.png', caption: { es: 'Gestión de Boletas', en: 'Receipt Management', pt: 'Gestão de Recibos', it: 'Gestione Ricevute' } },
    ]
  },
  {
    id: 'scrappers',
    title: 'Scrappers Automation',
    shortDescription: {
      es: 'Sistema de automatización de scraping avanzado',
      en: 'Advanced scraping automation system',
      pt: 'Sistema de automação de scraping avançado',
      it: 'Sistema di automazione scraping avanzato'
    },
    fullDescription: {
      es: 'Sistema completo de automatización para extracción de datos masivos. Implementa técnicas avanzadas de web scraping con manejo de CAPTCHAs, rotación de proxies, y generación de reportes automáticos. Procesa más de 10,000 registros diarios con alta precisión.',
      en: 'Complete automation system for massive data extraction. Implements advanced web scraping techniques with CAPTCHA handling, proxy rotation, and automatic report generation. Processes over 10,000 daily records with high accuracy.',
      pt: 'Sistema completo de automação para extração massiva de dados. Implementa técnicas avançadas de web scraping com manipulação de CAPTCHAs, rotação de proxies e geração automática de relatórios. Processa mais de 10.000 registros diários com alta precisão.',
      it: 'Sistema completo di automazione per l\'estrazione massiccia di dati. Implementa tecniche avanzate di web scraping con gestione CAPTCHA, rotazione proxy e generazione automatica di report. Elabora oltre 10.000 record giornalieri con alta precisione.'
    },
    type: 'Automation',
    thumbnail: 'scrappers.png',
    technologies: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas'],
    company: 'Neosoltec',
    role: 'Developer & Web Scraper Specialist',
    period: 'Agosto 2023 — Enero 2024',
    achievements: {
      es: '• Extracción de 10,000+ registros diarios\n• Tasa de éxito del 99.5%\n• Automatización completa',
      en: '• Extraction of 10,000+ daily records\n• 99.5% success rate\n• Full automation',
      pt: '• Extração de 10.000+ registros diários\n• Taxa de sucesso de 99.5%\n• Automação completa',
      it: '• Estrazione di 10.000+ record giornalieri\n• Tasso di successo del 99.5%\n• Automazione completa'
    },
    images: [
      { url: 'scrappers.png', caption: { es: 'Scrappers Dashboard', en: 'Scrappers Dashboard', pt: 'Scrappers Dashboard', it: 'Scrappers Dashboard' } },
    ]
  },
  {
    id: 'app2',
    title: 'App Mobile Pro',
    shortDescription: {
      es: 'Aplicación móvil desarrollada con Flutter',
      en: 'Mobile application developed with Flutter',
      pt: 'Aplicativo móvel desenvolvido com Flutter',
      it: 'Applicazione mobile sviluppata con Flutter'
    },
    fullDescription: {
      es: 'Aplicación móvil completa desarrollada con Flutter para gestión de tareas y productividad. Incluye sincronización en tiempo real, notificaciones push, y una interfaz intuitiva y moderna. Compatible con iOS y Android.',
      en: 'Complete mobile application developed with Flutter for task management and productivity. Includes real-time synchronization, push notifications, and a modern intuitive interface. Compatible with iOS and Android.',
      pt: 'Aplicativo móvel completo desenvolvido com Flutter para gerenciamento de tarefas e produtividade. Inclui sincronização em tempo real, notificações push e interface moderna e intuitiva. Compatível com iOS e Android.',
      it: 'Applicazione mobile completa sviluppata con Flutter per la gestione delle attività e la produttività. Include sincronizzazione in tempo reale, notifiche push e un\'interfaccia moderna e intuitiva. Compatibile con iOS e Android.'
    },
    type: 'Mobile App',
    thumbnail: 'app2.png',
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    company: 'Freelance',
    role: 'Mobile Developer',
    period: 'Marzo 2024 — Mayo 2024',
    achievements: {
      es: '• +1000 descargas\n• Interfaz moderna e intuitiva\n• Compatible iOS y Android',
      en: '• +1000 downloads\n• Modern intuitive interface\n• iOS and Android compatible',
      pt: '• +1000 downloads\n• Interface moderna e intuitiva\n• Compatível iOS e Android',
      it: '• +1000 download\n• Interfaccia moderna e intuitiva\n• Compatibile iOS e Android'
    },
    images: [
      { url: 'app2.png', caption: { es: 'App Mobile', en: 'App Mobile', pt: 'App Mobile', it: 'App Mobile' } },
    ]
  },
  {
    id: 'petout',
    title: 'PetOut - App de Mascotas',
    shortDescription: {
      es: 'Aplicación para cuidado y gestión de mascotas',
      en: 'Pet care and management application',
      pt: 'Aplicativo para cuidado e gestão de pets',
      it: 'Applicazione per la cura e gestione degli animali domestici'
    },
    fullDescription: {
      es: 'Aplicación móvil para el cuidado y gestión completa de mascotas. Incluye recordatorios de vacunas, control de alimentación, historial médico, y comunidad de dueños de mascotas. Diseño amigable y fácil de usar.',
      en: 'Mobile application for complete pet care and management. Includes vaccine reminders, feeding control, medical history, and a community of pet owners. Friendly and easy-to-use design.',
      pt: 'Aplicativo móvel para cuidado e gestão completa de pets. Inclui lembretes de vacinas, controle de alimentação, histórico médico e comunidade de donos de pets. Design amigável e fácil de usar.',
      it: 'Applicazione mobile per la cura e la gestione completa degli animali domestici. Include promemoria vaccini, controllo alimentazione, storia medica e una comunità di proprietari di animali. Design amichevole e facile da usare.'
    },
    type: 'Mobile App',
    thumbnail: 'petout.png',
    technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
    company: 'Personal Project',
    role: 'Full Stack Developer',
    period: 'Junio 2024 — Julio 2024',
    achievements: {
      es: '• Gestión completa de mascotas\n• Recordatorios y alertas\n• Comunidad de usuarios',
      en: '• Complete pet management\n• Reminders and alerts\n• User community',
      pt: '• Gestão completa de pets\n• Lembretes e alertas\n• Comunidade de usuários',
      it: '• Gestione completa degli animali\n• Promemoria e avvisi\n• Comunità di utenti'
    },
    images: [
      { url: 'petout.png', caption: { es: 'PetOut App', en: 'PetOut App', pt: 'PetOut App', it: 'PetOut App' } },
    ]
  },
  {
    id: 'prac',
    title: 'Prac - Meshtastic Communication App',
    shortDescription: {
      es: 'App de comunicación LoRa 32 tipo WhatsApp con interfaz amigable',
      en: 'LoRa 32 WhatsApp-like communication app with friendly interface',
      pt: 'App de comunicação LoRa 32 estilo WhatsApp com interface amigável',
      it: 'App di comunicazione LoRa 32 stile WhatsApp con interfaccia amichevole'
    },
    fullDescription: {
      es: 'Aplicación móvil revolucionaria desarrollada con Flutter que permite la comunicación en tiempo real entre dispositivos LoRa 32 sin necesidad de WiFi o datos móviles. Utiliza tecnología Meshtastic para crear una red malla descentralizada donde cada dispositivo actúa como repetidor, extendiendo el rango de comunicación significativamente. Incluye integración con Google Maps para ubicación en tiempo real, API del clima para condiciones meteorológicas, y conexión Bluetooth directa. La interfaz simplificada hace que la tecnología LoRa sea accesible para cualquier usuario, sin necesidad de configuraciones técnicas complejas. Compatible con Android e iOS.',
      en: 'Revolutionary mobile app developed with Flutter that enables real-time communication between LoRa 32 devices without WiFi or mobile data. Uses Meshtastic technology to create a decentralized mesh network where each device acts as a repeater, significantly extending communication range. Includes Google Maps integration for real-time location, weather API for meteorological conditions, and direct Bluetooth connection. The simplified interface makes LoRa technology accessible to any user, without the need for complex technical configurations. Compatible with Android and iOS.',
      pt: 'Aplicativo móvel revolucionário desenvolvido com Flutter que permite comunicação em tempo real entre dispositivos LoRa 32 sem WiFi ou dados móveis. Usa tecnologia Meshtastic para criar uma rede mesh descentralizada onde cada dispositivo atua como repetidor, estendendo significativamente o alcance da comunicação. Inclui integração com Google Maps para localização em tempo real, API de clima para condições meteorológicas e conexão Bluetooth direta. A interface simplificada torna a tecnologia LoRa acessível a qualquer usuário, sem necessidade de configurações técnicas complexas. Compatível com Android e iOS.',
      it: 'App mobile rivoluzionaria sviluppata con Flutter che consente la comunicazione in tempo reale tra dispositivi LoRa 32 senza WiFi o dati mobili. Utilizza la tecnologia Meshtastic per creare una rete mesh decentralizzata in cui ogni dispositivo agisce come ripetitore, estendendo significativamente la portata della comunicazione. Include l\'integrazione con Google Maps per la posizione in tempo reale, API meteo per le condizioni meteorologiche e connessione Bluetooth diretta. L\'interfaccia semplificata rende la tecnologia LoRa accessibile a qualsiasi utente, senza bisogno di configurazioni tecniche complesse. Compatibile con Android e iOS.'
    },
    type: 'IoT & Communication',
    thumbnail: 'prac.png',
    technologies: ['Flutter', 'Dart', 'LoRa 32', 'Meshtastic', 'Google Maps API', 'Bluetooth', 'Weather API'],
    company: 'Personal Project',
    role: 'Full Stack Developer',
    period: 'Julio 2024 — Presente',
    achievements: {
      es: '• Comunicación sin WiFi ni datos móviles\n• Interfaz simplificada tipo WhatsApp\n• Compatible Android e iOS\n• Rango extendido por red malla LoRa',
      en: '• Communication without WiFi or mobile data\n• WhatsApp-like simplified interface\n• Android and iOS compatible\n• Extended range via LoRa mesh network',
      pt: '• Comunicação sem WiFi ou dados móveis\n• Interface simplificada estilo WhatsApp\n• Compatível Android e iOS\n• Alcance estendido via rede mesh LoRa',
      it: '• Comunicazione senza WiFi o dati mobili\n• Interfaccia semplificata stile WhatsApp\n• Compatibile Android e iOS\n• Portata estesa tramite rete mesh LoRa'
    },
    videoUrl: 'PRAC.mp4',
    images: [
      { url: 'prac.png', caption: { es: 'Pantalla Principal', en: 'Main Screen', pt: 'Tela Principal', it: 'Schermata Principale' } },
      { url: 'prac1.png', caption: { es: 'Mapa en Tiempo Real', en: 'Real-time Map', pt: 'Mapa em Tempo Real', it: 'Mappa Tempo Reale' } },
      { url: 'prac2.png', caption: { es: 'Chat LoRa', en: 'LoRa Chat', pt: 'Chat LoRa', it: 'Chat LoRa' } },
      { url: 'prac3.png', caption: { es: 'Conexión Bluetooth', en: 'Bluetooth Connection', pt: 'Conexão Bluetooth', it: 'Connessione Bluetooth' } },
    ]
  },
];

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'Permify',
    period: 'Noviembre 2022 — Enero 2023',
    description: {
      es: 'Desarrollo de aplicaciones web completas con Django y React. Implementación de arquitecturas escalables y microservicios para plataformas de terapia y arte para adultos mayores.',
      en: 'Full-stack web application development with Django and React. Implementation of scalable architectures and microservices for art therapy platforms for elderly adults.',
      pt: 'Desenvolvimento de aplicações web full-stack com Django e React. Implementação de arquiteturas escaláveis e microsserviços para plataformas de arteterapia para idosos.',
      it: 'Sviluppo di applicazioni web full-stack con Django e React. Implementazione di architetture scalabili e microservizi per piattaforme di arteterapia per anziani.',
    },
  },
  {
    role: 'Developer & Web Scraper Specialist',
    company: 'Neosoltec',
    period: 'Agosto 2023 — Enero 2024',
    description: {
      es: 'Desarrollo de herramientas automatizadas de extracción de datos con Python y Selenium. Análisis de datos y generación de reportes automáticos. Extracción de 10,000+ registros diarios.',
      en: 'Development of automated data extraction tools with Python and Selenium. Data analysis and automatic report generation. Extraction of 10,000+ daily records.',
      pt: 'Desenvolvimento de ferramentas automatizadas de extração de dados com Python e Selenium. Análise de dados e geração automática de relatórios. Extração de 10.000+ registros diários.',
      it: 'Sviluppo di strumenti automatizzati di estrazione dati con Python e Selenium. Analisi dei dati e generazione automatica di report. Estrazione di 10.000+ record giornalieri.',
    },
  },
  {
    role: 'C# Developer',
    company: 'I-GO',
    period: 'Febrero 2024 — Abril 2024',
    description: {
      es: 'Desarrollo de aplicaciones empresariales con .NET 8 y Entity Framework. Optimización de consultas y refactorización de código legacy.',
      en: 'Enterprise application development with .NET 8 and Entity Framework. Query optimization and legacy code refactoring.',
      pt: 'Desenvolvimento de aplicações empresariais com .NET 8 e Entity Framework. Otimização de consultas e refatoração de código legado.',
      it: 'Sviluppo di applicazioni enterprise con .NET 8 ed Entity Framework. Ottimizzazione delle query e refactoring del codice legacy.',
    },
  },
  {
    role: '.NET Developer',
    company: 'Serviphar',
    period: 'Febrero 2026 — Actualidad',
    description: {
      es: 'Desarrollé un cotizador de recetario magistral con .NET Core 10, construyendo APIs e integraciones para procesos críticos. Implementé seguridad a nivel de endpoints y generador de guías y facturas para SII.',
      en: 'Developed a magistral formula quotation system with .NET Core 10, building APIs and integrations for critical processes. Implemented endpoint-level security and guide/invoice generator for SII.',
      pt: 'Desenvolvi um sistema de cotação de fórmulas magistrais com .NET Core 10, construindo APIs e integrações para processos críticos. Implementei segurança em endpoints e gerador de guias/faturas para SII.',
      it: 'Ho sviluppato un sistema di quotazione per formule magistrali con .NET Core 10, costruendo API e integrazioni per processi critici. Ho implementato sicurezza a livello di endpoint e generatore di guide/fatture per SII.',
    },
  },
];

// Translations
export const translations = {
  nav: {
    home: { es: 'Inicio', en: 'Home', pt: 'Início', it: 'Inizio' },
    experience: { es: 'Experiencia', en: 'Experience', pt: 'Experiência', it: 'Esperienza' },
    skills: { es: 'Habilidades', en: 'Skills', pt: 'Habilidades', it: 'Competenze' },
    projects: { es: 'Proyectos', en: 'Projects', pt: 'Projetos', it: 'Progetti' },
    certificates: { es: 'Certificados', en: 'Certificates', pt: 'Certificados', it: 'Certificati' },
    contact: { es: 'Contacto', en: 'Contact', pt: 'Contato', it: 'Contatto' },
  },
  hero: {
    title: 'Sebastian Vargas B',
    subtitle: {
      es: 'Analista Programador | Full Stack Developer',
      en: 'Software Analyst | Full Stack Developer',
      pt: 'Analista de Programas | Desenvolvedor Full Stack',
      it: 'Analista di Software | Full Stack Developer'
    },
    description: {
      es: 'Transformando ideas en proyectos digitales innovadores y funcionales con creatividad y eficiencia. Especializado en .NET, Python y Flutter.',
      en: 'Transforming ideas into innovative and functional digital projects with creativity and efficiency. Specialized in .NET, Python, and Flutter.',
      pt: 'Transformando ideias em projetos digitais inovadores e funcionais com criatividade e eficiência. Especializado em .NET, Python e Flutter.',
      it: 'Trasformando idee in progetti digitali innovativi e funzionali con creatività ed efficienza. Specializzato in .NET, Python e Flutter.'
    },
    cta1: { es: 'Ver Proyectos', en: 'View Projects', pt: 'Ver Projetos', it: 'Vedi Progetti' },
    cta2: { es: 'Contactar', en: 'Contact', pt: 'Contatar', it: 'Contatto' },
    disabilityBadge: {
      es: 'Inscrito en el Registro Nacional de Discapacidad (Ley 21.015)',
      en: 'Registered in the National Disability Registry (Law 21.015)',
      pt: 'Inscrito no Registro Nacional de Deficiência (Lei 21.015)',
      it: 'Iscritto nel Registro Nazionale delle Disabilità (Legge 21.015)'
    }
  },
  experience: {
    title: { es: 'Mi Experiencia', en: 'My Experience', pt: 'Minha Experiência', it: 'La Mia Esperienza' },
  },
  skills: {
    title: { es: 'Stack Tecnológico', en: 'Tech Stack', pt: 'Pilha Tecnológica', it: 'Stack Tecnologico' },
    subtitle: {
      es: 'Tecnologías y herramientas que domino profesionalmente',
      en: 'Technologies and tools I master professionally',
      pt: 'Tecnologias e ferramentas que domino profissionalmente',
      it: 'Tecnologie e strumenti che utilizzo professionalmente'
    },
    languages: { es: 'Lenguajes', en: 'Languages', pt: 'Linguagens', it: 'Linguaggi' },
    frameworks: { es: 'Frameworks', en: 'Frameworks', pt: 'Frameworks', it: 'Frameworks' },
    tools: { es: 'Herramientas', en: 'Tools', pt: 'Ferramentas', it: 'Strumenti' },
    languageSkills: { es: 'Idiomas', en: 'Languages', pt: 'Idiomas', it: 'Lingue' },
    certifications: { es: 'Certificaciones', en: 'Certifications', pt: 'Certificações', it: 'Certificazioni' },
  },
  certificates: {
    title: { es: 'Certificados Profesionales', en: 'Professional Certificates', pt: 'Certificados Profissionais', it: 'Certificati Professionali' },
    subtitle: {
      es: 'Certificaciones y logros académicos que respaldan mi experiencia',
      en: 'Certifications and academic achievements that support my experience',
      pt: 'Certificações e conquistas acadêmicas que apoiam minha experiência',
      it: 'Certificazioni e traguardi accademici che supportano la mia esperienza'
    },
    download: { es: 'Descargar', en: 'Download', pt: 'Baixar', it: 'Scarica' },
    viewCredential: { es: 'Ver Credencial', en: 'View Credential', pt: 'Ver Credencial', it: 'Vedi Credenziale' },
    issuer: { es: 'Emisor', en: 'Issuer', pt: 'Emissor', it: 'Emittente' },
    date: { es: 'Fecha', en: 'Date', pt: 'Data', it: 'Data' },
  },
  testimonials: {
    title: { es: 'Lo que dicen de mí', en: 'What people say about me', pt: 'O que dizem de mim', it: 'Cosa dicono di me' },
    subtitle: {
      es: 'Comentarios de colegas y clientes con quienes he trabajado',
      en: 'Comments from colleagues and clients I have worked with',
      pt: 'Comentários de colegas e clientes com quem trabalhei',
      it: 'Commenti da colleghi e clienti con cui ho lavorato'
    },
  },
  blog: {
    title: { es: 'Artículos & Tutoriales', en: 'Articles & Tutorials', pt: 'Artigos & Tutoriais', it: 'Articoli & Tutoriali' },
    subtitle: {
      es: 'Comparto conocimiento sobre desarrollo de software, arquitectura y mejores prácticas',
      en: 'I share knowledge about software development, architecture and best practices',
      pt: 'Compartilho conhecimento sobre desenvolvimento de software, arquitetura e melhores práticas',
      it: 'Condivido conoscenza su sviluppo software, architettura e best practice'
    },
    readMore: { es: 'Leer más', en: 'Read more', pt: 'Ler mais', it: 'Leggi ancora' },
    viewAll: { es: 'Ver Todos los Artículos', en: 'View All Articles', pt: 'Ver Todos os Artigos', it: 'Vedi Tutti gli Articoli' },
  },
  projects: {
    title: { es: 'Proyectos Destacados', en: 'Featured Projects', pt: 'Projetos em Destaque', it: 'Progetti in Evidenza' },
    subtitle: {
      es: 'Haz clic en cualquier proyecto para ver más detalles',
      en: 'Click on any project to see more details',
      pt: 'Clique em qualquer projeto para ver mais detalhes',
      it: 'Clicca su qualsiasi progetto per vedere più dettagli'
    },
    viewProject: { es: 'Ver Detalles', en: 'View Details', pt: 'Ver Detalhes', it: 'Vedi Dettagli' },
    close: { es: 'Cerrar', en: 'Close', pt: 'Fechar', it: 'Chiudi' },
    achievements: { es: 'Logros', en: 'Achievements', pt: 'Conquistas', it: 'Risultati' },
    technologies: { es: 'Tecnologías', en: 'Technologies', pt: 'Tecnologias', it: 'Tecnologie' },
    gallery: { es: 'Galería', en: 'Gallery', pt: 'Galeria', it: 'Galleria' },
  },
  contact: {
    title: { es: 'Contacto', en: 'Contact', pt: 'Contato', it: 'Contatto' },
    subtitle: {
      es: '¿Tienes un proyecto en mente? ¡Conectemos!',
      en: 'Have a project in mind? Let\'s connect!',
      pt: 'Tem um projeto em mente? Vamos nos conectar!',
      it: 'Hai un progetto in mente? Connettiamoci!'
    },
    name: { es: 'Nombre', en: 'Name', pt: 'Nome', it: 'Nome' },
    email: { es: 'Email', en: 'Email', pt: 'Email', it: 'Email' },
    phone: { es: 'Teléfono', en: 'Phone', pt: 'Telefone', it: 'Telefono' },
    message: { es: 'Mensaje', en: 'Message', pt: 'Mensagem', it: 'Messaggio' },
    send: { es: 'Enviar mensaje', en: 'Send Message', pt: 'Enviar mensagem', it: 'Invia messaggio' },
    sending: { es: 'Enviando...', en: 'Sending...', pt: 'Enviando...', it: 'Invio...' },
    wait: { es: 'Espera', en: 'Wait', pt: 'Espere', it: 'Attendi' },
    seconds: { es: 'segundos', en: 'seconds', pt: 'segundos', it: 'secondi' },
    success: { es: '¡Mensaje enviado exitosamente!', en: 'Message sent successfully!', pt: 'Mensagem enviada com sucesso!', it: 'Messaggio inviato con successo!' },
    error: { es: 'Hubo un error al enviar el mensaje. Intenta nuevamente.', en: 'There was an error sending the message. Please try again.', pt: 'Ocorreu um erro ao enviar a mensagem. Tente novamente.', it: 'Si è verificato un errore nell\'invio del messaggio. Riprova.' },
    errorLimit: { es: 'Por favor espera antes de enviar otro mensaje.', en: 'Please wait before sending another message.', pt: 'Por favor, aguarde antes de enviar outra mensagem.', it: 'Si prega di attendere prima di inviare un altro messaggio.' },
    downloadCV: { es: 'Descargar CV', en: 'Download CV', pt: 'Baixar CV', it: 'Scarica CV' },
    terminalWelcome: {
      es: '> Bienvenido a mi terminal interactivo',
      en: '> Welcome to my interactive terminal',
      pt: '> Bem-vindo ao meu terminal interativo',
      it: '> Benvenuto nel mio terminale interattivo'
    },
    terminalStatus: {
      es: '> Estado: Disponible para nuevos proyectos',
      en: '> Status: Available for new projects',
      pt: '> Status: Disponível para novos projetos',
      it: '> Stato: Disponibile per nuovi progetti'
    },
    terminalLocation: {
      es: '> Ubicación: Chile 🇨🇱',
      en: '> Location: Chile 🇨🇱',
      pt: '> Localização: Chile 🇨🇱',
      it: '> Posizione: Cile 🇨🇱'
    },
    terminalPrompt: {
      es: '> Envíame un mensaje para comenzar...',
      en: '> Send me a message to get started...',
      pt: '> Envie-me uma mensagem para começar...',
      it: '> Inviami un messaggio per iniziare...'
    },
    terminalTitle: {
      es: 'sebastian@portfolio:~',
      en: 'sebastian@portfolio:~',
      pt: 'sebastian@portfolio:~',
      it: 'sebastian@portfolio:~'
    }
  },
  footer: {
    copyright: '© {year} Sebastian Vargas B. Todos los derechos reservados.',
    inclusion: 'Candidato Ley de Inclusión Laboral N°21.015 - RND',
  },
  darkMode: { es: 'Modo Oscuro', en: 'Dark Mode', pt: 'Modo Escuro', it: 'Modalità Scura' },
  lightMode: { es: 'Modo Claro', en: 'Light Mode', pt: 'Modo Claro', it: 'Modalità Chiara' },
  changeLanguage: { es: 'Cambiar Idioma', en: 'Change Language', pt: 'Mudar Idioma', it: 'Cambia Lingua' },
};

// Contact Information
export const contactInfo = {
  linkedin: 'https://www.linkedin.com/in/svb404/',
  email: 'sebavarber.proton.me',
  phone: '+569 36396900',
  location: 'Santiago, Chile'
};
