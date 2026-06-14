"use client";

import { toast } from "sonner";
import ForgotPasswordForm from "../forms/forgor-password-form";
import { useForgotPassword } from "../hooks";

const ForgotPasswordViewPage = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (values: { email: string }) => {
    forgotPassword(values, {
      onSuccess: () => {
        toast.success("Please check your email for the password reset link.");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-1">Forgot password?</h2>

      <p className="text-muted-foreground text-sm text-center mb-8">
        Enter your email to reset your password.
      </p>

      <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export { ForgotPasswordViewPage };
