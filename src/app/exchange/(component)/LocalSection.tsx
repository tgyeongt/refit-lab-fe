"use client";

import LocalCard from "./LocalCard";
import { localData } from "../(dummy)/localData";
import useLocationStore from "@/shared/stores/locationStore";

export default function LocalSection() {
  const location = useLocationStore((state) => state.location);

  return (
    <div className="my-[15px] px-[20px] border-[#EEEEEE] border-t-[10px] mb-[80px]">
      <p className="font-semibold text-[20px] py-[25px]">
        최근 {location} 주변 교환
      </p>

      <div className="flex gap-[12px] overflow-x-auto pr-[10px] scrollbar-hide">
        {localData.map((item) => (
          <LocalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
