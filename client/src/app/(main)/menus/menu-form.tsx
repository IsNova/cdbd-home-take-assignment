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

import { actionAtom, defaultValuesAtom } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddMenuMutation } from "./menu-query";
import { MenuInput, menuSchema } from "./menu-schema";
import { useEffect, useMemo } from "react";

export function TeamForm({ data }: any) {
  const defaultValue = useAtomValue(defaultValuesAtom);

  const defaultValues = useMemo(() => defaultValue, [data, defaultValue]);
  const form = useForm<MenuInput>({
    defaultValues,
    // resolver: zodResolver(menuSchema),
  });
  const action = useAtomValue(actionAtom);
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, action, form, defaultValue]);
  const { mutate: addMenu, isLoading, reset } = useAddMenuMutation();

  const onSubmit = (values: MenuInput) => {
    console.log("🚀 ~ onSubmit ~ values:", values);

    action === "create"
      ? addMenu(
          { name: values.name },
          {
            onSuccess: () => {
              reset();
            },
          },
        )
      : addMenu(
          { name: values.name, parentId: values.parentId },
          {
            onSuccess: () => {
              reset();
            },
          },
        );
  };

  const disabled = action === "edit";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        {action === "create" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {action === "add" && (
          <>
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Parent</FormLabel>
                  <FormControl>
                    <Input placeholder="parent" {...field} disabled />
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
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {action === "edit" && (
          <>
            <FormField
              control={form.control}
              name="menuId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>MenuID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="menu id"
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input placeholder="depth" {...field} disabled={disabled} />
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
                    <Input
                      placeholder="parent"
                      {...field}
                      disabled={disabled}
                    />
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
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

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
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
}
