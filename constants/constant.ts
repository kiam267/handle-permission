import {
  Calendar,
  DoorOpen,
  FileText,
  Search,
  Settings,
  ChartArea,
} from 'lucide-react';

export const APP_BAR_ITEMS = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartArea,
  },
  {
    title: 'Organization',
    url: '/organization',
    icon: DoorOpen,
  },
  {
    title: 'Posts',
    url: '/posts',
    icon: FileText,
  },
];
export const COLOR_OF_ROLES = [
  {
    id: 1,
    color: 'bg-yellow-500',
    role: 'user',
  },
  {
    id: 2,
    color: 'bg-green-500',
    role: 'admin',
  },
  {
    id: 3,
    color: 'bg-blue-500',
    role: 'moderator',
  },
];
