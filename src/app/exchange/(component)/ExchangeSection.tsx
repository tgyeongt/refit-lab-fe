"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PinIcon from "@/assets/icon/pin.svg";
import ClothesImage from "@/assets/image/clothes.png";
import Image from "next/image";
import useLocationFetch from "../(hook)/useLocationFetch";

export default function ExchangeSection() {
  const router = useRouter();
  const { location, loading, fetchLocation } = useLocationFetch();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const goToExchange = () => {
    router.push("/exchange/post");
  };

  return (
    <div className="my-[15px] px-[20px]">
      <p className="font-semibold text-[20px]">의류 교환</p>

      {/* 위치 영역 */}
      <div className="flex gap-[4px] items-center mt-[10px]">
        <PinIcon width={20} height={20} color="#424242" />
        <span className="text-[16px] text-[#424242] mr-[20px]">
          {loading ? "위치 불러오는 중..." : location}
        </span>

        <button onClick={fetchLocation} className="text-[#BDBDBD]">
          위치 변경
        </button>
      </div>

      {/* 교환 배너 */}
      <div className="flex bg-[#F6E9FF] py-[25px] pl-[25px] pr-[10px] rounded-[8px] mt-[15px] justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[20px] font-semibold my-[5px]">
            의류 교환하러 가기
          </p>
          <p className="text-[14px] text-[#616161]">안 입는 옷도 다시 입자!</p>
          <p className="text-[14px] text-[#616161]">
            환경도 살리고 만족도는 높이고
          </p>

          <button
            onClick={goToExchange}
            className="bg-[#642C8D] text-white px-[15px] py-[7px] text-[14px]
              w-fit rounded-[30px] mt-[30px] font-medium"
          >
            지금 시작하기
          </button>
        </div>

        <Image
          src={ClothesImage}
          alt="exchange"
          width={110}
          height={110}
          className="object-contain"
        />
      </div>
    </div>
  );
}
