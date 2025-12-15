"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminEvent } from "../../(api)/delete-admin-event";
import { QUERY_KEY } from "@/shared/constants/key";

export const useDeleteAdminEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminEvent(id),
    onSuccess: () => {
      // 행사 리스트 다시 가져오기
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.adminEvents] });
    },
  });
};
