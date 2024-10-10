"use client";

import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { objectToFormData } from "@/lib/utils";
import { leagueModalAtom } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { LeagueInput, leagueSchema } from "./league.schema";
import { useAddLeagueMutation } from "./leagues.query";
import { Icons } from "@/components/icons";

export function LeagueForm() {
  const setOpen = useSetAtom(leagueModalAtom);
  const form = useForm<LeagueInput>({
    defaultValues: {
      name: "",
      description: "",
      logo: undefined,
    },
    resolver: zodResolver(leagueSchema),
  });
  const { mutate: addLeague, isLoading, reset } = useAddLeagueMutation();

  const onSubmit = (values: LeagueInput) => {
    const { logo } = values;
    const formData = objectToFormData({ ...values, logo: logo?.item(0) });
    addLeague(formData, {
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
        className="space-y-4 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="League name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="League description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={() => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("logo")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center space-x-2 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
