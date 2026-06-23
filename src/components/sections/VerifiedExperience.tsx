const jobs = [
  ['.NET Developer','Serviphar','Febrero 2026 — Actualidad','Desarrollo de un cotizador con .NET, APIs e integraciones; seguridad en endpoints y documentos electrónicos para SII.'],
  ['C# Developer','I-GO','Febrero 2024 — Abril 2024','Desarrollo de aplicaciones empresariales con .NET y Entity Framework, optimización de consultas y refactorización.'],
  ['Developer & Web Scraper Specialist','Neosoltec','Agosto 2023 — Enero 2024','Automatización de extracción de datos con Python y Selenium, análisis con Pandas y generación de reportes.'],
  ['Full Stack Developer','Permify','Noviembre 2022 — Enero 2023','Desarrollo de aplicaciones web con Django y React para una plataforma de actividades artísticas y memoria.'],
];

export const VerifiedExperience = ({ language }: { language: string }) => (
  <section id="experiencia" className="bg-[#f5f1e9] py-20 dark:bg-slate-900/60 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <header className="mb-12 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Trayectoria</p><h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{language === 'en' ? 'Experience' : 'Experiencia'}</h2></header>
      <div className="grid gap-4 md:grid-cols-2">{jobs.map(([role,company,period,description]) => <article key={`${company}-${role}`} className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950 sm:p-7"><p className="text-sm font-semibold text-stone-500">{company} · {period}</p><h3 className="mt-3 font-serif text-2xl font-semibold">{role}</h3><p className="mt-4 leading-7 text-stone-600 dark:text-slate-300">{description}</p></article>)}</div>
    </div>
  </section>
);
