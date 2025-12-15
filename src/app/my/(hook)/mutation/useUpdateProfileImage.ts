import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage } from "@/shared/api/profile-image";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuth } from "@/shared/stores/useAuthStore";

// 프로필 이미지 업데이트 훅
export const useUpdateProfileImage = () => {
  const { hydrated, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: () => {
      // 마이페이지 데이터 재조회
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myPage],
      });
    },
    onError: (error) => {
      console.error("프로필 이미지 업데이트 실패:", error);
    },
  });
};
