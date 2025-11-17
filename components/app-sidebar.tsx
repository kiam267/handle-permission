'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { APP_BAR_ITEMS } from '@/constants/constant';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname.includes(pathname));

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Blog Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {APP_BAR_ITEMS.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname.includes(item.url)
                        ? 'bg-slate-100 border border-slate-200'
                        : '',
                      'hover:bg-slate-100'
                    )}
                  >
                    <Link
                      href={item.url}
                      className="font-semibold"
                    >
                      <item.icon className="w-5 h-5 font-bold" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
