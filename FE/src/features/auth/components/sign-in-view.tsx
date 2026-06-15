"use client";
import SignInForm from "@/features/auth/forms/sign-in.form";
import { setTokens } from "@/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useLoginSocial, useSignIn } from "../hooks";
import { SignInFormValues } from "../shemas";
import GoogleSignInButton from "./google-auth-button";
import GithubSignInButton from "./github-auth-button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { AUTH_PATHS } from "@/config/paths.config";
import { useQueryState } from "nuqs";

export default function SignInViewPage() {
  const [redirectUrl] = useQueryState("redirect");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: signIn, isPending } = useSignIn();
  const { loginWithGoogle, loginWithGithub } = useLoginSocial();

  const handleSignIn = (values: SignInFormValues) => {
    signIn(values, {
      onSuccess: (data) => {
        dispatch(setTokens(data.data));
        router.push(redirectUrl || "/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-1">Sign in to your account</h2>
      <p className="text-muted-foreground text-sm text-center mb-8">
        Welcome back! Please enter your details to continue.
      </p>
      <div className="w-full space-y-4">
        <SignInForm onSubmit={handleSignIn} isPending={isPending} />

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
              loginWithGoogle();
            }}
          />
          <GithubSignInButton
            onClick={() => {
              loginWithGithub();
            }}
          />
          <Typography variant="paragraph-sm" className="text-center">
            Create an account?{" "}
            <Link
              className={"text-primary underline font-medium"}
              href={AUTH_PATHS.SIGN_UP}
            >
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
