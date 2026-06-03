import SignInForm from "@/features/auth/forms/sign-in.form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
