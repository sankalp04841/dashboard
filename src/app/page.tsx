import { redirect } from 'next/navigation';

export default function HomePage() {
  // Gracefully redirect the root path directly to our futuristic dashboard
  redirect('/dashboard');
}
