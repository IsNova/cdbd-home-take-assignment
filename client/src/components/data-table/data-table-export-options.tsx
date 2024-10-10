"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DownloadIcon, FileIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

const exportOptions = [
  {
    label: "Export as CSV",
    icon: FileIcon,
  },
  {
    label: "Export as Excel",
    icon: FileIcon,
  },
];

interface DataTableExportOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableExportOptions<TData>({
  table,
}: DataTableExportOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <DownloadIcon className="mr-2 h-3.5 w-3.5" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuLabel>Export options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {exportOptions.map((option) => {
          return (
            <DropdownMenuCheckboxItem
              key={option.label}
              className="capitalize"
              checked={true}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
