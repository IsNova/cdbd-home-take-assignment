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
import { useState } from "react";
import { MenuItemsArray } from "@/types";
import { TeamForm } from "./team-form";

export default function TasksPage() {
  const { data: parents } = useGetParentsQuery();
  console.log("🚀 ~ TasksPage ~ parents:", parents);
  const [selectedMenuItem, setSelectedMenuItem] = useState(parents?.[0]?.id);
  const handleChange = (value: string) => {
    setSelectedMenuItem(value);
  };

  const { data: treeData } = useGetMenuTreeQuery(selectedMenuItem ?? "");
  console.log("🚀 ~ TasksPage ~ treeData:", treeData);
  return (
    <div>
      <div>
        <Select value={selectedMenuItem} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a menu" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Menus</SelectLabel>
              {/* <SelectItem value="apple">Apple</SelectItem> */}
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
        <TreeView data={[treeData] ?? []} />
      </div>
    </div>
  );
}
