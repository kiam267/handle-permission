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
