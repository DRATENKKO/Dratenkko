import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scaleOnHover?: number;
}

export const TiltCard3D = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scaleOnHover = 1.05,
}: TiltCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ perspective }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: scaleOnHover }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="w-full h-full transition-shadow duration-300"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>

      {/* 3D Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2), transparent 70%)`,
          transform: `translateZ(20px)`,
        }}
      />
    </motion.div>
  );
};

// Floating 3D Card variant
interface Floating3DCardProps {
  children: ReactNode;
  className?: string;
  floatSpeed?: number;
}

export const Floating3DCard = ({
  children,
  className = '',
  floatSpeed = 3,
}: Floating3DCardProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -10, 0],
        rotateX: [0, 2, 0],
        rotateY: [0, -2, 0],
      }}
      transition={{
        duration: floatSpeed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          rotateX: [0, 3, 0],
          rotateY: [0, -3, 0],
        }}
        transition={{
          duration: floatSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>

      {/* Shadow that moves with the float */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl bg-black/20 blur-xl"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: floatSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

// Interactive hover card with glow effect
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard = ({
  children,
  className = '',
  glowColor = '#8b5cf6',
}: GlowCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Animated glow background */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"
        style={{ background: glowColor }}
      />

      {/* Glow animation */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${glowColor}40, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${glowColor}40, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${glowColor}40, transparent 50%)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 bg-white dark:bg-deep-ocean rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
