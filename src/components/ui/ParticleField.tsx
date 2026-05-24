'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleFieldProps {
  isIdle?: boolean;
}

export default function ParticleField({ isIdle = false }: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
  
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 20 + 25, 
      delay: Math.random() * -20,
    }));
    
    setParticles(generated);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;


  const orbs = [
    {
      id: 'orb-indigo',
      color: 'bg-indigo-600/10 dark:bg-indigo-500/8',
      size: 'w-[45vw] h-[45vw]',
      animateX: ['0vw', '15vw', '-10vw', '0vw'],
      animateY: ['0vh', '10vh', '-5vh', '0vh'],
      scale: [1, 1.08, 0.95, 1],
      duration: 18,
    },
    {
      id: 'orb-purple',
      color: 'bg-purple-600/8 dark:bg-purple-500/6',
      size: 'w-[50vw] h-[50vw]',
      animateX: ['0vw', '-12vw', '8vw', '0vw'],
      animateY: ['0vh', '-8vh', '12vh', '0vh'],
      scale: [1, 0.93, 1.06, 1],
      duration: 22,
    },
    {
      id: 'orb-blue',
      color: 'bg-blue-600/8 dark:bg-blue-500/6',
      size: 'w-[35vw] h-[35vw]',
      animateX: ['0vw', '8vw', '-12vw', '0vw'],
      animateY: ['0vh', '15vh', '-10vh', '0vh'],
      scale: [1, 1.05, 0.9, 1],
      duration: 16,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 gpu-layer">
      {}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-[100px] mix-blend-screen opacity-70 ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.id === 'orb-indigo' ? '10%' : orb.id === 'orb-purple' ? '45%' : '20%',
            top: orb.id === 'orb-indigo' ? '15%' : orb.id === 'orb-purple' ? '40%' : '5%',
          }}
          animate={{
            x: orb.animateX,
            y: orb.animateY,
            scale: isIdle ? orb.scale.map(s => s * 1.08) : orb.scale,
            opacity: isIdle ? [0.7, 0.85, 0.7] : [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: isIdle ? orb.duration * 0.8 : orb.duration, 
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}

      {}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/10 blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', `${(Math.random() - 0.5) * 8}vw`],
            opacity: isIdle ? [0.1, 0.25, 0.1] : [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear' as const,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
