"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { navigation, secondaryNavigation } from "@/configs/navigation";
import { cn } from "@/lib/utils";
import { useAtom, useAtomValue } from "jotai";
import { collapseSidebarAtom } from "@/store";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export function SidebarDesktop() {
  const [isCollapsed, setIsCollapsed] = useAtom(collapseSidebarAtom);
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "group relative hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
        isCollapsed ? "md:w-[68px]" : "md:w-64",
      )}
    >
      {/* Collapse button */}
      <button
        className="absolute right-4 top-4 hidden rounded-full  bg-primary p-1 group-hover:block"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-[18px] w-[18px] text-white" />
        ) : (
          <ChevronLeftIcon className="h-[18px] w-[18px] text-white" />
        )}
      </button>
      <div
        className={cn(
          "flex grow flex-col gap-y-4 overflow-y-auto rounded-2xl border-r border-gray-200 bg-black pb-4",
          isCollapsed ? "items-center px-4" : "px-6",
        )}
      >
        <div className="flex h-16 w-full items-center">
          {isCollapsed ? (
            <Image
              src="/image.png"
              alt="logo"
              width={120}
              height={120}
              className="h-8 w-auto"
            />
          ) : (
            <Image
              src="/image.png"
              alt="logo"
              width={1200}
              height={1200}
              className="h-8 w-auto"
            />
          )}
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-6 ">
            <li>
              <ul
                role="list"
                className="-mx-2 space-y-1 rounded-md bg-gray-800 py-4"
              >
                {navigation.map((item) => {
                  const isCurrent = pathname.startsWith(item.href);
                  return (
                    <li key={item.name} className="group/item relative">
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          buttonVariants({
                            variant: isCurrent ? "secondary" : "ghost",
                            size: isCollapsed ? "icon" : "default",
                          }),
                          isCollapsed ? "pl-2" : "w-full justify-start",
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary hover:text-primary-foreground",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "text-gray-5s00 mr-2 h-4 w-4",
                            isCurrent
                              ? "text-primary-foreground"
                              : "text-gray-300 group-hover/item:text-primary-foreground",
                          )}
                        />
                        <p className="text-gray-400">
                          {!isCollapsed && item.name}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              {/* {!isCollapsed && (
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Adminstration
                </div>
              )} */}
              <ul role="list" className="-mx-2 mb-4 mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        buttonVariants({
                          variant: pathname.startsWith(item.href)
                            ? "secondary"
                            : "ghost",
                          size: isCollapsed ? "icon" : "default",
                        }),
                        isCollapsed ? "pl-2" : "w-full justify-start",
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4 text-gray-300" />
                      <p className="text-gray-400">
                        {!isCollapsed && item.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
