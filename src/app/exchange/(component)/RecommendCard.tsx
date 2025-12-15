"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartIcon from "@/assets/icon/heart.svg";
import { ExchangePost } from "../(api)/getExchangeList";

interface RecommendCardProps {
  item: ExchangePost;
}

export default function RecommendCard({ item }: RecommendCardProps) {
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/exchange/${item.exchangePostId}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="flex gap-[12px] min-w-[260px] bg-white p-[15px] cursor-pointer flex-shrink-0"
    >
      <div className="w-[120px] h-[100px] overflow-hidden rounded-[10px] flex-shrink-0">
        <Image
          src={item.thumbnailImageUrl}
          alt={item.title}
          width={120}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="font-semibold text-[18px]">{item.title}</p>
          <p className="text-[12px] text-[#757575] mt-[4px]">
            {item.exchangeSpot}
          </p>
        </div>

        {/* <div className="flex justify-end items-center gap-[4px] text-[12px] text-[#9E9E9E]">
          <HeartIcon width={12} height={10} color="#9E9E9E" />0
        </div> */}
      </div>
    </div>
  );
}
