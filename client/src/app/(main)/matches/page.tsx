import { Metadata } from "next";
import { MatchFormModal } from "./match-form-modal";
import { MatchesTable } from "./matches-table";
export const metadata: Metadata = {
  title: "Matches",
  description: "A list of football matches.",
};
export default function TasksPage() {
  return (
    <>
      <MatchesTable />
      <MatchFormModal />
    </>
  );
}
