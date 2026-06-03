import UserAuthForm from "@/features/auth/components/user-auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignUpViewPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-1">Create an account</h2>
      <p className="text-muted-foreground text-sm text-center mb-8">
        Join us and start managing your tasks and projects.
      </p>
      <UserAuthForm />
    </div>
  );
}
