'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import CounterNumber from '../ui/CounterNumber';
import { getGreeting } from '@/lib/utils';

interface HeroTileProps {
  isIdle?: boolean;
}

interface MiniParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function HeroTile({ isIdle = false }: HeroTileProps) {
  const [greeting, setGreeting] = useState('Welcome back');
  const [heroParticles, setHeroParticles] = useState<MiniParticle[]>([]);
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGreeting(getGreeting());
  
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 2.5 + 1.5,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * -8,
    }));
    setHeroParticles(generated);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });


  const meshTranslateX = useTransform(springX, [-200, 200], [-6, 6]);
  const meshTranslateY = useTransform(springY, [-200, 200], [-6, 6]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const sparkleVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: 15,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <div 
      ref={tileRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="w-full h-full gpu-layer"
    >
      <GlowCard 
        magnetic={true} 
        interactive={true}
        className="
w-full 
h-full 
min-h-[280px]
overflow-hidden
relative
p-8
flex
flex-col
justify-between
border-white/[0.08]
"
        glowColor="rgba(139, 92, 246, 0.15)"
      >
        {}
        <motion.div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
          {}
          <motion.div
            animate={{
              scale: isIdle ? [1, 1.05, 1] : [1, 1.03, 1],
              opacity: isIdle ? [0.3, 0.5, 0.3] : [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              x: meshTranslateX,
              y: meshTranslateY,
            }}
           className="
absolute
top-[-10%]
right-[-5%]
w-[70%]
h-[90%]
rounded-full
bg-gradient-to-br
from-indigo-500/15
via-purple-500/10
to-transparent
blur-[70px]
"
          />
        </motion.div>

        {}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-1 rounded-2xl">
          <motion.div
            className="absolute top-[-50%] w-[35%] h-[200%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-[50px] rotate-[25deg]"
            animate={{
              left: ['-50%', '160%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 8.5, 
              ease: 'easeInOut',
            }}
          />
        </div>

        {}
        {heroParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-indigo-400/20 blur-[0.3px] pointer-events-none z-1"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 20, 0],
              y: [0, (Math.random() - 0.5) * 20, 0],
              opacity: isIdle ? [0.15, 0.35, 0.15] : [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}

        {}
        <div className="relative z-10 flex justify-between items-start pt-6">
          <div className="space-y-3">
            <div className="relative z-10 mb-3">
<motion.div
  initial={{ rotate: 0 }}
  animate={{ rotate: 0 }}
  whileHover={{
    scale: 1.03,
    y: -2
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20
  }}
  className="
    inline-flex
    items-center
    gap-2
    px-3
    py-1
    rounded-full
    bg-indigo-500/10
    border
    border-indigo-500/20
    text-indigo-400
    text-[11px]
    font-semibold
    uppercase
    tracking-[0.2em]
    overflow-hidden
    rotate-0
    skew-x-0
  "
>
    <Sparkles className="h-3 w-3 animate-pulse" />
    <span>Learning Console</span>
  </motion.div>
</div>
            <motion.h1 
              variants={contentVariants}
              className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
            >
              {greeting}, Sankyy
            </motion.h1>
            <p className="text-sm font-medium text-zinc-400 tracking-wide mt-1.5">
              Keep up the good work. blah blah motivation, compliments
            </p>
          </div>
        </div>

        {}
        <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/[0.04] pt-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/5 cursor-pointer"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.4 }
              }}
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Flame className="h-6 w-6 text-amber-500 fill-amber-500/20 animate-pulse" />
            </motion.div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1 text-white">
                <CounterNumber value={7} />
                <span className="text-sm font-semibold text-zinc-400">day learning streak</span>
              </div>
              <span className="text-xs font-semibold text-amber-500/80">Congo, Daily Goal Achieved</span>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Current Rank</span>
            <span className="text-sm font-bold text-zinc-200">Awesome super extra pro coder</span>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
