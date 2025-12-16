"use client";

import useHeader from "@/shared/hooks/useHeader";
import { useHeaderStore } from "@/shared/stores/headerStore";
import PaperImg from "@/assets/image/bg-paper.png";
import CarbonImg from "@/assets/image/carbon-reduction.png";
import LetterImg from "@/assets/image/letter.png";
import DummyImg from "@/assets/image/Profile.png";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";
import { deleteExchangePost } from "../(api)/deleteExchangePost";

import PinIcon from "@/assets/icon/pin.svg";
import Image from "next/image";
import KakaoMap from "./KakaoMap";
import FloatingExchangeButton from "./FloatingExchangeButton";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getExchangeDetail,
  ExchangeDetailData,
} from "@/app/exchange/(api)/getExchangeDetail";
import { useParams, useRouter } from "next/navigation";

export default function ExchangeDetailPage() {
  useHeader({ showBack: true, showMenu: false });

  const params = useParams();
  const exchangePostId = Number(params.id);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<ExchangeDetailData>({
    queryKey: ["exchangeDetail", exchangePostId],
    queryFn: () => getExchangeDetail(exchangePostId),
    enabled: !!exchangePostId && !Number.isNaN(exchangePostId),
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;

    useHeaderStore.getState().setHeader({
      isAuthor: data.isAuthor,
      showBack: true,
      showMenu: false,
      onDelete: async () => {
        try {
          if (!confirm("정말 삭제하시겠습니까?")) return;

          await deleteExchangePost(data.exchangePostId);
          alert("게시글이 삭제되었습니다.");
          router.push("/exchange");
        } catch (error: any) {
          console.error(error);
          alert("게시글 삭제에 실패했습니다.");
        }
      },
    });
  }, [data]);

  if (!exchangePostId || Number.isNaN(exchangePostId)) {
    return <p className="text-center mt-10">잘못된 접근입니다.</p>;
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data)
    return <p className="text-center mt-10">데이터를 불러오지 못했습니다.</p>;

  const timeAgoText = useTimeAgo(data.createdAt);

  const CATEGORY_MAP: Record<string, string> = {
    SHIRTS: "상의",
    PANTS: "하의",
    OUTER: "아우터",
    SHOES: "신발",
    ACCESSORY: "액세서리",
  };

  const STATUS_MAP: Record<string, string> = {
    GOOD: "상",
    FAIR: "중",
    BAD: "하",
  };

  const SIZE_MAP: Record<string, string> = {
    Free: "FREE",
    "2XS": "XS2",
    XS: "XS",
    S: "S",
    M: "M",
    L: "L",
    XL: "XL",
    "2XL": "XL2",
    "3XL": "XL3",
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="w-full pb-[80px]">
        {/* 이미지 슬라이더 */}
        <div
          className="w-full aspect-square relative overflow-x-scroll scroll-snap-x snap-mandatory flex"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {data.imageUrlList.map((url, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full h-full relative scroll-snap-start"
            >
              <Image
                src={url}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        <div className="px-[15px] py-[12px]">
          <p className="text-[#757575] text-[14px]">
            {CATEGORY_MAP[data.category] || data.category}
          </p>
          <p className="text-[18px] font-medium mb-[25px]">{data.title}</p>

          <div className="border-b border-[#9E9E9E]">
            <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
              <span className="text-[#5D5D5D] min-w-[80px]">사이즈</span>
              <span>{SIZE_MAP[data.size] || data.size}</span>
            </div>

            <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
              <span className="text-[#5D5D5D] min-w-[80px]">상태</span>
              <span>{STATUS_MAP[data.status] || data.status}</span>
            </div>

            <p className="text-[14px] text-[#9E9E9E] p-[15px]">{timeAgoText}</p>
          </div>

          <div className="border-b border-[#9E9E9E] py-[25px]">
            <div className="bg-[#F5F5F7] px-[15px] py-[20px] flex min-h-[100px] ">
              <span>{data.description}</span>
            </div>
          </div>

          {/* 교환 희망 정보 */}
          <div className="pt-[25px] pb-[10px]">
            <div className="bg-[#F5F5F7] text-[14px] px-[15px] py-[10px] flex items-center">
              <span className="text-[#5D5D5D] min-w-[80px]">교환 희망</span>
              <span>{CATEGORY_MAP[data.preferCategoryList.join(", ")]}</span>
            </div>
          </div>
        </div>

        {/* 교환 스팟 */}
        <div className="p-[15px]">
          <p className="text-[14px]">교환 희망 스팟</p>
          <div className="flex gap-[5px] items-center mt-[5px] mb-[10px]">
            <PinIcon width={21} height={21} color="#642C8D" />
            <span className="text-[20px] font-semibold">
              {data.exchangeSpot}
            </span>
          </div>
          <div className="mt-2 mb-[25px]">
            <KakaoMap
              latitude={data.spotLatitude}
              longitude={data.spotLongitude}
            />
          </div>
        </div>

        {/* 태그 */}
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
            <p>#지속가능한_스타일</p>
            <p>#중고_옷의_재발견</p>
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
        </div>
      </div>

      <FloatingExchangeButton postId={exchangePostId} />
    </>
  );
}
