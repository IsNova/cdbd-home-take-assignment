"use client";

import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ColumnFilter, Table } from "@tanstack/react-table";

import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { DataTableSearchFilter } from "./data-table-search-filter";

type DataTableFilterProps<TData> = {
  table: Table<TData>;
};

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  const { columnFilters } = table.getState();
  const isFiltered = columnFilters.length > 0;
  const filterCount = columnFilters.length;
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const columnFilters: ColumnFilter[] = [];
    searchParams.forEach((value, key) => {
      const columnFilter = {
        id: key,
        value: key === "title" ? value : value.split("&"),
      };
      columnFilters.push(columnFilter);
    });
    table.setColumnFilters(() => {
      return columnFilters;
    });
  }, []);

  const queryParams = useMemo(
    () =>
      columnFilters.reduce(
        (acc, { id, value }) => {
          acc[id] =
            typeof value === "string" ? value : (value as string[]).join("&");
          return acc;
        },
        {} as { [x: string]: string },
      ),
    [columnFilters],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(queryParams);
    isFiltered
      ? router.replace(`${pathname}?${searchParams.toString()}`)
      : router.replace(pathname);
  }, [queryParams]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <FilterIcon className="mr-2 h-3.5 w-3.5" />
          Filters
          {isFiltered && (
            <span className="ml-1 h-4 w-4 rounded-sm bg-primary text-[10px] text-primary-foreground">
              {filterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-70 w-full" align="start">
        <div className="flex flex-1 items-center space-x-2">
          {table.getColumn("title") && (
            <DataTableSearchFilter
              placeholder="Filter title..."
              column={table.getColumn("title")}
              label=""
            />
          )}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
