"use client";

import { useQuery } from "@tanstack/react-query";
import { getJoinedEvents } from "../../(api)/get-joined-events";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuthInfo } from "@/shared/stores/useAuthStore";
import type { Event } from "@/app/event/types/event";
import type { JoinedEventsPageData } from "../../(types)/joinedEvent";

export const useJoinedEvents = (page: number, size: number) => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  const query = useQuery({
    queryKey: [QUERY_KEY.myJoinedEvents, page, size],
    queryFn: () => getJoinedEvents({ page, size }),
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  const data: JoinedEventsPageData | undefined = query.data?.data;
  const events: Event[] = data ? data.items : [];

  return {
    ...query,
    events,
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


