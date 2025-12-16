"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/key";
import { getMyTickets } from "../../(api)/get-my-tickets";
import { useAuthInfo } from "@/shared/stores/useAuthStore";
import { mapTicketFromApi, Ticket } from "../../(types)/ticket";

export const useMyTickets = (page: number, size: number) => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  const query = useQuery({
    queryKey: [QUERY_KEY.myTickets, page, size],
    queryFn: () => getMyTickets({ page, size }),
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  const ticketsPage = query.data?.data;
  const tickets: Ticket[] = ticketsPage
    ? ticketsPage.items.map((item) => mapTicketFromApi(item))
    : [];

  return {
    ...query,
    tickets,
    pagination: ticketsPage
      ? {
          page: ticketsPage.page,
          size: ticketsPage.size,
          totalElements: ticketsPage.totalElements,
          totalPages: ticketsPage.totalPages,
          hasNext: ticketsPage.hasNext,
        }
      : undefined,
  };
};


