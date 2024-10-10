import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/configs/axios";
import { queryClient } from "@/configs/query-client";
import { League, MenuItemsArray, Team } from "@/types";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import axiosInstance from "@/configs/axios";

type GetTeamsParams = {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  sorting: SortingState;
  pagination: PaginationState;
};
export const useAddMenuMutation = () =>
  useMutation((teamInput: any) => axios.post("menus", teamInput), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

export const useAddChildMenuMutation = () =>
  useMutation((teamInput) => axios.post("menus", teamInput), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });
export const useGetParentsQuery = () => {
  return useQuery({
    queryKey: ["parents"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MenuItemsArray>("menus/parents");
      return data;
    },
  });
};

export const useDeleteMenuMutation = () =>
  useMutation((menuId: string) => axiosInstance.delete(`menus/${menuId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tree"],
      });
    },
  });

export const useGetMenuTreeQuery = (parentId: string) => {
  return useQuery({
    queryKey: ["tree", parentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`menus/tree/${parentId}`);
      return data;
    },
  });
};
export const useGetMenuItemQuery = (menuId: string) => {
  return useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`menus/${menuId}`);
      return data;
    },
  });
};
