import { Button } from '@/components/ui/button';
import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto pt-5 h-screen">
      <div className="flex items-center w-full justify-center flex-row h-full ">
        <div className="block ">
          <div className="my-5">
            <Button
              variant="outline"
              className="cursor-pointer group"
              asChild
            >
              <Link href="/">
                <MoveLeftIcon
                  className="h-5 w-5 ease-in-out 
          transition-transform duration-300 group-hover:-translate-x-2"
                />
                <span>Home</span>
              </Link>
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
