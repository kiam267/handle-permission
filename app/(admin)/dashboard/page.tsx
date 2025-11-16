'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push(
        `/sign-in?redirect_url=${encodeURIComponent(
          pathname
        )}`
      );
    }
  }, [isLoaded, userId, router, pathname]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return <div>{/* Your dashboard content */}</div>;
}
