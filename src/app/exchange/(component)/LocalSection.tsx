"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LocalCard from "./LocalCard";
import useLocationStore from "@/shared/stores/locationStore";
import { getExchangeList, ExchangePost } from "../(api)/getExchangeList";

export default function LocalSection() {
  const location = useLocationStore((state) => state.location);
  const router = useRouter();

  const [items, setItems] = useState<ExchangePost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) {
      return;
    }

    const fetchLocalExchanges = async () => {
      try {
        setLoading(true);

        const res = await getExchangeList({
          pageNum: 1,
          pageSize: 4,
          latitude: location.lat,
          longitude: location.lng,
        });

        setItems(res.content);
      } catch (error) {
        console.error("❌ fetchLocalExchanges 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalExchanges();
  }, [location]);

  return (
    <div className="my-[15px] px-[20px] border-[#EEEEEE] border-t-[10px]">
      <p className="font-semibold text-[20px] py-[25px]">
        최근 {location?.placeName ?? "내 위치"} 주변 교환
      </p>

      <div className="flex gap-[12px] overflow-x-auto pr-[10px] scrollbar-hide">
        {loading && <p>로딩중...</p>}

        {!loading && items.length === 0 && (
          <p className="text-[14px] text-[#9E9E9E]">데이터 없음</p>
        )}

        {!loading &&
          items.map((item) => {
            return <LocalCard key={item.exchangePostId} item={item} />;
          })}
      </div>

      <button
        onClick={() => router.push("/exchange/local")}
        className="
          w-full bg-[#8F53BB] text-white text-[14px]
          flex items-center justify-center 
          p-[13px] rounded-[8px] mt-[25px]
        "
      >
        내 주변 옷 교환 보러 가기
      </button>
    </div>
  );
}
