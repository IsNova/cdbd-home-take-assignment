import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { League } from "@/types";
import { MoreActions } from "@/components/more-actions";

type LeagueCardProps = {
  league: League;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="">
        <div className="flex justify-between">
          <Image
            src={`${API_URL}/${league.logo.replace("\\", "/")}`}
            alt={league.name}
            width={280}
            height={200}
            className="mb-2 h-auto w-8"
          />
          <MoreActions />
        </div>

        <CardTitle>{league.name}</CardTitle>
        <CardDescription>{league.description}</CardDescription>
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="flex items-center">
          <Link
            href="/teams"
            className="text-sm text-indigo-500 hover:text-indigo-800"
          >
            Teams
          </Link>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <Link
            href="/matches"
            className="text-sm text-indigo-500 hover:text-indigo-800"
          >
            Matches
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
