import { create } from "zustand";

type SheetType = "category" | "condition" | "size" | "wantCategory" | null;

interface ExchangeSelectState {
  category: string;
  condition: string;
  size: string;

  wantCategory: string;
  spot: string;

  openSheet: SheetType;

  open: (type: SheetType) => void;
  close: () => void;

  setCategory: (v: string) => void;
  setCondition: (v: string) => void;
  setSize: (v: string) => void;

  setWantCategory: (v: string) => void;
  setSpot: (v: string) => void;
}

export const useExchangeSelectStore = create<ExchangeSelectState>((set) => ({
  category: "",
  condition: "",
  size: "",

  wantCategory: "",
  spot: "",

  openSheet: null,

  open: (type) => set({ openSheet: type }),
  close: () => set({ openSheet: null }),

  setCategory: (v) => set({ category: v }),
  setCondition: (v) => set({ condition: v }),
  setSize: (v) => set({ size: v }),

  setWantCategory: (v) => set({ wantCategory: v }),
  setSpot: (v) => set({ spot: v }),
}));
