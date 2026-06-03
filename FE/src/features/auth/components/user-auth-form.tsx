"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import GoogleSignInButton from "@/features/auth/components/google-auth-button";
import { signUpFormSchema, SignUpFormValues } from "@/features/auth/shemas";
import Link from "next/link";
import { toast } from "sonner";
import GithubSignInButton from "./github-auth-button";

export default function UserAuthForm() {
  const form = useAppForm({
    defaultValues: {
      userName: "",
      email: "",
      fullName: "",
      password: "",
    } as SignUpFormValues,
    validators: {
      onSubmit: signUpFormSchema,
    },
    onSubmit: () => {
      toast.success("Account created successfully!");
    },
  });

  const { FormTextField } = useFormFields<SignUpFormValues>();

  return (
    <div className="w-full space-y-4">
      <form.AppForm>
        <form.Form className="w-full space-y-2 p-0">
          <FormTextField
            name="userName"
            label="Username"
            required
            placeholder="johndoe"
            autoComplete="username"
          />
          <FormTextField
            name="fullName"
            label="Full name"
            required
            placeholder="John Doe"
            autoComplete="name"
          />
          <FormTextField
            name="email"
            label="Email"
            required
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
          />
          <FormTextField
            name="password"
            label="Password"
            required
            type="password"
            placeholder="Min 8 characters"
            autoComplete="new-password"
          />
          <form.SubmitButton className="mt-2 w-full">
            Create account
          </form.SubmitButton>
        </form.Form>
      </form.AppForm>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <GoogleSignInButton
          onClick={() => {
            toast.info("Google sign up is not configured yet.");
          }}
        />
        <GithubSignInButton />
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className={"text-primary underline"} href="/auth/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
