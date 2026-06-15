"use client";

import { useEffect, useState } from "react";
import { useGetMe } from "@/features/auth/hooks";
import { LoadingPage } from "../loading-page";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { tokenStorage } from "@/lib/auth";
import { selectAccessToken, setTokens, setUser } from "@/store";
import { useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/config/paths.config";

export default function AppBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const selectToken = useAppSelector(selectAccessToken);
  const router = useRouter();
  const { isLoading, error, data } = useGetMe();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = tokenStorage.getAccess();
    const refreshToken = tokenStorage.getRefresh();

    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
    }

    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated || isLoading) return;

    if (!selectToken || error) {
      router.replace(
        `${AUTH_PATHS.SIGN_IN}?redirect=${window.location.pathname}`,
      );
      return;
    }

    setIsAuthorized(true);
  }, [isHydrated, isLoading, selectToken, error, router]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.data));
    }
  }, [isAuthorized, dispatch, data]);

  if (!isHydrated || isLoading || !isAuthorized) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
