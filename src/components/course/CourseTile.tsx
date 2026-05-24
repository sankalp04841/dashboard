'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, Brain, Code2, Play, CheckCircle2, Circle } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import ProgressBar from '../ui/ProgressBar';
import CounterNumber from '../ui/CounterNumber';
import { Course } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Network,
  Brain,
  Code2,
};

interface CourseTileProps {
  course: Course;
}

export default function CourseTile({ course }: CourseTileProps) {
  const IconComponent = iconMap[course.icon_name] || Code2;
  const isCompleted = course.progress === 100;

  // Visual gradients mapping
  const gradientStyles: Record<string, { glow: string; textGrad: string; iconBg: string }> = {
    Layers: {
      glow: 'rgba(99, 102, 241, 0.15)', // Indigo
      textGrad: 'from-blue-400 to-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    },
    Network: {
      glow: 'rgba(139, 92, 246, 0.15)', // Violet
      textGrad: 'from-violet-400 to-fuchsia-400',
      iconBg: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    },
    Brain: {
      glow: 'rgba(236, 72, 153, 0.15)', // Pink/Magenta
      textGrad: 'from-rose-400 to-pink-400',
      iconBg: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    },
    Code2: {
      glow: 'rgba(16, 185, 129, 0.15)', // Emerald
      textGrad: 'from-emerald-400 to-teal-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    },
  };

  const style = gradientStyles[course.icon_name] || gradientStyles.Layers;

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 20 } as const;
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: 5,
      transition: springConfig
    }
  };

  const titleVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      transition: springConfig
    }
  };

  const progressSectionVariants = {
    initial: { scaleX: 1 },
    hover: { 
      scaleX: 1.02,
      transition: springConfig
    }
  };

  return (
    <GlowCard
      className="p-6 h-full flex flex-col justify-between border-white/[0.05]"
      glowColor={style.glow}
      interactive={true}
      magnetic={true}
    >
      <div className="space-y-4">
        {}
        <div className="flex justify-between items-center">
          <motion.div 
            variants={iconVariants}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.iconBg}`}
          >
            <IconComponent className="h-5 w-5" />
          </motion.div>

          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">Completed</span>
              </>
            ) : (
              <>
                <Circle className="h-3.5 w-3.5 text-zinc-600 animate-pulse" />
                <span>In Progress</span>
              </>
            )}
          </span>
        </div>

        {}
        <div className="space-y-1">
          <motion.h3 
            variants={titleVariants}
            className="font-bold text-lg tracking-tight text-white group-hover:text-zinc-200"
          >
            {course.title}
          </motion.h3>
          <p className="text-xs font-semibold text-zinc-500">Curriculum v2.4</p>
        </div>
      </div>

      {}
      <motion.div 
        variants={progressSectionVariants}
        className="mt-8 space-y-3 origin-left"
      >
        <div className="flex justify-between items-end">
          <span className="text-xs font-semibold text-zinc-400 tracking-wide">Course Progress</span>
          <div className="text-sm font-bold text-white flex items-baseline">
            <CounterNumber value={course.progress} suffix="%" />
          </div>
        </div>

        <ProgressBar value={course.progress} colorClass={`bg-gradient-to-r ${style.textGrad}`} />

        <div className="flex items-center justify-between pt-1">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors duration-150 group/btn cursor-pointer"
          >
            <Play className="h-3 w-3 fill-current transition-transform duration-200 group-hover/btn:scale-110" />
            <span>Resume Lecture</span>
          </motion.button>
          <span className="text-[10px] text-zinc-600 font-bold tracking-wider">SECURE_ID: {course.id.slice(0, 5)}</span>
        </div>
      </motion.div>
    </GlowCard>
  );
}
