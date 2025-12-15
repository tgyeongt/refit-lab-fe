"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventImages } from "../../(api)/get-event-images";
import { QUERY_KEY } from "@/shared/constants/key";

export const useEventImages = (eventId: number) => {
  const isValidId = eventId > 0 && !isNaN(eventId);

  const query = useQuery({
    queryKey: [QUERY_KEY.eventImages, eventId],
    queryFn: () => getEventImages(eventId),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  const images = query.data ?? [];

  return {
    ...query,
    images,
  };
};


