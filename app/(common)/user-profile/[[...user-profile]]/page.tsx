'use client';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@clerk/nextjs';
import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function UserProfilePage() {
  const sp = useSearchParams();
  const redirectUrl = sp
    .get('redirect_url')
    ?.replace('/', '') as string;
  const formattedUrl =
    redirectUrl?.charAt(0).toUpperCase() +
    redirectUrl?.slice(1);
  return (
    <div className="p-4">
      <Button
        variant="outline"
        className="cursor-pointer group"
        asChild
      >
        <Link href={`${redirectUrl}`}>
          <MoveLeftIcon
            className="h-5 w-5 ease-in-out 
          transition-transform duration-300 group-hover:-translate-x-2"
          />
          <span>{formattedUrl}</span>
        </Link>
      </Button>
      <div className="h-screen w-full flex justify-center items-center flex-col">
        <UserProfile />
      </div>
    </div>
  );
}
