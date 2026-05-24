import { createClient } from '@supabase/supabase-js';
import { Course } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseServer = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const mockCourses: Course[] = [
  {
    id: '1-react',
    title: 'Advanced React Patterns',
    progress: 72,
    icon_name: 'Layers',
    created_at: new Date().toISOString(),
  },
  {
    id: '2-sys',
    title: 'System Design Fundamentals',
    progress: 45,
    icon_name: 'Network',
    created_at: new Date().toISOString(),
  },
  {
    id: '3-ml',
    title: 'Machine Learning Basics',
    progress: 88,
    icon_name: 'Brain',
    created_at: new Date().toISOString(),
  },
  {
    id: '4-dsa',
    title: 'DSA Masterclass',
    progress: 31,
    icon_name: 'Code2',
    created_at: new Date().toISOString(),
  },
];

export async function getCourses(): Promise<Course[]> {

  if (!supabaseServer) {

    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockCourses;
  }

  try {
    const { data, error } = await supabaseServer
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error, falling back to mock courses:', error);
      // Fallback on database error too to be resilient
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return mockCourses;
    }

    if (!data || data.length === 0) {
      return mockCourses;
    }

    return data as Course[];
  } catch (err) {
    console.error('Failed to fetch from Supabase, returning fallback mock data:', err);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockCourses;
  }
}
