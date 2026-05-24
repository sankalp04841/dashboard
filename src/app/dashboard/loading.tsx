import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Sidebar Skeleton (hidden on mobile, matches desktop dimensions) */}
      <aside className="hidden md:flex flex-col border-r border-white/[0.06] bg-zinc-950/40 w-64 h-screen sticky top-0 shrink-0 p-6 space-y-8 select-none">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-zinc-900 animate-pulse shrink-0" />
          <div className="h-4 w-32 rounded bg-zinc-900 animate-pulse" />
        </div>
        <div className="flex-grow space-y-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-11 w-full rounded-xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-full rounded-lg bg-zinc-900 animate-pulse" />
      </aside>

      {/* Main Content Area Skeleton */}
      <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 space-y-8 overflow-y-auto no-scrollbar">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center select-none">
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-zinc-900 animate-pulse" />
            <div className="h-8 w-48 rounded bg-zinc-900 animate-pulse" />
          </div>
          <div className="h-10 w-10 rounded-full bg-zinc-900 animate-pulse" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {/* Hero Tile Skeleton (occupies 2 columns on desktop) */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.05] bg-zinc-950/70 p-8 h-[240px] flex flex-col justify-between select-none">
            <div className="space-y-3">
              <div className="h-4 w-32 rounded bg-zinc-900 animate-pulse" />
              <div className="h-8 w-80 rounded bg-zinc-900 animate-pulse" />
              <div className="h-4 w-96 rounded bg-zinc-900 animate-pulse" />
            </div>
            <div className="flex items-center gap-4 border-t border-white/[0.04] pt-6">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 animate-pulse shrink-0" />
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-zinc-900 animate-pulse" />
                <div className="h-3.5 w-24 rounded bg-zinc-900 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Activity Heatmap Skeleton */}
          <div className="rounded-2xl border border-white/[0.05] bg-zinc-950/70 p-6 h-full min-h-[240px] flex flex-col justify-between select-none">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-zinc-900 animate-pulse" />
                  <div className="h-5 w-36 rounded bg-zinc-900 animate-pulse" />
                </div>
                <div className="h-7 w-28 rounded bg-zinc-900 animate-pulse" />
              </div>
              <div className="h-[90px] w-full rounded bg-zinc-900 animate-pulse" />
            </div>
            <div className="border-t border-white/[0.04] pt-4 flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-zinc-900 animate-pulse" />
                <div className="h-5 w-24 rounded bg-zinc-900 animate-pulse" />
              </div>
              <div className="h-4 w-20 rounded bg-zinc-900 animate-pulse" />
            </div>
          </div>

          {/* 4 Course Tiles Skeletons */}
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.05] bg-zinc-950/70 p-6 min-h-[220px] flex flex-col justify-between select-none"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 rounded-xl bg-zinc-900 animate-pulse" />
                  <div className="h-4 w-20 rounded bg-zinc-900 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-48 rounded bg-zinc-900 animate-pulse" />
                  <div className="h-3 w-16 rounded bg-zinc-900 animate-pulse" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 w-20 rounded bg-zinc-900 animate-pulse" />
                  <div className="h-4 w-8 rounded bg-zinc-900 animate-pulse" />
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-900 animate-pulse" />
                <div className="flex justify-between pt-1">
                  <div className="h-4 w-24 rounded bg-zinc-900 animate-pulse" />
                  <div className="h-3 w-12 rounded bg-zinc-900 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
