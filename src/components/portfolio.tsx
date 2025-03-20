import { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Github, Moon, Sun, Globe } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

// Añade esto después de tus imports
const languageOptions = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

interface Description {
  es: string;
  en: string;
  pt: string;
  it: string;
}

interface Project {
  title: string;
  description: Description;
  type: string;
  image: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
}

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
    
    if (lastSubmissionTime) {
      const timeDifference = (new Date().getTime() - parseInt(lastSubmissionTime, 10)) / 1000;
      if (timeDifference < 300) { // 300 segundos = 5 minutos
        setCanSubmit(false);
        setTimeLeft(Math.ceil(300 - timeDifference));
      } else {
        // Limpiar el almacenamiento si el tiempo ya ha pasado
        localStorage.removeItem('lastSubmissionTime');
        setCanSubmit(true);
      }
    }
  
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
      document.documentElement.classList.toggle('dark', savedDarkMode === 'true');
    }
  
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        // Actualizar localStorage en cada tick para preservar el tiempo exacto
        localStorage.setItem('timeLeft', (timeLeft - 1).toString());
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanSubmit(true);
      // Limpiar las entradas de localStorage cuando el temporizador termina
      localStorage.removeItem('lastSubmissionTime');
      localStorage.removeItem('timeLeft');
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convertir FormData a un objeto
    const formDataObject = Object.fromEntries(formData as any);
    console.log(formDataObject); // Verifica los datos en la consola

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      // Verifica el estado HTTP
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const result = await response.json();

      // Verifica la respuesta de la API
      if (result.success) {
        setFormSubmitted(true);
        form.reset();
        
        // Almacenar la marca de tiempo actual para un seguimiento preciso
        const currentTime = new Date().getTime();
        localStorage.setItem('lastSubmissionTime', currentTime.toString());
        localStorage.setItem('timeLeft', '300'); // 300 segundos iniciales
        
        setCanSubmit(false);
        setTimeLeft(300); // 300 segundos = 5 minutos
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        throw new Error('La API devolvió un error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
    localStorage.setItem('language', lang);
  };

  const projects: Project[] = [
    {
      title: 'ArtMind',
      description: {
        es: 'Plataforma de arte terapia para personas mayores',
        en: 'Art therapy platform for the elderly',
        pt: 'Plataforma de terapia de arte para idosos',
        it: 'Piattaforma di arte terapia per anziani',
      },
      type: 'Website',
      image: 'art.png',
    },
    {
      title: 'SpareDrive',
      description: {
        es: 'Plataforma web de venta y repuesto de autos',
        en: 'Web platform for car sales and spare parts',
        pt: 'Plataforma web de venda e peças de reposição de carros',
        it: 'Piattaforma web per la vendita e i pezzi di ricambio per auto',
      },
      type: 'Website',
      image: 'spare.png',
    },
    {
      title: 'Webscrapper',
      description: {
        es: 'Herramienta de web scraping para análisis de datos',
        en: 'Web scraping tool for data analysis',
        pt: 'Ferramenta de web scraping para análise de dados',
        it: 'Strumento di web scraping per l\'analisi dei dati',
      },
      type: 'Desktop Application',
      image: 'scrappers.png',
    },
    {
      title: 'TellevoAPP',
      description: {
        es: 'Aplicación móvil de transporte compartido',
        en: 'Mobile app for shared transportation',
        pt: 'Aplicativo móvel de transporte compartilhado',
        it: 'App mobile per il trasporto condiviso',
      },
      type: 'Android App',
      image: 'app2.png',
    },
    {
      title: 'PetOut',
      description: {
        es: 'Aplicación móvil para sacar a tu mascota',
        en: 'Mobile app to walk your pet',
        pt: 'Aplicativo móvel para passear com seu animal de estimação',
        it: 'App mobile per portare a spasso il tuo animale domestico',
      },
      type: 'Android App',
      image: 'petout.jpg',
    },
  ];

  const experience: Experience[] = [
    {
      role: 'Full Stacker',
      company: 'Permify',
      period: 'Noviembre 2022 — Enero 2023',
    },
    {
      role: 'Developer/ Webscrapper',
      company: 'Neosoltec',
      period: 'Agosto 2023 — Enero 2024',
    },
    {
      role: 'C# Developer',
      company: 'I-GO',
      period: 'Febrero 2024 — Abril 2024',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-2xl font-bold text-blue-600 dark:text-blue-400">Portfolio</a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200" title="Inicio">{language === 'es' ? 'Inicio' : language === 'en' ? 'Home' : language === 'pt' ? 'Início' : 'Inizio'}</a>
              <a href="#experiencia" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200" title="Experiencia">{language === 'es' ? 'Experiencia' : language === 'en' ? 'Experience' : language === 'pt' ? 'Experiência' : 'Esperienza'}</a>
              <a href="#proyectos" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200" title="Proyectos">{language === 'es' ? 'Proyectos' : language === 'en' ? 'Projects' : language === 'pt' ? 'Projetos' : 'Progetti'}</a>
              <a href="#contacto" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200" title="Contacto">{language === 'es' ? 'Contacto' : language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : 'Contatto'}</a>
              <button onClick={toggleDarkMode} className="bg-white border border-black dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200" title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}>
                {isDarkMode ? <Sun size={24} className=" text-yellow-400" /> : <Moon size={24}  />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} 
                  className=" bg-white border border-black dark:bg-gray-800 flex items-center gap-3 text-gray-600 dark:text-yellow-400 hover:text-blue-600 transition-colors duration-200" 
                  title="Cambiar Idioma"
                >
                  <Globe size={24} />
                  <span className="text-sm">{languageOptions.find(lang => lang.code === language)?.flag}</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className=" space-y-1 absolute right-0 mt-2 w-48 bg-transparent  rounded-lg  dark:border-gray-700 overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => toggleLanguage(option.code)}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200
                          ${language === option.code 
                            ? 'bg-blue-900 text-white dark:bg-blue-900' 
                            : 'text-black-700 dark:text-blue-300 hover:bg-gray-700 dark:hover:bg-gray-700'
                          }`}
                        title={option.name}
                      >
                        <span className="text-lg">{option.flag}</span>
                        <span>{option.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              className="md:hidden p-2 rounded-md hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#inicio" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100" title="Inicio">{language === 'es' ? 'Inicio' : language === 'en' ? 'Home' : language === 'pt' ? 'Início' : 'Inizio'}</a>
                <a href="#experiencia" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100" title="Experiencia">{language === 'es' ? 'Experiencia' : language === 'en' ? 'Experience' : language === 'pt' ? 'Experiência' : 'Esperienza'}</a>
                <a href="#proyectos" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100" title="Proyectos">{language === 'es' ? 'Proyectos' : language === 'en' ? 'Projects' : language === 'pt' ? 'Projetos' : 'Progetti'}</a>
                <a href="#contacto" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100" title="Contacto">{language === 'es' ? 'Contacto' : language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : 'Contatto'}</a>
                <button onClick={toggleDarkMode} className="block px-3 py-2 rounded-md text-black-600 dark:text-black-300 hover:text-blue-600 hover:bg-gray-100" title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}>
                  {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </button>
                <div className="relative">
                  <button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} className="block px-3 py-2 rounded-md text-black-600 dark:text-black-300 hover:text-blue-600 hover:bg-gray-100" title="Cambiar Idioma">
                    {language === 'es' ? 'Español' : language === 'en' ? 'English' : language === 'pt' ? 'Português' : 'Italiano'}
                  </button>
                  {isLanguageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800  border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                      <button onClick={() => toggleLanguage('es')} className={`w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-colors duration-200 ${language === 'es' ? 'bg-blue-600 text-white dark:bg-blue-700' : ''}`} title="Español">
                        Español
                      </button>
                      <button onClick={() => toggleLanguage('en')} className={`w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-colors duration-200 ${language === 'en' ? 'bg-blue-600 text-white dark:bg-blue-700' : ''}`} title="English">
                        English
                      </button>
                      <button onClick={() => toggleLanguage('pt')} className={`w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-colors duration-200 ${language === 'pt' ? 'bg-blue-600 text-white dark:bg-blue-700' : ''}`} title="Português">
                        Português
                      </button>
                      <button onClick={() => toggleLanguage('it')} className={`w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-colors duration-200 ${language === 'it' ? 'bg-blue-600 text-white dark:bg-blue-700' : ''}`} title="Italiano">
                        Italiano
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section id="inicio" className="relative py-24 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">Sebastian Vargas B</h1>
            <p className="text-xl mb-8">{language === 'es' ? 'Analista Programador' : language === 'en' ? 'Software Analyst' : language === 'pt' ? 'Analista de Software' : 'Analista di Software'}</p>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              {language === 'es' ? 'Transformando ideas en proyectos digitales innovadores y funcionales con creatividad y eficiencia.' : language === 'en' ? 'Transforming ideas into innovative and functional digital projects with creativity and efficiency.' : language === 'pt' ? 'Transformando ideias em projetos digitais inovadores e funcionais com criatividade e eficiência.' : 'Trasformando idee in progetti digitali innovativi e funzionali con creatività ed efficienza.'}
            </p>
            <div className="mt-10 flex justify-center space-x-4">
            <a href="#proyectos" className="bg-white dark:bg-gray-800 text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200" title="Ver Proyectos">
                {language === 'es' ? 'Ver Proyectos' : language === 'en' ? 'View Projects' : language === 'pt' ? 'Ver Projetos' : 'Vedi Progetti'}
              </a>
              <a href="#contacto" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors duration-200" title="Contactar">
                {language === 'es' ? 'Contactar' : language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : 'Contatto'}
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experiencia" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">{language === 'es' ? 'Mi Experiencia' : language === 'en' ? 'My Experience' : language === 'pt' ? 'Minha Experiência' : 'La Mia Esperienza'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {experience.map((job, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{job.role}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{job.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="habilidades" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
              {language === 'es' ? 'Mis Habilidades' : language === 'en' ? 'My Skills' : language === 'pt' ? 'Minhas Habilidades' : 'Le Mie Competenze'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Python */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden p-2">
                  <img src="dist/python.png" alt="Python" className="w-32 h-32 object-contain" />
                </div>
                <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div className="h-3 bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-center font-medium">
                  {language === 'es' ? 'Desarrollo Backend y Análisis de Datos' : 
                  language === 'en' ? 'Backend Development and Data Analysis' : 
                  language === 'pt' ? 'Desenvolvimento Backend e Análise de Dados' : 
                  'Sviluppo Backend e Analisi dei Dati'}
                </p>
              </div>

              {/* C# */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden p-2">
                  <img src="dist\csharp.png" alt="C#" className="w-32 h-32 object-contain" />
                </div>
                <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div className="h-3 bg-purple-600 dark:bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-center font-medium">
                  {language === 'es' ? 'Desarrollo de Aplicaciones .NET' : 
                  language === 'en' ? '.NET Application Development' : 
                  language === 'pt' ? 'Desenvolvimento de Aplicações .NET' : 
                  'Sviluppo di Applicazioni .NET'}
                </p>
              </div>

              {/* Flutter */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden p-2">
                  <img src="dist/flutter.png" alt="Flutter" className="w-32 h-32 object-contain" />
                </div>
                <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div className="h-3 bg-teal-600 dark:bg-teal-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-center font-medium">
                  {language === 'es' ? 'Desarrollo de Aplicaciones Móviles' : 
                  language === 'en' ? 'Mobile Application Development' : 
                  language === 'pt' ? 'Desenvolvimento de Aplicações Móveis' : 
                  'Sviluppo di Applicazioni Mobili'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-24 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">{language === 'es' ? 'Proyectos' : language === 'en' ? 'Projects' : language === 'pt' ? 'Projetos' : 'Progetti'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                >
                  <div className={`
                    w-full
                    ${project.type === 'Android App'
                      ? 'h-64 flex items-center justify-center p-1'
                      : 'h-48'
                    }
                    overflow-hidden
                  `}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`
                        object-contain
                        ${project.type === 'Android App'
                          ? 'max-h-full max-w-full'
                          : 'w-full h-full object-cover'
                        }
                      `}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.description[language as keyof Description]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">{language === 'es' ? 'Contacto' : language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : 'Contatto'}</h2>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="access_key"
                  value="342904ad-f4df-4993-8003-1306fdaa38a4"
                />
                <input
                  type="hidden"
                  name="Asunto"
                  value={language === 'es' ? 'Nuevo mensaje desde Portfolio' : language === 'en' ? 'New message from Portfolio' : language === 'pt' ? 'Nova mensagem do Portfolio' : 'Nuovo messaggio dal Portfolio'}
                />
                <input
                  type="hidden"
                  name="from_name"
                  value="Portfolio Contact Form"
                />
                <input
                  type="hidden"
                  name="redirect"
                  value="https://web3forms.com/success"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="Nombre"
                    placeholder={language === 'es' ? 'Nombre' : language === 'en' ? 'Name' : language === 'pt' ? 'Nome' : 'Nome'}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-300 outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="Correo"
                    placeholder={language === 'es' ? 'Email' : language === 'en' ? 'Email' : language === 'pt' ? 'Email' : 'Email'}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-300 outline-none transition-all"
                  />
                </div>
                <input
                  type="number"
                  name="Telefono"
                  placeholder={language === 'es' ? 'Teléfono' : language === 'en' ? 'Phone' : language === 'pt' ? 'Telefone' : 'Telefono'}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-300 outline-none transition-all"
                />
                <textarea
                  name="Mensaje"
                  placeholder={language === 'es' ? 'Mensaje' : language === 'en' ? 'Message' : language === 'pt' ? 'Mensagem' : 'Messaggio'}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-300 outline-none transition-all"
                />
                {formSubmitted && (
                  <div className="text-green-600 dark:text-green-400 text-center">
                    ¡Mensaje enviado exitosamente!
                  </div>
                )}
                {formError && (
                  <div className="text-red-600 dark:text-red-400 text-center">
                    Hubo un error al enviar el mensaje. Intenta nuevamente.
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
                    canSubmit ? 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600' : 'bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!canSubmit}
                  title={canSubmit ? (language === 'es' ? 'Enviar mensaje' : language === 'en' ? 'Send Message' : language === 'pt' ? 'Enviar mensagem' : 'Invia messaggio') : `Espera ${timeLeft} segundos`}
                >
                  {canSubmit ? (language === 'es' ? 'Enviar mensaje' : language === 'en' ? 'Send Message' : language === 'pt' ? 'Enviar mensagem' : 'Invia messaggio') : `Espera ${timeLeft} segundos`}
                </button>
              </form>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-center space-x-6">
    <a href="https://www.linkedin.com/in/svb404/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200" title="LinkedIn">
      <Linkedin size={24} />
    </a>
    <a href="https://github.com/DRATENKKO" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200" title="GitHub">
      <Github size={24} />
    </a>
  </div>
  <div className="flex justify-center mt-6">
    <a
      href="CV.pdf"
      className="flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
      title={
        language === 'es'
          ? 'Descargar CV'
          : language === 'en'
          ? 'Download CV'
          : language === 'pt'
          ? 'Baixar CV'
          : 'Scarica CV'
      }
      target="_blank"
      rel="noopener noreferrer"
      download
    >
      <FontAwesomeIcon icon={faFilePdf} size="3x" className="mr-3" />
      {language === 'es'
        ? 'Descargar CV'
        : language === 'en'
        ? 'Download CV'
        : language === 'pt'
        ? 'Baixar CV'
        : 'Scarica CV'}
    </a>
  </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300">
          <p className="text-sm">© {new Date().getFullYear()} SebastianVB Portfolio. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
