import Fallback from '@/features/(admin)/components/Fallback';
import { auth } from '@clerk/nextjs/server';


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated)
    return <Fallback>{children}</Fallback>;
  return children;
}
