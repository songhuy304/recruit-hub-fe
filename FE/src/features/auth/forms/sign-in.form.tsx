"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { AUTH_PATHS } from "@/config/paths.config";
import Link from "next/link";
import { signInFormSchema, SignInFormValues } from "../shemas";

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void;
  isPending?: boolean;
}

export default function SignInForm({ onSubmit, isPending }: SignInFormProps) {
  const form = useAppForm({
    defaultValues: {
      identifier: "",
      password: "",
    } satisfies SignInFormValues,

    validators: {
      onSubmit: signInFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const { FormTextField } = useFormFields<SignInFormValues>();

  return (
    <form.AppForm>
      <form.Form className="w-full space-y-2 p-0">
        <FormTextField
          name="identifier"
          label="Email or Username"
          required
          placeholder="Enter your email or username"
          autoComplete="username"
        />

        <FormTextField
          name="password"
          label="Password"
          required
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <Link
          href={AUTH_PATHS.FORGOT_PASSWORD}
          className="text-primary underline font-medium text-sm text-right float-end"
        >
          Forgot password?
        </Link>

        <form.SubmitButton className="mt-2 w-full" isLoading={isPending}>
          Sign in
        </form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}
