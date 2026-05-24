'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; 
  colorClass?: string;
  glowColor?: string;
}

export default function ProgressBar({
  value,
  colorClass = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  glowColor = 'rgba(139, 92, 246, 0.5)',
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const scaleX = clampedValue / 100;

  const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  } as const;

  return (
    <div className="relative w-full h-2 bg-zinc-900/80 rounded-full border border-white/[0.04] p-[1px] overflow-visible">
      {}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {}
        <motion.div
          className={`absolute inset-y-0 left-0 w-full rounded-full origin-left ${colorClass}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scaleX }}
          transition={springConfig}
          style={{
            boxShadow: `0 0 8px ${glowColor}`,
          }}
        />

        {}
        <motion.div
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          animate={{
            left: ['-30%', '130%'],
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -ml-1.5 h-3 w-3 rounded-full bg-white border-2 border-indigo-400 pointer-events-none z-10"
        style={{
          boxShadow: `0 0 8px #fff, 0 0 14px ${glowColor}`,
        }}
        initial={{ left: '0%' }}
        animate={{ left: `${clampedValue}%` }}
        transition={springConfig}
      >
        <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75" />
      </motion.div>
    </div>
  );
}
