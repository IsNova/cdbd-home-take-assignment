import { LeagueFormModal } from "./league-form-modal";
import { LeaguesList } from "./leagues-list";

export default function MatchesPage() {
  return (
    <>
      <LeaguesList />
      <LeagueFormModal />
    </>
  );
}
