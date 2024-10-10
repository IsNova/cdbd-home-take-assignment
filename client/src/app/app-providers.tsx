"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/configs/query-client";

type AppProvidersProps = {
  session?: Session | null;
  children: React.ReactNode;
};
export default function AppProviders({ session, children }: AppProvidersProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
