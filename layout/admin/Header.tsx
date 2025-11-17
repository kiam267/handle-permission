'use client';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="w-full my-3">
      <div className="flex justify-end">
        <div className="border-2 rounded-full flex items-center justify-center p-1">
          <UserButton
            userProfileUrl={`/user-profile?redirect_url=${encodeURIComponent(
              pathname
            )}`}
          />
        </div>
      </div>
      {/* {children} */}
    </div>
  );
}
