"use client";

import { FilterIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { columns } from "./teams-columns";
import { useSetAtom } from "jotai";
import { exportModalAtom, teamModalAtom } from "@/store";
import {
  useExportCSVTeamsQuery,
  useExportXLSXTeamsQuery,
  useGetTeamsQuery,
} from "./teams-query";
import { TeamsTableFilter } from "./teams-table-filter";
import { DebouncedInput } from "@/components/debounced-input";
import { DownloadIcon } from "@radix-ui/react-icons";
import { DataTableExportOptions } from "@/components/data-table/data-table-export-options";

export function TeamsTable() {
  const setOpen = useSetAtom(teamModalAtom);
  const setOpenExport = useSetAtom(exportModalAtom);
  const [visibility, setVisiblity] = useState(false);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const paginationOptions = {
    pageIndex,
    pageSize,
  };

  const queryOptions = {
    columnFilters,
    globalFilter,
    sorting,
    pagination: paginationOptions,
  };

  const { data: dataQuery } = useGetTeamsQuery(queryOptions);
  const { refetch: exportCSV } = useExportCSVTeamsQuery(queryOptions);
  const { refetch: exportXLSX } = useExportXLSXTeamsQuery(queryOptions);

  const table = useReactTable({
    data: dataQuery?.rows ?? [],
    columns,
    pageCount: dataQuery?.pageCount ?? -1,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    manualFiltering: true,
    enableGlobalFilter: false,
    manualSorting: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const isFiltered = columnFilters.length > 0;
  const filterCount = columnFilters.length;

  const toggleFilterVisibility = () => {
    setVisiblity((visibility) => !visibility);
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={toggleFilterVisibility}
            >
              <FilterIcon className="mr-2 h-3.5 w-3.5" />
              Filters
              {isFiltered && (
                <span className="ml-1 h-4 w-4 rounded-sm bg-primary text-[10px] text-primary-foreground">
                  {filterCount}
                </span>
              )}
            </Button>
          </div>
          <div className="flex items-center gap-x-3">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="text h-8 shadow-sm"
              placeholder="Search all columns..."
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={() => exportXLSX()}
            >
              <DownloadIcon className="mr-2 h-3.5 w-3.5" />
              Export
            </Button>
            <DataTableViewOptions table={table} />
            <Button onClick={() => setOpen(true)}>
              <PlusIcon className="-ml-1 mr-1 h-4 w-4" strokeWidth={2.5} /> Team
            </Button>
          </div>
        </div>
        <TeamsTableFilter table={table} isVisible={visibility} />
      </div>
      <DataTable table={table} />
    </div>
  );
}
