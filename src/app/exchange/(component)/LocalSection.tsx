"use client";

import { useRouter } from "next/navigation";
import LocalCard from "./LocalCard";
import { localData } from "../(dummy)/localData";
import useLocationStore from "@/shared/stores/locationStore";

export default function LocalSection() {
  const location = useLocationStore((state) => state.location);
  const router = useRouter();

  return (
    <div className="my-[15px] px-[20px] border-[#EEEEEE] border-t-[10px]">
      <p className="font-semibold text-[20px] py-[25px]">
        최근 {location} 주변 교환
      </p>

      <div className="flex gap-[12px] overflow-x-auto pr-[10px] scrollbar-hide">
        {localData.map((item) => (
          <LocalCard key={item.id} item={item} />
        ))}
      </div>

      <button
        onClick={() => router.push("/exchange/local")}
        className="
          w-full bg-[#8F53BB] text-white text-[14px]
          flex items-center justify-center 
          p-[13px] rounded-[8px] mt-[25px]
          pointer-events-auto
        "
      >
        내 주변 옷 교환 보러 가기
      </button>
    </div>
  );
}
