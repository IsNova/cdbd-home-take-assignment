"use client";
import * as React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { leagueModalAtom } from "@/store";

export function EmptyCard() {
  const setOpen = useSetAtom(leagueModalAtom);
  return (
    <Card
      onClick={() => setOpen(true)}
      className="group hover:border-slate-400 cursor-pointer border-[1.5px] border-dashed border-slate-300 flex items-center justify-center bg-slate-50"
    >
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>
          <PlusIcon className="h-8 w-8 text-gray-300 group-hover:text-gray-600 " />
        </CardTitle>
        <CardDescription className="group-hover:text-gray-700 text-gray-400 font-medium">
          Add a new league
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
