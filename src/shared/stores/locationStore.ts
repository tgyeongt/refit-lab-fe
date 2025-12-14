import { create } from "zustand";

export interface LatLng {
  lat: number;
  lng: number;
  placeName?: string;
}

interface LocationStore {
  location: LatLng | null;
  loading: boolean;
  setLocation: (loc: LatLng) => void;
  setLoading: (state: boolean) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  loading: false,
  setLocation: (loc) => set({ location: loc }),
  setLoading: (state) => set({ loading: state }),
}));

export default useLocationStore;
