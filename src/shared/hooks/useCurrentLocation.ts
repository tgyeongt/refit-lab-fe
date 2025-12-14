import { useEffect } from "react";
import useLocationStore from "../stores/locationStore";

export function useCurrentLocation() {
  const { setLocation, setLoading } = useLocationStore();

  useEffect(() => {
    if (!navigator.geolocation) return;

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        // 실패 시 서울 시청 fallback
        setLocation({
          lat: 37.5665,
          lng: 126.978,
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
}
