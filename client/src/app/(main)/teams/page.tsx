"use client";
import TreeView from "./menu-tree";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMenuTreeQuery, useGetParentsQuery } from "./teams-query";
import { useState, useMemo } from "react";

export default function TasksPage() {
  const { data: parents } = useGetParentsQuery();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const handleChange = (value: string) => {
    setSelectedMenuItem(value);
  };

  const { data: treeData } = useGetMenuTreeQuery(selectedMenuItem ?? "");
  const memoizedTreeData = useMemo(() => treeData ?? [], [treeData]);

  return (
    <div>
      <div>
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a menu" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Menus</SelectLabel>
              {parents?.map((parent) => (
                <SelectItem value={parent.id} key={parent.id}>
                  {parent.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="min-h-screen p-10">
        <TreeView data={[memoizedTreeData] ?? []} />
      </div>
    </div>
  );
}
