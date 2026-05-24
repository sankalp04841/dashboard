'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, GraduationCap } from 'lucide-react';
import Sidebar from './sidebar/Sidebar';
import HeroTile from './hero/HeroTile';
import ActivityTile from './activity/ActivityTile';
import CourseTile from './course/CourseTile';
import { BentoGrid, BentoItem } from './ui/BentoGrid';
import ParticleField from './ui/ParticleField';
import GrainOverlay from './ui/GrainOverlay';
import { Course } from '@/types';

interface DashboardContainerProps {
  courses: Course[];
}

export default function DashboardContainer({ courses }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  const tabVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      y: 10 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring' as const,
        stiffness: 300,
        damping: 20
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      y: -10,
      transition: { 
        duration: 0.15,
        ease: 'easeIn' as const
      } 
    },
  } as const;

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-zinc-950 text-white overflow-x-hidden font-sans">
      {}
      <ParticleField isIdle={isIdle} />
      <GrainOverlay />

      {}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {}
      <main className="flex-grow p-6 md:p-10 pb-24 md:pb-10 z-10 overflow-y-auto no-scrollbar max-w-[1600px] mx-auto w-full">
        {}
        <header className="flex justify-between items-center mb-8 border-b border-white/[0.04] pb-6 select-none">
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">System Status</span>
            <div className="flex items-center gap-2">
              <span className={isIdle ? "h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" : "h-2 w-2 rounded-full bg-emerald-500 animate-pulse"} />
              <span className="text-sm font-semibold text-zinc-200">
                {isIdle ? "System Idle - Ambient Mode Active" : "Supabase Connected & Synced"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.05] rounded-xl px-3.5 py-2.5 text-xs text-zinc-500 transition-colors duration-150 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span>Search modules...</span>
              <span className="ml-4 font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-[10px] border border-white/[0.04]">⌘K</span>
            </motion.div>

            {}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05] bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </motion.button>

            {}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-[1px] shadow-lg shadow-indigo-500/10 shrink-0 cursor-pointer"
            >
              <div className="h-full w-full rounded-xl bg-zinc-950 flex items-center justify-center text-xs font-bold text-indigo-300">
                SK
              </div>
            </motion.div>
          </div>
        </header>

        {}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <BentoGrid>
                {}
                <BentoItem className="lg:col-span-2 md:col-span-2 col-span-1">
                  <HeroTile isIdle={isIdle} />
                </BentoItem>

                {}
                <BentoItem className="col-span-1">
                  <ActivityTile />
                </BentoItem>

                {}
                {courses.map((course) => (
                  <BentoItem key={course.id} className="col-span-1">
                    <CourseTile course={course} />
                  </BentoItem>
                ))}
              </BentoGrid>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6 max-w-5xl"
            >
              <div className="glass-panel p-8 rounded-2xl border-white/[0.08] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Academic Curriculum</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Browse your enrolled courses, view upcoming homework assignments, and examine completed course modules.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {courses.map((course) => (
                    <CourseTile key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6 max-w-4xl"
            >
              <div className="glass-panel p-8 rounded-2xl border-white/[0.08] space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Performance Analysis</h2>
                  <p className="text-sm text-zinc-400 mt-1">Detailed evaluation of learning stats</p>
                </div>
                <ActivityTile />
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6 max-w-2xl"
            >
              <div className="glass-panel p-8 rounded-2xl border-white/[0.08] space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-white">Console Configurations</h2>
                <div className="space-y-4 text-sm text-zinc-400">
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.04]">
                    <div>
                      <p className="font-semibold text-white">Ambient Glow Engine</p>
                      <p className="text-xs text-zinc-500">Enable cursor tracking lighting projections.</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">HARDWARE ENABLED</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.04]">
                    <div>
                      <p className="font-semibold text-white">System Mode</p>
                      <p className="text-xs text-zinc-500">Locked dark visual workspace settings.</p>
                    </div>
                    <span className="text-xs font-semibold text-zinc-400">DARK MODE ONLY</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-semibold text-white">Supabase Endpoint</p>
                      <p className="text-xs text-zinc-500">Remote real-time synchronization link.</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{process.env.NEXT_PUBLIC_SUPABASE_URL ? 'CONFIGURED' : 'MOCK FALLBACK'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
