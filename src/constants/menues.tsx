import { LayoutDashboard, LogOut, StretchHorizontal } from "lucide-react";

export const navLinks = [
  {
    label: 'Projects',
    href: '/projects',
    icon: <LayoutDashboard />
  },
  {
    label: 'Tasks',
    href: '/projects/tasks',
    icon: <StretchHorizontal />
  },
  {
    label: 'Logout',
    href: '/logout',
    icon: <LogOut />
  }
]