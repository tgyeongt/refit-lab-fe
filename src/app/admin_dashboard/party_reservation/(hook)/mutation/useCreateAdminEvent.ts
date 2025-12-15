"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminEvent } from "../../(api)/create-admin-event";
import { QUERY_KEY } from "@/shared/constants/key";
import type { PartyFormData } from "../../new_post/(schema)/partyFormSchema";

// 신규 행사 생성 Mutation 훅
export const useCreateAdminEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PartyFormData) => {
      const formData = new FormData();

      const capacity =
        data.showCapacity && data.capacity
          ? Number.parseInt(data.capacity, 10)
          : null;

      const requestPayload = {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        capacity,
        location: data.location,
        detailLink: data.url || null,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );

      if (data.thumbnailFile instanceof File) {
        formData.append("thumbnail", data.thumbnailFile);
      }

      return createAdminEvent(formData);
    },
    onSuccess: () => {
      // 행사 리스트 다시 가져오기
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.adminEvents] });
    },
  });
};


