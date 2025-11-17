'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Fallback({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.replace(
      `/sign-in?redirect_url=${encodeURIComponent(
        pathname
      )}`
    );
  }, []);
  return children;
}

export default Fallback;
