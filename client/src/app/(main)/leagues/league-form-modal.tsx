"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeagueForm } from "./league-form";
import { useAtom } from "jotai";
import { leagueModalAtom } from "@/store";

export function LeagueFormModal() {
  const [open, setOpen] = useAtom(leagueModalAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add a new league</DialogTitle>
          <DialogDescription>
            Use this form to add a new sport league.
          </DialogDescription>
        </DialogHeader>
        <LeagueForm />
      </DialogContent>
    </Dialog>
  );
}
