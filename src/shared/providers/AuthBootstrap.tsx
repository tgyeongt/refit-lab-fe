"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAuthInfo } from "../stores/useAuthStore";
import { useEffect } from "react";
import { getMyPage } from "@/app/my/(api)/get-my-page";
import { QUERY_KEY } from "../constants/key";

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const qc = useQueryClient();
  const { hydrated, isLoggedIn, accessToken } = useAuthInfo();

  useEffect(() => {
    if (!hydrated) return;

    if (isLoggedIn && !accessToken) return;

    qc.prefetchQuery({
      queryKey: [QUERY_KEY.myPage],
      queryFn: getMyPage,
      staleTime: 1000 * 60 * 5,
    });
  }, [hydrated, isLoggedIn, qc]);

  return <>{children}</>;
}
