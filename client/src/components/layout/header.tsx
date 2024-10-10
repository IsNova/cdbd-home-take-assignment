"use client";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { headers } from "@/configs/navigation";
import { BellIcon, MenuIcon } from "@heroicons/react/outline";

import ProfileMenu from "./profile-menu";
import Search from "./search";
import { Folder, FolderClosed, SearchIcon } from "lucide-react";

type HeaderProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type HeaderKey = keyof typeof headers;

export function Header({ setOpen }: HeaderProps) {
  const pathname = usePathname();

  const key = "/" + pathname.split("/")?.[1];
  const header = headers[key as HeaderKey];
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
      <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        <h2 className="flex max-w-fit space-x-3 text-xl font-semibold tracking-tight">
          <div>
            <FolderClosed className="h-4 w-4" />
          </div>
          <p className="text-sm "> / {header}</p>
        </h2>
        <div className="flex flex-1 items-center justify-end gap-x-6 lg:gap-x-6"></div>
      </div>
    </div>
  );
}
