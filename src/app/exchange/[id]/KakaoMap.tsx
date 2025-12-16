"use client";

import { useEffect, useRef, useState } from "react";

type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

type KakaoMapInstance = {
  setCenter: (latlng: KakaoLatLng) => void;
};

type KakaoMapOptions = {
  center: KakaoLatLng;
  level?: number;
  [key: string]: unknown;
};

type KakaoStatic = {
  maps: {
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (
      container: HTMLElement,
      options: KakaoMapOptions
    ) => KakaoMapInstance;
    load: (cb: () => void) => void;
    Marker: new (opts: {
      position: KakaoLatLng;
      map?: KakaoMapInstance;
    }) => unknown;
  };
};

declare global {
  interface Window {
    kakao?: KakaoStatic;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

export default function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    const existing = document.querySelector(`script[data-kakao="true"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-kakao", "true");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JAVASCRIPT_KAKAO_KEY}&autoload=false`;

    const onLoad = () => {
      const kakao = window.kakao;
      if (!kakao) {
        setErrorMessage("Kakao SDK 로드 실패");
        return;
      }

      kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) {
          setErrorMessage("지도 컨테이너를 찾을 수 없습니다.");
          return;
        }

        const center = new kakao.maps.LatLng(latitude, longitude);
        const options: KakaoMapOptions = { center, level: 3 };
        const mapInstance = new kakao.maps.Map(container, options);

        new kakao.maps.Marker({
          map: mapInstance,
          position: center,
        });
      });
    };

    script.addEventListener("load", onLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          maxWidth: 900,
          height: 180,
          minHeight: 180,
        }}
      />
    </>
  );
}
