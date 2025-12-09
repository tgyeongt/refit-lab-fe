import { create } from "zustand";

interface LocationStore {
  location: string;
  loading: boolean;
  setLocation: (loc: string) => void;
  setLoading: (state: boolean) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  location: "",
  loading: false,
  setLocation: (loc) => set({ location: loc }),
  setLoading: (state) => set({ loading: state }),
}));

export default useLocationStore;
