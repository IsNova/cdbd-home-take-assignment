"use client";

import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTableSearchFilter } from "@/components/data-table/data-table-search-filter";
import { DataTableSelectFilter } from "@/components/data-table/data-table-select-filter";
import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { cn } from "@/lib/utils";

type DataTableFilterProps<Team> = {
  table: Table<Team>;
  isVisible: boolean;
};

const statuses = [
  {
    label: "Active",
    value: true,
  },
  {
    label: "Inactive",
    value: false,
  },
] as any;

export function TeamsTableFilter<Team>({
  table,
  isVisible = false,
}: DataTableFilterProps<Team>) {
  const { columnFilters } = table.getState();
  const isFiltered = columnFilters.length > 0;
  const filterCount = columnFilters.length;
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const columnFilters: ColumnFilter[] = [];
  //   searchParams.forEach((value, key) => {
  //     const columnFilter = {
  //       id: key,
  //       value: key === "name" ? value : value.split("&"),
  //     };
  //     columnFilters.push(columnFilter);
  //   });
  //   table.setColumnFilters(() => {
  //     return columnFilters;
  //   });
  // }, []);

  // const queryParams = useMemo(
  //   () =>
  //     columnFilters.reduce(
  //       (acc, { id, value }) => {
  //         acc[id] =
  //           typeof value === "string" ? value : (value as string[]).join("&");
  //         return acc;
  //       },
  //       {} as { [x: string]: string },
  //     ),
  //   [columnFilters],
  // );

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(queryParams);
  //   isFiltered
  //     ? router.replace(`${pathname}?${searchParams.toString()}`)
  //     : router.replace(pathname);
  // }, [queryParams]);

  return (
    <div
      className={cn(
        "mb-1 flex w-full flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm",
        isVisible ? "flex" : "hidden",
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-4">
        {table.getColumn("name") && (
          <DataTableSearchFilter
            placeholder="Search name..."
            label="Name"
            column={table.getColumn("name")}
          />
        )}

        {table.getColumn("city") && (
          <DataTableSearchFilter
            label="City"
            placeholder="Search city..."
            column={table.getColumn("city")}
          />
        )}
        {table.getColumn("league_name") && (
          <DataTableSearchFilter
            label="League"
            placeholder="Search league..."
            column={table.getColumn("league_name")}
          />
        )}

        {table.getColumn("abbreviation") && (
          <DataTableSearchFilter
            label="Abbreviation"
            placeholder="Search abbreviation..."
            column={table.getColumn("abbreviation")}
          />
        )}

        {table.getColumn("isActive") && (
          <DataTableSelectFilter
            label="Status"
            placeholder="Select status"
            column={table.getColumn("isActive")}
            options={statuses}
          />
        )}
        {table.getColumn("createdAt") && (
          <DataTableDateFilter
            label="Created At"
            placeholder="Select date"
            column={table.getColumn("createdAt")}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 self-end px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
