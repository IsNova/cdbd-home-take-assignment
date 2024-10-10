"use client";
import { EmptyCard } from "./empty-card";
import { LeagueCard } from "./league-card";
import { useGetLeaguesQuery } from "./leagues.query";

export function LeaguesList() {
  const { data: leagues } = useGetLeaguesQuery();
  return (
    <div className="grid grid-cols-3 gap-4">
      <EmptyCard />
      {leagues?.map((league) => (
        <LeagueCard league={league} key={league.name} />
      ))}
    </div>
  );
}
