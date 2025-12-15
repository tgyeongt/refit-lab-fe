import { uploadProfileImage } from "@/shared/api/profile-image";
import { create } from "zustand";

interface UserImgState {
  profileImage: string | null;
  isUpdating: boolean;
  error: string | null;
  uploadProfileImage: (file: File) => Promise<string>;
  resetProfileImage: () => void;
}

// 유저 프로필 이미지 관리 스토어
export const useUserImgStore = create<UserImgState>((set) => ({
  profileImage: null,
  isUpdating: false,
  error: null,

  // 유저 프로필 이미지 업로드 (PUT /api/users/profile-image)
  uploadProfileImage: async (file: File) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await uploadProfileImage(file);
      const imageUrl = response.data;
      set({ profileImage: imageUrl });
      return imageUrl;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.";
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },
  resetProfileImage: () => set({ profileImage: null, error: null }),
}));
