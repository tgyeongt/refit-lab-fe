"use client";

import { cn, styles } from "@/app/event/(util)/event-styles";
import { Event } from "@/app/event/types/event";
import Icon from "@/shared/components/Icon";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import Calendar from "@/assets/icon/calendar.svg";
import Pin from "@/assets/icon/pin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/event/booking/${event.eventId}`);
  };

  return (
    <div
      className={cn(
        styles.component.cardSmall,
        styles.color.bgCard,
        styles.layout.shadowMd
      )}
    >
      {/* 썸네일 이미지 */}
      <div className={styles.component.thumbnailSmall}>
        <Image
          src={event.thumbnailUrl || "/image/mockEventImg.jpg"}
          alt={event.name}
          width={155}
          height={155}
          className="object-cover"
        />
      </div>

      {/* 우측 상단 화살표 버튼들 */}
      <button className={styles.position.cardArrow} onClick={handleCardClick}>
        <Icon icon={ArrowRight} color="#424242" size={16} />
      </button>

      {/* 텍스트 컨텐츠 */}
      <div className={styles.position.cardContent}>
        {/* 제목 */}
        <h3
          className={cn(
            styles.text.cardTitleMedium,
            styles.color.black,
            styles.layout.mb2
          )}
        >
          {event.name}
        </h3>

        <div className="flex gap-4">
          {/* 날짜 정보 */}
          <div className={cn(styles.component.iconGroup, styles.layout.mb3)}>
            <Icon icon={Calendar} color="#9E9E9E" size={17} />
            <span className={cn(styles.color.gray400, styles.text.bodyXs)}>
              {event.date}
            </span>
          </div>

          {/* 위치 정보 */}
          <div
            className={cn(styles.component.iconGroupSmall, styles.layout.mb3)}
          >
            <Icon icon={Pin} color="#9E9E9E" size={17} />
            <span className={cn(styles.color.gray400, styles.text.bodyXs)}>
              {event.location}
            </span>
          </div>
        </div>

        {/* 설명 */}
        <p
          className={cn(
            styles.color.gray600,
            styles.text.bodyXsMedium,
            styles.component.lineClamp2
          )}
        >
          {event.description}
        </p>
      </div>
    </div>
  );
};
