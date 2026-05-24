import React from 'react';
import { getCourses } from '@/lib/supabase/server';
import DashboardContainer from '@/components/DashboardContainer';

export const metadata = {
  title: 'Dashboard | Example ',
  description: 'blah blah blah',
};

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardContainer courses={courses} />
    </div>
  );
}

