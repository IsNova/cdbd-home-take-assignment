'use client';
import { useState } from 'react';

import { Content, Sidebar } from '@/components/layout';
import { Header } from '@/components/layout/header';
import { useAtomValue } from 'jotai';
import { collapseSidebarAtom } from '@/store';
import { cn } from '@/lib/utils';

type MainLayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  const isCollapsed = useAtomValue(collapseSidebarAtom);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={cn(isCollapsed ? 'lg:pl-[68px]' : 'lg:pl-64')}>
        <Header setOpen={setOpen} />
        <Content>{children}</Content>
      </div>
    </>
  );
}
