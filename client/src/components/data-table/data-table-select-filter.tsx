import React, { useEffect } from "react";
import { Column } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_MODES } from "@/constants";
import { FilterColumnsValue } from "@/types";

type DataTableSelectFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  label: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};
export function DataTableSelectFilter<TData, TValue>({
  placeholder,
  label,
  column,
  options,
}: DataTableSelectFilterProps<TData, TValue>) {
  const value =
    (column?.getFilterValue() as FilterColumnsValue<string>)?.value ?? "";
  return (
    <div className="grid space-y-2">
      <Label>{label}</Label>
      <Select
        value={value}
        onValueChange={(value) => {
          column?.setFilterValue({
            value,
            mode: FILTER_MODES.EQUALS,
          });
        }}
      >
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
