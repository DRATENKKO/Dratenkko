import { useState, useEffect, useRef } from 'react';

export function useSectionObserver(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Clear previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observersRef.current.push(observer);

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
