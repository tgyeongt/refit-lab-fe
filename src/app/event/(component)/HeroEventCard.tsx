"use client";

import Image from "next/image";
import { cn, styles } from "@/app/event/(util)/event-styles";
import { MockEvent } from "@/app/event/types/event";
import Icon from "@/shared/components/Icon";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import Pin from "@/assets/icon/pin.svg";
import { useRouter } from "next/navigation";

interface HeroEventCardProps {
  event: MockEvent;
}

export const HeroEventCard = ({ event }: HeroEventCardProps) => {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/event/booking`);
  };

  return (
    <div className={cn(styles.component.card, styles.color.white, "h-[420px]")}>
      {/* 배경 이미지 + 그라데이션 오버레이 */}
      <div className={styles.layout.absoluteInset}>
        <Image
          src={"/image/21party.svg"}
          alt={event.title}
          fill
          priority
          className="pb-14.5"
        />
        <div className={styles.color.gradientOverlay} />
      </div>

      {/* 우측 상단 자세히 버튼 */}
      <button className={styles.position.heroDetailButton}>
        <Icon icon={ArrowRight} color="white" size={21} />
      </button>

      {/* 컨텐츠 영역 */}
      <div className={cn(styles.layout.p7, styles.position.heroContent)}>
        {/* D-Day 뱃지 */}
        {event.dDay !== undefined && (
          <div
            className={cn(
              styles.component.badge,
              styles.color.bgRed,
              styles.layout.mb4
            )}
          >
            <span className={styles.text.badge}>D-{event.dDay}</span>
          </div>
        )}

        {/* 행사 제목 */}
        <h2 className={cn(styles.text.heroTitle, styles.layout.mb3)}>
          {event.title}
        </h2>

        {/* 위치 정보 */}
        <div className={cn(styles.component.iconGroup, styles.layout.mb2)}>
          <Icon icon={Pin} color="white" size={17.48} />
          <span className={styles.text.description}>{event.location}</span>
        </div>
        {/* 행사 설명 */}
        <span className={cn(styles.text.description, "line-clamp-2")}>
          {event.description}
        </span>
      </div>
      {/* 예약하기 버튼 */}
      <button
        onClick={handleDetailClick}
        type="button"
        className={cn(
          styles.layout.absoluteBottom,
          styles.component.buttonCTA,
          styles.color.bgPurple
        )}
      >
        <span className={styles.text.button}>예약하기</span>
      </button>
    </div>
  );
};
