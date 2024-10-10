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
    href: "/matches",
  },
  {
    name: "Properties",
    icon: LayoutDashboardIcon,
    href: "/teams",
  },
  {
    name: "Menus",
    icon: LayoutDashboardIcon,
    href: "/menus",
  },
  {
    name: "APIList",
    icon: LayoutDashboardIcon,
    href: "/menus",
  },
];

export const secondaryNavigation = [
  {
    name: "User and Group",
    icon: Folder,
    href: "/users",
  },
  {
    name: "Compitition",
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
