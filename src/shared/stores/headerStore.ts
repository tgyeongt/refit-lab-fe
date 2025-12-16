import { create } from "zustand";

interface HeaderStore {
  title: string;
  showBack: boolean;
  showMenu: boolean;

  isSidebarOpen: boolean;
  isMoreOpen: boolean;

  isAuthor?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;

  setHeader: (config: Partial<HeaderStore>) => void;
  setSidebarOpen: (open: boolean) => void;
  setMoreOpen: (open: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  showBack: false,
  showMenu: true,

  isSidebarOpen: false,
  isMoreOpen: false,
  isAuthor: false,

  onEdit: undefined,
  onDelete: undefined,

  setHeader: (config) =>
    set((state) => ({
      ...state,
      ...config,
    })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setMoreOpen: (open) => set({ isMoreOpen: open }),
}));
