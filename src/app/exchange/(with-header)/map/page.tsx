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
    showMenu: false,
  });
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);

  const { location, setLocation } = useLocationStore();
  const [keyword, setKeyword] = useState("");

  useCurrentLocation();

  useEffect(() => {
    if (!location) return;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JAVASCRIPT_KAKAO_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      const kakao = window.kakao as any;
      if (!kakao || !mapRef.current) return;

      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(location.lat, location.lng);

        const map = new kakao.maps.Map(mapRef.current!, {
          center,
          level: 3,
        });

        const marker = new kakao.maps.Marker({
          position: center,
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;

          marker.setPosition(latlng);

          setLocation({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
            placeName: location.placeName,
          });
        });

        if (keyword) {
          const places = new kakao.maps.services.Places();

          places.keywordSearch(keyword, (result: any, status: any) => {
            if (status !== kakao.maps.services.Status.OK) return;

            const place = result[0];
            const lat = Number(place.y);
            const lng = Number(place.x);

            const pos = new kakao.maps.LatLng(lat, lng);

            map.setCenter(pos);
            marker.setPosition(pos);

            setLocation({
              lat,
              lng,
              placeName: place.place_name,
            });
          });
        }
      });
    };

    document.head.appendChild(script);
  }, [location?.lat, location?.lng, keyword]);

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

        <div
          className="fixed bottom-0 left-0 right-0 z-50 
          px-[10px] pb-[15px] pt-[10px] bg-white"
        >
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
