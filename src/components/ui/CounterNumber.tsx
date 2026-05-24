'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface CounterNumberProps {
  value: number;
  suffix?: string;
}

export default function CounterNumber({ value, suffix = '' }: CounterNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1], 
      onUpdate(latest) {
        element.textContent = Math.round(latest).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [value]);

  return (
    <span className="tabular-nums font-bold tracking-tight">
      <span ref={elementRef}>0</span>
      {suffix}
    </span>
  );
}
