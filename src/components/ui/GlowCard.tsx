'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  magnetic?: boolean;
  interactive?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor,
  magnetic = false,
  interactive = true,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);


  const springConfig = { stiffness: 300, damping: 20 };
  const magneticX = useSpring(useMotionValue(0), springConfig);
  const magneticY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });

    if (magnetic) {
     
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const pullX = (x - centerX) * 0.04;
      const pullY = (y - centerY) * 0.04;
      
      const clampedX = Math.max(-5, Math.min(5, pullX));
      const clampedY = Math.max(-5, Math.min(5, pullY));
      
      magneticX.set(clampedX);
      magneticY.set(clampedY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (magnetic) {
      magneticX.set(0);
      magneticY.set(0);
    }
  };

  const cardStyle: React.CSSProperties = {
    ['--mouse-x' as string]: `${coords.x}px`,
    ['--mouse-y' as string]: `${coords.y}px`,
  };

  const cardVariants = {
    initial: {
      scale: 1,
      y: 0,
      filter: 'brightness(1)',
      borderColor: 'rgba(255, 255, 255, 0.06)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    },
    hover: {
      scale: 1.02,
      y: -3,
      filter: 'brightness(1.04)',
      borderColor: 'rgba(139, 92, 246, 0.25)', // purple glow border
      boxShadow: '0 12px 30px rgba(139, 92, 246, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: magneticX,
        y: magneticY,
        ...cardStyle,
      }}
      variants={interactive ? cardVariants : undefined}
      initial="initial"
      whileHover={interactive ? "hover" : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-zinc-950/70 backdrop-blur-md',
        'transition-colors duration-300 gpu-layer will-change-transform',
        className
      )}
      {...props}
    >
      {}
      {isHovered && interactive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0 gpu-layer"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.08) 40%, rgba(6, 182, 212, 0.03) 70%, transparent 100%)`,
          }}
        />
      )}

      {}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 z-1 border border-transparent",
          isHovered && interactive ? "border-indigo-500/10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05),transparent_60%)]" : ""
        )}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
