"use client";

import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

import { FormModal } from "@/components/form-modal";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { objectToFormData } from "@/lib/utils";
import { exportModalAtom, teamModalAtom } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetLeaguesQuery } from "../leagues/leagues.query";
import { useAddTeamMutation } from "./teams-query";
import { TeamInput, teamSchema } from "./teams-schema";

export function TeamsExportModal() {
  const [open, setOpen] = useAtom(exportModalAtom);
  const form = useForm<TeamInput>({
    defaultValues: {
      name: "",
      city: "",
      abbreviation: "",
      leagueId: "",
      logo: undefined,
    },
    resolver: zodResolver(teamSchema),
  });
  const { mutate: addTeam, isLoading, reset } = useAddTeamMutation();

  const { data: leagues } = useGetLeaguesQuery();

  const onSubmit = (values: TeamInput) => {
    const { logo } = values;
    const formData = objectToFormData({ ...values, logo: logo?.item(0) });
    addTeam(formData, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };
  return (
    <FormModal
      open={open}
      setOpen={setOpen}
      title="Add a new team"
      description="Use this form to add a new team to a league."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="leagueId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>League</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a league" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Leagues</SelectLabel>
                        {leagues?.map((league) => (
                          <SelectItem key={league.id} value={league.id}>
                            {league.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between space-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abbreviation"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Abbreviation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Team city" {...field} />
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
          <div className="flex items-center justify-end space-x-2 pt-4">
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
    </FormModal>
  );
}
