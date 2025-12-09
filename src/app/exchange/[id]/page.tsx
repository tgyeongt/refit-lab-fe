"use client";

import useHeader from "@/shared/hooks/useHeader";
import CardiganImg from "@/assets/image/cardigan.png";
import PaperImg from "@/assets/image/bg-paper.png";
import CarbonImg from "@/assets/image/carbon-reduction.png";
import LetterImg from "@/assets/image/letter.png";
import DummyImg from "@/assets/image/Profile.png";

import PinIcon from "@/assets/icon/pin.svg";
import Image from "next/image";
import KakaoMap from "./KakaoMap";

export default function ExchangeDetailPage() {
  useHeader({
    showBack: true,
    showMenu: true,
  });

  return (
    <div className="w-full">
      <div className="w-full aspect-square relative">
        <Image
          src={CardiganImg}
          alt="cardigan"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="px-[15px] py-[12px]">
        <p className="text-[#757575] text-[14px]">바지</p>
        <p className="text-[18px] font-medium mb-[25px]">
          스판 여성용 빈티지 청바지
        </p>

        <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
          <span className="text-[#5D5D5D] min-w-[60px]">사이즈</span>
          <span>M</span>
        </div>

        <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
          <span className="text-[#5D5D5D] min-w-[60px]">상태</span>
          <span>상</span>
        </div>

        <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
          <span className="text-[#5D5D5D] min-w-[60px]">수량</span>
          <span>1벌</span>
        </div>
      </div>

      <div className="p-[15px]">
        <p className="text-[14px]">교환 희망 스팟</p>
        <div className="flex gap-[5px] items-center mt-[5px] mb-[10px]">
          <PinIcon width={21} height={21} color="#642C8D" />
          <span className="text-[20px] font-semibold">시청역</span>
        </div>
        <div className="mt-2 mb-[25px]">
          <KakaoMap address="시청역" />
        </div>
      </div>

      <div className="p-[15px]">
        <div
          style={{
            backgroundImage: `url(${PaperImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex flex-col gap-[3px] px-[30px] py-[25px] text-[20px] text-[#642C8D] font-semibold"
        >
          <p>#청춘의_영원한_파트너</p>
          <p>#블루_진의_정석</p>
          <p>#데님_헤리티지</p>
        </div>

        <div className="w-full">
          <Image
            src={CarbonImg}
            alt="exchange"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="w-full">
          <Image
            src={LetterImg}
            alt="exchange"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="bg-[#F5F5F7] px-[15px] py-[10px]">
          <p className="text-[14px]">교환자</p>
          <div className="flex items-center justify-between pt-[8px] pb-[20px]">
            <div className="flex items-center space-x-3">
              <Image
                src={DummyImg}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full object-cover aspect-square"
              />
              <span className="font-semibold mr-[3px]">김다입</span>
              <span>님</span>
            </div>
            <button className="text-[14px] text-[#642C8D]">쓴 글 보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
