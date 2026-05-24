'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, BarChart3, Settings, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  } as const;

  const iconVariants = {
    initial: { scale: 1, filter: 'drop-shadow(0 0 0px rgba(129, 140, 248, 0))' },
    hover: {
      scale: [1, 1.15, 1],
      filter: 'drop-shadow(0 0 4px rgba(129, 140, 248, 0.4))',
      transition: { duration: 0.35, ease: 'easeInOut' }
    }
  };


  const hoverBgVariants = {
    initial: { opacity: 0, scale: 0.96 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <>
      {}
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl h-screen sticky top-0 transition-all duration-300 z-30 select-none shrink-0',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 shrink-0 cursor-pointer"
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </motion.div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              >
                Pulse Academy
              </motion.span>
            )}
          </div>
        </div>

        {}
        <nav className="flex-grow space-y-1.5 px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                initial="initial"
                whileHover="hover"
                className={cn(
                  'relative flex items-center w-full rounded-xl py-3 px-4 text-sm font-medium text-zinc-400 transition-colors duration-200 focus:outline-none select-none cursor-pointer',
                  isCollapsed ? 'justify-center' : 'justify-start gap-4',
                  isActive ? 'text-white' : 'hover:text-zinc-200'
                )}
              >
                {}
                {isActive && (
                  <>
                    {}
                    <motion.div
                      layoutId="activeNavPillGlow"
                      className="absolute inset-0 bg-indigo-500/10 blur-[8px] rounded-xl z-0 pointer-events-none"
                      transition={springConfig}
                    />
                    {}
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/[0.06] border border-white/[0.04] rounded-xl z-0"
                      transition={springConfig}
                    />
                  </>
                )}

                {}
                {!isActive && (
                  <motion.div
                    variants={hoverBgVariants}
                    className="absolute inset-0 bg-white/[0.02] border border-white/[0.02] rounded-xl z-0"
                  />
                )}

                {}
                <motion.div variants={iconVariants} className="z-10 shrink-0">
                  <Icon className={cn('h-5 w-5', isActive ? 'text-indigo-400' : 'text-zinc-400')} />
                </motion.div>

                {!isCollapsed && (
                  <span className="z-10 tracking-wide font-medium">{item.label}</span>
                )}

                {}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.08] text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                    {item.label}
                  </div>
                )}
              </motion.button>
            );
          })}
        </nav>

        {}
        <div className="p-4 border-t border-white/[0.04] flex justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="h-4.5 w-4.5" /> : <ChevronLeft className="h-4.5 w-4.5" />}
          </button>
        </div>
      </aside>

      {}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-t border-white/[0.06] flex items-center justify-around px-4 z-40 select-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              initial="initial"
              whileHover="hover"
              className={cn(
                'relative flex flex-col items-center justify-center w-14 h-12 rounded-xl text-zinc-400 focus:outline-none select-none cursor-pointer',
                isActive ? 'text-white' : 'hover:text-zinc-200'
              )}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="activeNavPillMobileGlow"
                    className="absolute inset-0 bg-indigo-500/8 blur-[6px] rounded-xl z-0 pointer-events-none"
                    transition={springConfig}
                  />
                  <motion.div
                    layoutId="activeNavPillMobile"
                    className="absolute inset-0 bg-white/[0.06] border border-white/[0.04] rounded-xl z-0"
                    transition={springConfig}
                  />
                </>
              )}

              <motion.div variants={iconVariants} className="z-10 shrink-0">
                <Icon className={cn('h-5 w-5', isActive ? 'text-indigo-400' : 'text-zinc-400')} />
              </motion.div>
              <span className="text-[10px] font-semibold mt-0.5 z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </>
  );
}
