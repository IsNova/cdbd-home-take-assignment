import React, { Dispatch, SetStateAction } from 'react';

import { SidebarDesktop } from './sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile';

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      <SidebarDesktop />
      <SidebarMobile open={open} setOpen={setOpen} />
    </>
  );
}
