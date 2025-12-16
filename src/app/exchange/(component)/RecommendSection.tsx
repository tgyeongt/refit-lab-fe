"use client";

import { useEffect, useState } from "react";

import FilterBar, { RecommendTab } from "./FilterBar";
import RecommendCard from "./RecommendCard";
import { getExchangeList, ExchangePost } from "../(api)/getExchangeList";

const CATEGORY_MAP: Record<RecommendTab, ExchangePost["category"]> = {
  아우터: "OUTER",
  상의: "SHIRTS",
  하의: "PANTS",
  신발: "SHOES",
  액세사리: "ACCESSORY",
};

export default function RecommendSection() {
  const [activeTab, setActiveTab] = useState<RecommendTab>("아우터");
  const [items, setItems] = useState<ExchangePost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      try {
        setLoading(true);

        const res = await getExchangeList({
          pageNum: 1,
          pageSize: 5,
          exchangeCategory: CATEGORY_MAP[activeTab],
        });

        if (!ignore) {
          console.log("⭐ recommend items:", res.content);
          setItems(res.content);
        }
      } catch (error) {
        console.error("추천 교환 조회 실패:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, [activeTab]);

  return (
    <div className="my-[30px]">
      <p className="font-semibold text-[20px] px-[20px]">
        사용자님에게 꼭 맞는 맞춤 추천
      </p>

      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="overflow-x-auto bg-[#642C8D] px-[20px] scrollbar-hide">
        <div className="flex gap-[15px] py-[20px] min-w-max">
          {loading && <p className="text-white">로딩중...</p>}

          {!loading && items.length === 0 && (
            <p className="text-white text-sm">추천 교환이 없습니다.</p>
          )}

          {!loading &&
            items.map((item) => (
              <RecommendCard key={item.exchangePostId} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
