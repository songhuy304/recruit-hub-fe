"use client";

import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { ForgotPasswordFormValues } from "../shemas";

interface ForgotPasswordValues {
  email: string;
}

interface Props {
  onSubmit: (values: ForgotPasswordValues) => void;
  isPending?: boolean;
}

export default function ForgotPasswordForm({ onSubmit, isPending }: Props) {
  const form = useAppForm({
    defaultValues: {
      email: "",
    },

    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const { FormTextField } = useFormFields<ForgotPasswordFormValues>();

  return (
    <form.AppForm>
      <form.Form className="w-full space-y-3">
        <FormTextField
          name="email"
          label="Email"
          required
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
        />

        <form.SubmitButton className="w-full" isLoading={isPending}>
          Send reset link
        </form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}
