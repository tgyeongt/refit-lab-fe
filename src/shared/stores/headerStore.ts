import { create } from "zustand";

interface HeaderStore {
  title: string;
  showBack: boolean;
  showMenu: boolean;

  isSidebarOpen: boolean;

  setHeader: (config: Partial<HeaderStore>) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  showBack: false,
  showMenu: true,
  isSidebarOpen: false,

  setHeader: (config) =>
    set((state) => ({
      ...state,
      ...config,
    })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
