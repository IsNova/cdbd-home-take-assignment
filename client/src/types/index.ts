import { FILTER_MODES } from "@/constants";

export type League = {
  id: string;
  name: string;
  description?: string;
  logo: string;
};

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  logo: string;
  league: League;
};

export type FilterColumnsValue<T> = {
  mode: FILTER_MODES;
  value?: T;
};

type MenuItem = {
  id: string;
  name: string;
  depth: number;
  active: boolean;
  isLastMenu: boolean;
  parentId: string | null;
};

export type MenuItemsArray = MenuItem[];
