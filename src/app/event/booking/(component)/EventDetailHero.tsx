"use client";

import Image from "next/image";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { EventDetail } from "../(util)/event-detail";

interface EventDetailHeroProps {
  eventDetail: EventDetail;
  onDetailClick: () => void;
}

export const EventDetailHero = ({
  eventDetail,
  onDetailClick,
}: EventDetailHeroProps) => {
  return (
    <section className="relative w-full rounded-t-lg">
      {/* 히어로 이미지 */}
      <div className={bookingStyles.component.imageContainer}>
        <Image
          src={eventDetail.thumbnailUrl || "/image/21party.svg"}
          alt={eventDetail.title}
          width={361}
          height={361}
          className="w-full h-[361px] object-cover"
          priority
        />
        <div
          className={cn(
            bookingStyles.component.participantBanner,
            "absolute",
            "bottom-0",
            "left-0",
            "z-10"
          )}
        >
          <span
            className={cn(
              bookingStyles.text.buttonText,
              bookingStyles.color.textPurple
            )}
          >
            🔥현재까지 {eventDetail.info.participantCapacity || "0명"}이
            참가했어요!
          </span>
        </div>
      </div>
      {/* 콘텐츠 영역 */}
      <div
        className={cn(
          bookingStyles.layout.flexCol,
          bookingStyles.layout.mb30px,
          bookingStyles.layout.mx25px
        )}
      >
        {/* 제목 */}
        <h1
          className={cn(
            bookingStyles.text.heroTitle,
            bookingStyles.color.textPurple,
            bookingStyles.layout.mb20px,
            "mt-[30px]"
          )}
        >
          {eventDetail.title}
        </h1>
        {/* 설명 */}
        <p
          className={cn(
            bookingStyles.text.body,
            bookingStyles.color.textSecondary,
            bookingStyles.layout.mb20px
          )}
        >
          {eventDetail.description}
        </p>

        {/* 자세히 알아보기 버튼 */}
        <div className={cn("flex justify-end")}>
          <button
            onClick={onDetailClick}
            className={bookingStyles.component.buttonSmall}
            type="button"
          >
            <span className={bookingStyles.layout.flexCenter}>
              자세히 알아보기
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
