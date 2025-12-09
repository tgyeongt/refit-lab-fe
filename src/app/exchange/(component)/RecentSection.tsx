"use client";

import useLocationStore from "@/shared/stores/locationStore";

export default function RecentSection() {
  const location = useLocationStore((state) => state.location);

  return (
    <div className="my-[15px] px-[20px] border-[#EEEEEE] border-t-[10px]">
      <p className="font-semibold text-[20px] pt-[25px]">
        최근 {location} 주변 교환
      </p>

      <p>recent</p>
    </div>
  );
}
