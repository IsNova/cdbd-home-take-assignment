"use client";

import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { editAtom, teamModalAtom } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddTeamMutation } from "./teams-query";
import { TeamInput, teamSchema } from "./teams-schema";
import { useEffect } from "react";

export function TeamForm({ data }: any) {
  console.log("🚀 ~ TeamForm ~ data:", data);
  const [open, setOpen] = useAtom(teamModalAtom);
  const isEditing = useAtomValue(editAtom);

  const form = useForm<TeamInput>({
    defaultValues: {
      menuId: data?.id,
      depth: "",
      parent: data?.parent?.id,
      name: data?.name,
    },
    resolver: zodResolver(teamSchema),
  });
  useEffect(() => {
    reset(data);
  }, [data, isEditing]);
  const { mutate: addTeam, isLoading, reset } = useAddTeamMutation();

  const onSubmit = (values: TeamInput) => {
    addTeam(values, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="menuId"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>MenuID</FormLabel>
              <FormControl>
                <Input placeholder="Team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depth"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Depth</FormLabel>
              <FormControl>
                <Input placeholder="Team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Parent</FormLabel>
              <FormControl>
                <Input placeholder="Team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
