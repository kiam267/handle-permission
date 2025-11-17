import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Callback from '@/features/(admin)/callback/Callback';
import Header from '@/layout/admin/Header';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated)
    return <Callback>{children}</Callback>;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-full p-5">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
