'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import CounterNumber from '../ui/CounterNumber';
import { ActivityDay } from '@/types';

export default function ActivityTile() {
  const [activityData, setActivityData] = useState<ActivityDay[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [randomDelays, setRandomDelays] = useState<number[]>([]);

  useEffect(() => {
    const data: ActivityDay[] = [];
    const now = new Date();
    
    for (let i = 111; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (Math.random() < baseChance) {
        count = Math.floor(Math.random() * 8) + 1;
        if (count <= 2) level = 1;
        else if (count <= 4) level = 2;
        else if (count <= 6) level = 3;
        else level = 4;
      }

      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      });
    }
    
    setActivityData(data);

    setRandomDelays(Array.from({ length: 112 }).map(() => Math.random() * 0.45));
  }, []);

  const getLevelColor = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 0: return 'bg-zinc-900 border-white/[0.02]';
      case 1: return 'bg-indigo-950/40 border-indigo-900/20 text-indigo-400';
      case 2: return 'bg-indigo-900/50 border-indigo-800/30 text-indigo-300';
      case 3: return 'bg-indigo-600/70 border-indigo-500/30 text-indigo-100';
      case 4: return 'bg-indigo-500 border-indigo-400/30 text-white';
    }
  };

  const cellVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },

  visible: (delay) => ({
    scale: 1,
    opacity: 1,
    filter: 'brightness(1)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: delay,
    }
  }),

  hover: {
    scale: 1.35,
    opacity: 1,
    filter: 'brightness(1.4)',
    boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
    zIndex: 20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 12,
    }
  },

  nearby: {
    scale: 1.15,
    opacity: 1,
    filter: 'brightness(1.2)',
    zIndex: 10,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 18,
    }
  }
};

const hoveredDay =
  hoveredIndex !== null
    ? activityData[hoveredIndex]
    : null;

  return (
    <GlowCard 
      className="p-6 h-full flex flex-col justify-between border-white/[0.05]"
      glowColor="rgba(139, 92, 246, 0.15)"
      interactive={true}
      magnetic={true}
    >
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="h-4 w-4 text-violet-400 animate-pulse" />
              <span>Learning Activity</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Study Heatmap</h3>
          </div>
          
          <div className="flex items-center gap-1 bg-zinc-900/50 border border-white/[0.04] rounded-lg p-1.5 text-xs text-emerald-400 font-semibold cursor-default">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+18% coding output</span>
          </div>
        </div>

        {}
        <div className="relative pt-2">
          {activityData.length > 0 && randomDelays.length > 0 ? (
            <div className="flex flex-col gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[280px]">
                {activityData.map((day, idx) => {
                  const row = idx % 7;
                  const col = Math.floor(idx / 7);

                
                  let isNearby = false;
                  if (hoveredIndex !== null) {
                    const hRow = hoveredIndex % 7;
                    const hCol = Math.floor(hoveredIndex / 7);
                    const distance = Math.sqrt((row - hRow) ** 2 + (col - hCol) ** 2);
                    isNearby = distance > 0 && distance <= 1.8; // Ripple cells adjacent or close diagonal
                  }

              
                  let currentVariant = 'visible';
                  if (hoveredIndex === idx) currentVariant = 'hover';
                  else if (isNearby) currentVariant = 'nearby';

                  return (
                    <motion.div
  key={day.date}
  variants={cellVariants}
  initial="initial"
  animate="active"
  whileHover="hover"
  onMouseEnter={() => setHoveredIndex(idx)}
  onMouseLeave={() => setHoveredIndex(null)}
  className={`h-[11px] w-[11px] rounded-[3px] border cursor-crosshair shrink-0 gpu-layer will-change-transform ${getLevelColor(day.level)}`}
/>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-[95px] flex items-center justify-center text-xs text-zinc-500">
              Generating learning metrics..
            </div>
          )}

          {}
          <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest pt-2 px-1 select-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {}
      <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Modules Completed</span>
          <div className="text-white text-base font-bold flex items-center gap-1.5 mt-0.5">
            <CounterNumber value={164} />
            <span className="text-xs text-zinc-400">lessons completed</span>
          </div>
        </div>

        {}
        <div className="text-right h-8 flex flex-col justify-center">
          {hoveredDay ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold"
            >
              <span className="text-white font-bold">{hoveredDay.count} hrs</span>
              <span className="text-zinc-500 font-medium ml-1">on {new Date(hoveredDay.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
            </motion.div>
          ) : (
            <div className="text-[10px] font-bold text-zinc-500 tracking-wider flex items-center gap-1 justify-end select-none">
              <span>HOVER</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
