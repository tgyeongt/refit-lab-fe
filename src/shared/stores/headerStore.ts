"use client";

import { create } from "zustand";

interface HeaderState {
  title: string;
  showBack: boolean;
  showMenu: boolean;
  setHeader: (state: Partial<HeaderState>) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: "",
  showBack: false,
  showMenu: true,
  setHeader: (state) => set((prev) => ({ ...prev, ...state })),
}));
