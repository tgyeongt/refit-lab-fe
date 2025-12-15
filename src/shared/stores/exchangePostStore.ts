import { create } from "zustand";

export type ExchangePostFormState = {
  photo: File[];
  title: string;
  category: string;
  size: string;
  condition: string;
  wantCategory: string;
  wantSize: string;
  description: string;

  update: <K extends keyof Omit<ExchangePostFormState, "update" | "reset">>(
    key: K,
    value: ExchangePostFormState[K]
  ) => void;
  reset: () => void;
};

const initialState = {
  photo: [],
  title: "",
  category: "",
  size: "",
  condition: "",
  wantCategory: "",
  wantSize: "",
  description: "",
};

export const useExchangePostStore = create<ExchangePostFormState>((set) => ({
  ...initialState,

  update: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  reset: () => set(initialState),
}));
