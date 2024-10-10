"use client";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { headers } from "@/configs/navigation";
import { BellIcon, MenuIcon } from "@heroicons/react/outline";

import ProfileMenu from "./profile-menu";
import Search from "./search";
import { SearchIcon } from "lucide-react";

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
        <h2 className="max-w-fit text-xl font-semibold tracking-tight">
          {header}
        </h2>
        <div className="flex flex-1 items-center justify-end gap-x-6 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />
          {/* Profile dropdown */}
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
