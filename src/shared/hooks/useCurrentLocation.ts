import { useEffect } from "react";
import useLocationStore from "../stores/locationStore";

export function useCurrentLocation() {
  const { setLocation, setLoading } = useLocationStore();

  useEffect(() => {
    if (location) return;
    if (!navigator.geolocation) {
      setLocation({
        lat: 37.5665,
        lng: 126.978,
        placeName: "서울 시청",
      });
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          placeName: "현재 위치",
        });
        setLoading(false);
      },
      () => {
        // 권한 거부 or 오류
        setLocation({
          lat: 37.5665,
          lng: 126.978,
          placeName: "서울 시청",
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, [setLocation, setLoading]);
}
