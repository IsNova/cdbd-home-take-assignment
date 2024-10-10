import {
  LayoutDashboardIcon,
  LockIcon,
  ScaleIcon,
  Users2Icon,
} from "lucide-react";

export const navigation = [
  {
    name: "System",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
  },
  {
    name: "System Code",
    icon: ScaleIcon,
    href: "/matches",
  },
  {
    name: "Properties",
    icon: Users2Icon,
    href: "/teams",
  },
  {
    name: "Menus",
    icon: Users2Icon,
    href: "/menus",
  },
  {
    name: "APIList",
    icon: Users2Icon,
    href: "/menus",
  },
];

export const secondaryNavigation = [
  {
    name: "User and Group",
    icon: Users2Icon,
    href: "/users",
  },
  {
    name: "Compitition",
    icon: LockIcon,
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
