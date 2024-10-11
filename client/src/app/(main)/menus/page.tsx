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
import { useGetMenuTreeQuery, useGetParentsQuery } from "./menu-query";
import { useState, useMemo, useEffect } from "react";
import { LayoutDashboard, Settings } from "lucide-react";

export default function TasksPage() {
  const { data: parents } = useGetParentsQuery();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const handleChange = (value: string) => {
    setSelectedMenuItem(value);
  };

  useEffect(() => {
    if (parents && parents.length > 0 && !selectedMenuItem) {
      setSelectedMenuItem(parents[0].id); // Set the first parent's id as default
    }
  }, [parents, selectedMenuItem]);

  const { data: treeData } = useGetMenuTreeQuery(selectedMenuItem ?? "");
  const memoizedTreeData = useMemo(() => treeData ?? [], [treeData]);

  return (
    <div>
      <div className="mb-4 flex w-24 items-center justify-between space-x-4">
        <div className="flex items-center  justify-center rounded-full bg-blue-500 p-2">
          <LayoutDashboard fill="white" strokeWidth={0} className="h-6 w-6" />
        </div>
        <p className="text-3xl font-extrabold">Menus</p>
      </div>
      <div>
        <div className="py-1 text-[0.8rem] text-muted-foreground">Menu</div>
        <Select onValueChange={handleChange} value={selectedMenuItem}>
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
      <div className="min-h-screen pt-8">
        <TreeView data={[memoizedTreeData]} parents={parents} />
      </div>
    </div>
  );
}
