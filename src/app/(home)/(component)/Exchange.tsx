"use client";

import { useState, useEffect } from "react";
import ExchangeCard from "./ExchangeCard";
import {
  getExchangeList,
  ExchangePost,
} from "@/app/exchange/(api)/getExchangeList";
import ClipImg from "@/assets/image/bg-clip.png";
import Link from "next/link";

export default function Exchange() {
  const [items, setItems] = useState<ExchangePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await getExchangeList({
          pageNum: 1,
          pageSize: 5,
        });

        if (!ignore) {
          setItems(res.content);
        }
      } catch (err) {
        console.error("교환 게시글 조회 실패:", err);
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetch();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="text-center mt-10">로딩중...</p>;
  if (error)
    return <p className="text-center mt-10">데이터를 불러오지 못했습니다.</p>;
  if (!items.length)
    return <p className="text-center mt-10">게시글이 없습니다.</p>;

  return (
    <section
      id={"exchange"}
      style={{
        backgroundImage: `url(${ClipImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-[490px] mt-[30px]"
    >
      <div className="flex items-center justify-between px-[15px] pt-[50px]">
        <h2 className="text-[24px] font-semibold">지금 교환 중인 옷</h2>
        <Link href="/exchange" className="text-[14px] text-[#9E9E9E]">
          더보기
        </Link>
      </div>

      <div className="mt-2">
        <div className="px-4 pt-6">
          <div className="flex gap-4 overflow-x-auto h-[280px] scrollbar-hide snap-x snap-mandatory">
            {items.map((item) => (
              <div key={item.exchangePostId} className="snap-start">
                <ExchangeCard key={item.exchangePostId} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
