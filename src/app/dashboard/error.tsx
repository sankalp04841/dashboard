'use client';

import React, { useEffect } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Dashboard error occurred:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white font-sans px-6 select-none">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.06),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="max-w-md w-full glass-panel-glow border-red-500/20 p-8 rounded-2xl text-center space-y-6 relative z-10"
      >
        {/* Animated Warning Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-2 bg-red-500/20 rounded-full blur-md"
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-lg">
              <AlertOctagon className="h-7 w-7 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Connection Interrupted
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We encountered an issue connecting to the database server. Check your internet connection or Supabase configurations.
          </p>
        </div>

        {/* Diagnostic Code */}
        {error.digest && (
          <div className="bg-black/40 border border-white/[0.04] rounded-lg p-2.5 text-[10px] font-mono text-zinc-500 select-all">
            DIGEST_ID: {error.digest}
          </div>
        )}

        {/* Retry Button */}
        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white transition-all duration-200 shadow-lg shadow-red-500/10 cursor-pointer focus:outline-none"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            <span>Re-establish Connection</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
