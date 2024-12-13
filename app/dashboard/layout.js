import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <SessionProvider>{children}</SessionProvider>;
}
