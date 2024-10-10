"use client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableFilter } from "@/components/data-table/data-table-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { tasks } from "./data";
import { columns } from "./matches.columns";
import { useSetAtom } from "jotai";
import { matchModalAtom } from "@/store";

export function MatchesTable() {
  const setOpen = useSetAtom(matchModalAtom);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => tasks, [tasks]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <DataTableFilter table={table} />
        </div>
        <div className="flex items-center gap-x-3">
          <DataTableViewOptions table={table} />
          <Button onClick={() => setOpen(true)}>
            <PlusIcon className="-ml-1 mr-1 h-4 w-4" /> Match
          </Button>
        </div>
      </div>
      <DataTable table={table} />
    </div>
  );
}
