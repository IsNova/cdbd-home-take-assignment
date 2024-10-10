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
export const useAddTeamMutation = () =>
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

export const useGetTeamsQuery = ({
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}: GetTeamsParams) => {
  const params = {
    filters: JSON.stringify(columnFilters),
    sorting: JSON.stringify(sorting),
    search: globalFilter,
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  };
  return useQuery({
    queryKey: ["teams", params],
    queryFn: async () => {
      const { data } = await axios.get<{
        rows: Team[];
        rowCount: number;
        pageCount: number;
      }>("teams", { params });
      return data;
    },
  });
};

export const useExportCSVTeamsQuery = ({
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}: GetTeamsParams) => {
  const params = {
    filters: JSON.stringify(columnFilters),
    sorting: JSON.stringify(sorting),
    search: globalFilter,
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  };
  return useQuery({
    queryKey: ["export-teams", params],
    queryFn: async () => {
      const { data } = await axios.get("teams/export/csv", {
        params,
        responseType: "blob",
      });
      const filename = `teams-data-${Date.now()}.csv`;
      download(data, filename);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useExportXLSXTeamsQuery = ({
  columnFilters,
  globalFilter,
  sorting,
  pagination,
}: GetTeamsParams) => {
  const params = {
    filters: JSON.stringify(columnFilters),
    sorting: JSON.stringify(sorting),
    search: globalFilter,
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  };
  return useQuery({
    queryKey: ["export-teams", params],
    queryFn: async () => {
      const { data } = await axios.get("teams/export/xlsx", {
        params,
        responseType: "blob",
      });
      const filename = `teams-data-${Date.now()}.xlsx`;
      download(data, filename);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

function download(data: any, filename: string) {
  const csvURL = window.URL.createObjectURL(data);
  const downloadLink = document.createElement("a");
  downloadLink.href = csvURL;
  downloadLink.setAttribute("download", filename);
  downloadLink.click();
}
