'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl =
    searchParams.get('redirect_url') || '/admin/dashboard';

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      afterSignInUrl={redirectUrl}
    />
  );
}
