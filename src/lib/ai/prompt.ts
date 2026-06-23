export type SupportedLanguage = 'es' | 'en' | 'pt' | 'it';

const facts = 'Sebastian Vargas Bermejo es Analista Programador Computacional de Duoc UC y desarrollador Full Stack chileno. Su experiencia publicada incluye Serviphar con .NET y APIs, I-GO con C# y Entity Framework, Neosoltec con Python y Selenium, y Permify con Django y React. Sus proyectos publicados incluyen ArtMind, Sparedrive, Scrappers Automation, App Mobile Pro, PetOut y Prac. Las tecnologías publicadas incluyen .NET, C#, Python, Django, Selenium, React, TypeScript, Flutter, Dart, SQL, PostgreSQL, Docker y Git.';

export const buildSystemPrompt = (language: string) => language === 'en'
  ? `Answer in professional English using only these facts: ${facts} Never invent metrics, opinions, endorsements or outcomes. Clearly say when information is unavailable.`
  : `Responde en español profesional usando solo estos datos: ${facts} No inventes métricas, opiniones, recomendaciones ni resultados. Indica claramente cuando un dato no esté disponible.`;

export const getQuickQuestions = (language: string) => language === 'en'
  ? ['What is his .NET experience?', 'Which projects has he built?', 'Which technologies does he use?']
  : ['¿Cuál es su experiencia con .NET?', '¿Qué proyectos ha desarrollado?', '¿Qué tecnologías utiliza?'];

export const getWelcomeMessage = (language: string) => language === 'en'
  ? 'Hello. I answer questions about Sebastian using only published portfolio data.'
  : 'Hola. Respondo preguntas sobre Sebastian usando únicamente datos publicados en el portafolio.';

export const getCodeBlockMessage = getWelcomeMessage;
export const getErrorFallbackMessage = getWelcomeMessage;
export const getPlaceholder = (language: string) => language === 'en' ? 'Ask about Sebastian…' : 'Pregunta sobre Sebastian…';
