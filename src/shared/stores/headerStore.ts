import { create } from "zustand";
import { ReactNode } from "react";

interface HeaderStore {
  title: string;
  showBack: boolean;
  showMenu: boolean;

  isSidebarOpen: boolean;

  // ⭐ 오른쪽 커스텀 버튼 영역
  rightElement: ReactNode | null;

  setHeader: (config: Partial<HeaderStore>) => void;
  setSidebarOpen: (open: boolean) => void;

  // ⭐ 오른쪽 영역 설정
  setRightElement: (element: ReactNode | null) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  showBack: false,
  showMenu: true,
  isSidebarOpen: false,

  rightElement: null,

  setHeader: (config) =>
    set((state) => ({
      ...state,
      ...config,
    })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  setRightElement: (element) => set({ rightElement: element }),
}));
