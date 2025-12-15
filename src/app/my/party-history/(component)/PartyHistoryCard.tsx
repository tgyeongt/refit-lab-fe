"use client";

import { Event } from "@/app/event/types/event";
import Icon from "@/shared/components/Icon";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import Calendar from "@/assets/icon/calendar.svg";
import Pin from "@/assets/icon/pin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/util/formatDate";

interface PartyHistoryCardProps {
  event: Event;
}

// 참가한 행사 카드 컴포넌트 (EventCard와 거의 동일한 UI)
export const PartyHistoryCard = ({ event }: PartyHistoryCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/event/booking/${event.eventId}`);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="flex h-[150px]">
        {/* 왼쪽: 썸네일 이미지 */}
        <div className="relative w-[137px] h-[137px] m-[7px] rounded-[10px] overflow-hidden shrink-0">
          <Image
            src={event.thumbnailUrl || "/image/mockEventImg.jpg"}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>

        {/* 오른쪽: 텍스트 컨텐츠 */}
        <div className="flex-1 flex flex-col justify-between py-[25px] pr-[13px] pl-[15px]">
          {/* 제목 */}
          <h3 className="text-lg font-semibold text-black leading-[23px] mb-[5px] pr-8">
            {event.name}
          </h3>

          {/* 날짜 & 위치 */}
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex items-center gap-[4px]">
              <Icon icon={Calendar} width={17} height={17} color="#9E9E9E" />
              <span className="text-xs text-gray-6 leading-5">
                {formatDate(event.date || event.startDate || "")}
              </span>
            </div>
            <div className="flex items-center gap-[4px]">
              <Icon icon={Pin} width={17} height={17} color="#9E9E9E" />
              <span className="text-xs text-gray-6 leading-5">
                {event.location}
              </span>
            </div>
          </div>

          {/* 설명 (2줄 말줄임) */}
          <p className="text-xs font-medium text-gray-5A leading-5 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* 화살표 버튼 */}
        <button
          onClick={handleCardClick}
          className="absolute top-[25px] right-[13px] w-6 h-6 flex items-center justify-center hover:bg-gray-1 rounded transition-colors"
          aria-label="행사 상세 보기"
        >
          <Icon icon={ArrowRight} color="#424242" size={16} />
        </button>
      </div>
    </div>
  );
};
