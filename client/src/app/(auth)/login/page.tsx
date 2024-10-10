import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./login-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <>
      <div className="container relative grid h-full flex-col items-center justify-center md:bg-white lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0">
            <Image
              src="/images/login-image.jpg"
              width={1280}
              height={843}
              alt="Authentication"
              className="block h-full object-cover dark:hidden"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="relative mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Image
              src="/et-logo.png"
              width={1000}
              height={100}
              alt="Authentication"
              className="block h-12 w-auto object-contain dark:hidden"
            />

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
