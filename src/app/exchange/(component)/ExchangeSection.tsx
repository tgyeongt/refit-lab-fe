"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PinIcon from "@/assets/icon/pin.svg";
import ClothesImg from "@/assets/image/clothes.png";
import Image from "next/image";
import useLocationFetch from "../(hook)/useLocationFetch";
import useLocationStore from "@/shared/stores/locationStore";
import ExchangeBottomSheet from "./ExchangeBottomSheet";

export default function ExchangeSection() {
  const { location, loading, fetchLocation } = useLocationFetch();
  const { setLocation, setLoading } = useLocationStore();
  const router = useRouter();

  const [openSheet, setOpenSheet] = useState(false);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    if (location) setLocation({ lat: 0, lng: 0, placeName: location });
  }, [location, setLocation]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const openBottomSheet = () => {
    setOpenSheet(true);
  };

  return (
    <div className="my-[15px] px-[20px]">
      <p className="font-semibold text-[20px]">의류 교환</p>

      <div className="flex gap-[4px] items-center mt-[10px]">
        <PinIcon width={20} height={20} color="#424242" />
        <span className="text-[16px] text-[#424242] mr-[20px]">
          {loading ? "위치 불러오는 중..." : location}
        </span>

        <button onClick={fetchLocation} className="text-[#BDBDBD]">
          위치 변경
        </button>
      </div>

      <div className="flex bg-[#F6E9FF] py-[25px] pl-[25px] pr-[10px] rounded-[8px] mt-[15px] justify-between items-center">
        <div>
          <p className="text-[20px] font-semibold my-[5px]">
            의류 교환하러 가기
          </p>
          <p className="text-[14px] text-[#616161]">안 입는 옷도 다시 입자!</p>
          <p className="text-[14px] text-[#616161]">
            환경도 살리고 만족도는 높이고
          </p>

          <button
            onClick={() => router.push("/exchange/post")}
            className="bg-[#642C8D] text-white px-[15px] py-[7px] text-[14px] w-fit rounded-[30px] mt-[30px] font-medium"
          >
            지금 시작하기
          </button>
        </div>

        <Image
          src={ClothesImg}
          alt="exchange"
          width={110}
          height={110}
          className="object-contain"
        />
      </div>

      <ExchangeBottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
      />
    </div>
  );
}
