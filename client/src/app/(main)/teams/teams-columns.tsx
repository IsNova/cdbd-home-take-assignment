"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";

import { Team } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { TeamsTableRowActions } from "./teams-table-row-actions";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-auto rounded-md">
            <AvatarImage
              src={`${API_URL}/${row.original.logo}`}
              alt="team logo"
            />
            <AvatarFallback>{row.original.abbreviation}</AvatarFallback>
          </Avatar>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "league.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="League" />
    ),
    cell: (info) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{info.getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: (info) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{info.getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "abbreviation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abbreviation" />
    ),
    cell: (info) => {
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="rounded-md">
            <AvatarFallback>{info.getValue() as string}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (info) => {
      const isActive = info.getValue() as boolean;

      return (
        <div className="flex w-[100px] items-center">
          {isActive ? (
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
              <svg
                className="h-1.5 w-1.5 fill-green-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
              <svg
                className="h-1.5 w-1.5 fill-gray-400"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Inactive
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: (info) => {
      return (
        <div className="flex items-center space-x-2">
          {format(new Date(info.getValue() as string), "P")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TeamsTableRowActions row={row} />,
  },
];
