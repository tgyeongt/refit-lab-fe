"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuthInfo } from "@/shared/stores/useAuthStore";
import { getAdminEvents } from "../(api)/get-admin-events";
import {
  AdminEventStatus,
  AdminEventsPageData,
  Party,
  mapPartyFromAdminEvent,
} from "../(types)/party";

export interface UseAdminEventsParams {
  page: number;
  size: number;
  status?: AdminEventStatus;
  q?: string;
}

export const useAdminEvents = ({ page, size, status, q }: UseAdminEventsParams) => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  const query = useQuery({
    queryKey: [QUERY_KEY.adminEvents, page, size, status ?? "ALL", q ?? ""],
    queryFn: () => getAdminEvents({ page, size, status, q }),
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  const data: AdminEventsPageData | undefined = query.data?.data;

  const parties: Party[] = data
    ? data.items.map((event) => mapPartyFromAdminEvent(event))
    : [];

  return {
    ...query,
    parties,
    pagination: data
      ? {
          page: data.page,
          size: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          hasNext: data.hasNext,
        }
      : undefined,
  };
};


