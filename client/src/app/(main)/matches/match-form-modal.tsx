"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MatchForm } from "./match-form";
import { useAtom } from "jotai";
import { matchModalAtom } from "@/store";

export function MatchFormModal() {
  const [open, setOpen] = useAtom(matchModalAtom);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <MatchForm />
      </DialogContent>
    </Dialog>
  );
}
