'use client';
import { usePathname } from 'next/navigation';

function Redirect() {
  const pathname = usePathname();
  return `/sign-in?redirect_url=${encodeURIComponent(
    pathname
  )}`;
}

export default Redirect;
