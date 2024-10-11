import {
  LayoutDashboardIcon,
  LockIcon,
  ScaleIcon,
  Users2Icon,
  Folder,
} from "lucide-react";

export const navigation = [
  {
    name: "System",
    icon: Folder,
    href: "/dashboard",
  },
  {
    name: "System Code",
    icon: LayoutDashboardIcon,
    href: "/test",
  },
  {
    name: "Properties",
    icon: LayoutDashboardIcon,
    href: "/test",
  },
  {
    name: "Menus",
    icon: LayoutDashboardIcon,
    href: "/menus",
  },
  {
    name: "APIList",
    icon: LayoutDashboardIcon,
    href: "/test",
  },
];

export const secondaryNavigation = [
  {
    name: "User and Group",
    icon: Folder,
    href: "/users",
  },
  {
    name: "Competition",
    icon: Folder,
    href: "/roles",
  },
];

export const headers = [...navigation, ...secondaryNavigation].reduce(
  (acc, nav) => {
    acc[nav.href] = nav.name;
    return acc;
  },
  {} as { [x: string]: string },
);
