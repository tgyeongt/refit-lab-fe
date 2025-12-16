"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import useLocationStore from "@/shared/stores/locationStore";
import { useCurrentLocation } from "@/shared/hooks/useCurrentLocation";

export default function ExchangeMapPage() {
  useHeader({
    showBack: true,
    title: "교환 희망 스팟",
  });

  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  const { location, setLocation } = useLocationStore();
  const [keyword, setKeyword] = useState("");

  useCurrentLocation(); // 현재 위치 초기 세팅

  // Kakao Map SDK + 지도 초기화
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadKakaoMap = () => {
      const kakao = window.kakao as any;
      if (!kakao) return;

      kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = new kakao.maps.LatLng(
          location?.lat ?? 37.5665,
          location?.lng ?? 126.978
        );

        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });

        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);

        mapInstance.current = map;
        markerInstance.current = marker;

        kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          marker.setPosition(latlng);
          setLocation({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
            placeName: location?.placeName,
          });
        });
      });
    };

    if ((window as any).kakao) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JAVASCRIPT_KAKAO_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    }
  }, [location?.lat, location?.lng]);

  // 위치 변경 시 지도 및 마커 이동
  useEffect(() => {
    if (!location || !mapInstance.current || !markerInstance.current) return;

    const kakao = window.kakao as any;
    const pos = new kakao.maps.LatLng(location.lat, location.lng);

    mapInstance.current.setCenter(pos);
    markerInstance.current.setPosition(pos);
  }, [location?.lat, location?.lng]);

  // 키워드 검색
  useEffect(() => {
    if (!keyword || !mapInstance.current) return;

    const kakao = window.kakao as any;
    if (!kakao.maps.services) return;

    const places = new kakao.maps.services.Places();
    places.keywordSearch(keyword, (result: any, status: any) => {
      if (status !== kakao.maps.services.Status.OK) return;
      const place = result[0];
      setLocation({
        lat: Number(place.y),
        lng: Number(place.x),
        placeName: place.place_name,
      });
    });
  }, [keyword]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-[12px] my-[10px]">
        <p className="text-[18px] font-semibold mb-[8px]">교환 희망역</p>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="역 이름을 검색하세요 (예: 서울역)"
          className="
            w-full px-[12px] py-[10px]
            border border-[#9E9E9E] rounded-[8px]
            outline-none
          "
        />
      </div>

      <div ref={mapRef} className="flex-1 max-h-[400px]" />

      <div className="p-[16px]">
        <p className="text-[16px] text-[#757575]">선택된 위치</p>
        <p className="text-[18px] font-medium">
          {location?.placeName ?? "선택되지 않음"}
        </p>

        <div className="fixed bottom-0 left-0 right-0 z-50 px-[10px] pb-[15px] pt-[10px] bg-white">
          <button
            onClick={() => router.back()}
            className="w-full mt-3 p-[14px] rounded-[10px] bg-[#642C8D] text-white"
          >
            이 위치로 선택
          </button>
        </div>
      </div>
    </div>
  );
}
