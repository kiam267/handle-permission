import { headers } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Redirect from '@/lib/redirect';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: fix the route back issuse not fix yet
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return redirect(Redirect());
  }
  return children;
}
