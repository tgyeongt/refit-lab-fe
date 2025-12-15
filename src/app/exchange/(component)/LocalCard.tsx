"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExchangePost } from "../(api)/getExchangeList";

export default function LocalCard({ item }: { item: ExchangePost }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/exchange/local/${item.exchangePostId}`)}
      className="flex flex-col gap-[10px] bg-white cursor-pointer flex-shrink-0 rounded-[10px]"
    >
      <div className="w-[150px] h-[150px] overflow-hidden rounded-[8px]">
        <Image
          src={item.thumbnailImageUrl}
          alt={item.title}
          width={150}
          height={150}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[15px]">{item.title}</p>
        <p className="text-[13px] text-[#757575]">{item.exchangeSpot}</p>
      </div>
    </div>
  );
}
