import { uploadImageToS3 } from "@/shared/api/uploadImg";
import { create } from "zustand";

interface UserImgState {
  profileImage: string | null;
  isUpdating: boolean;
  error: string | null;
  uploadProfileImage: (file: File) => Promise<void>;
  resetProfileImage: () => void;
}

// 유저 프로필 이미지 관리 스토어
export const useUserImgStore = create<UserImgState>((set) => ({
  profileImage: null,
  isUpdating: false,
  error: null,

  // 유저 프로필 이미지 업로드
  uploadProfileImage: async (file: File) => {
    set({ isUpdating: true, error: null });
    try {
      const { data } = await uploadImageToS3(file);
      set({ profileImage: data.imageUrl });
    } catch (error) {
      set({ error: error as string });
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },
  resetProfileImage: () => set({ profileImage: null, error: null }),
}));
