import { create } from "zustand";

interface RightButtonConfig {
  text: string | null;
  onClick: (() => void) | null;
  active?: boolean;
}

interface HeaderStore {
  title: string;
  showBack: boolean;
  showMenu: boolean;

  rightButton: RightButtonConfig | null;

  isSidebarOpen: boolean;

  setHeader: (config: Partial<HeaderStore>) => void;
  setRightHeader: (config: RightButtonConfig | null) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  showBack: false,
  showMenu: true,

  rightButton: null,

  isSidebarOpen: false,

  setHeader: (config) => set((state) => ({ ...state, ...config })),

  setRightHeader: (config) => set({ rightButton: config }),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
