"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/config/paths.config";
import ForgotPasswordForm from "../forms/forgor-password-form";

const ForgotPasswordViewPage = () => {
  const router = useRouter();

  // const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (values: { email: string }) => {
    // forgotPassword(values, {
    //   onSuccess: () => {
    //     toast.success("Reset password link sent");
    //     router.push(AUTH_PATHS.RESET_PASSWORD);
    //   },
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Forgot password?</h2>

      <p className="text-muted-foreground text-sm mb-8">
        Enter your email to reset your password.
      </p>

      <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export { ForgotPasswordViewPage };
