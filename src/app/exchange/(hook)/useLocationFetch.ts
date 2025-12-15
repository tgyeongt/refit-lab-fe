"use client";

import { useState, useCallback } from "react";

interface Region {
  region_type: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export default function useLocationFetch() {
  const [location, setLocation] = useState("현재 위치 확인 중...");
  const [loading, setLoading] = useState(false);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation("위치 서비스를 지원하지 않음");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(`/exchange/geo?x=${longitude}&y=${latitude}`);
          const data = await res.json();

          const region: Region | undefined = data.documents?.find(
            (d: Region) => d.region_type === "H"
          );

          if (region) {
            setLocation(
              `${region.region_2depth_name} ${region.region_3depth_name}`
            );
          } else {
            setLocation("주소 정보를 찾을 수 없음");
          }
        } catch {
          setLocation("주소 조회 실패");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocation("위치 권한이 없습니다");
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, fetchLocation };
}
