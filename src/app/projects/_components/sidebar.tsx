'use client';

import { getProjects } from "@/actions/project.actions";
import Logo from "@/components/global/logo";
import { navLinks } from "@/constants/menues";
import { cn } from "@/lib/utils";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { LogOut, StretchHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Links = {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

type Props = {
  children?: React.ReactNode;
  className?: string;
  links?: Links[];
}

const Sidebar = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  return (
    <nav
      className={cn('bg-white h-full w-[100px] fixed left-0 z-50 transition-all flex flex-col text-center py-5', className, open && 'w-[250px]')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Logo className="text-lg" />

      <div className="flex grow">
        {/* static icons nav section */}
        <div className="w-[100px] flex flex-col items-center justify-between">
          <span />
          <div className="flex flex-col h-[200px] justify-around">
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} className="hover:text-neutral-700">
                {link.icon}
              </Link>
            ))}
            <Link href={projects?.data?.length ? `/projects/${projects.data[0].id}` : '/tasks'} className="hover:text-neutral-700">
              <StretchHorizontal />
            </Link>
            <SignOutButton>
              <LogOut className="cursor-pointer hover:text-neutral-700" />
            </SignOutButton>
          </div>
          <div className={`h-[30px] ${open && 'self-end mr-3'}`}>
            <UserButton />
          </div>
        </div>

        {/* expandable labels nav section */}
        <div className={`flex flex-col justify-between transition-all overflow-hidden opacity-0 ${open ? 'w-[150px] opacity-100' : 'w-0'}`}>
          <span />

          <div className="flex flex-col items-start h-[200px] justify-around">
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} className="hover:text-neutral-700">
                {link.label}
              </Link>
            ))}
            <Link href={projects?.data?.length ? `/projects/${projects.data[0].id}` : '/tasks'} className="hover:text-neutral-700">
              <span className="hover:text-neutral-700 cursor-pointer">Tasks</span>
            </Link>
            <SignOutButton>
              <span className="hover:text-neutral-700 cursor-pointer">Logout</span>
            </SignOutButton>
          </div>

          <span className="truncate h-[30px] text-start">{user?.fullName}</span>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar;