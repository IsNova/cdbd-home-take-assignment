import React from "react";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { FILTER_MODES } from "@/constants";
import { FilterColumnsValue } from "@/types";

type DataTableSearchFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  label: string;
  placeholder?: string;
};
export function DataTableSearchFilter<TData, TValue>({
  placeholder,
  label,
  column,
}: DataTableSearchFilterProps<TData, TValue>) {
  const value =
    (column?.getFilterValue() as FilterColumnsValue<string>)?.value ?? "";

  return (
    <div className="grid space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          column?.setFilterValue({
            value: event.target.value,
            mode: FILTER_MODES.CONTAINS,
          })
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </div>
  );
}
