import { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't show on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }}
    >
      {/* Main cursor dot */}
      <motion.div
        className="relative"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-purple-500/50"
          animate={{
            scale: isHovering ? 1.8 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.15 }}
        />

        {/* Inner dot */}
        <div
          className={`w-3 h-3 rounded-full ${
            isHovering
              ? 'bg-gradient-to-br from-purple-500 to-blue-500'
              : 'bg-purple-500'
          } shadow-lg`}
        />

        {/* Glow effect */}
        {isHovering && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          />
        )}
      </motion.div>
    </div>
  );
};

// Konami Code Easter Egg
export const useKonamiCode = (callback: () => void) => {
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[index]) {
        index++;

        if (index === konamiCode.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Easter Egg Modal
export const useEasterEgg = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const activateEasterEgg = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 3000);
  };

  useKonamiCode(activateEasterEgg);

  return { showEasterEgg, activateEasterEgg };
};
