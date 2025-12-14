import { create } from "zustand";

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationStore {
  location: Location | null;
  loading: boolean;

  setLocation: (loc: Location) => void;
  setLoading: (state: boolean) => void;
  clearLocation: () => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  loading: false,

  setLocation: (loc) => set({ location: loc }),
  setLoading: (state) => set({ loading: state }),
  clearLocation: () => set({ location: null }),
}));

export default useLocationStore;
