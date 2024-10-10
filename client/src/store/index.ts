import { atom } from "jotai";

export const sidebarOpenAtom = atom(false);
export const collapseSidebarAtom = atom(false);

export const exportModalAtom = atom(false);
export const defaultValuesAtom = atom({
  menuId: "",
  depth: "",
  parent: "",
  name: "",
  parentId: "",
});
export const actionAtom = atom("create");
