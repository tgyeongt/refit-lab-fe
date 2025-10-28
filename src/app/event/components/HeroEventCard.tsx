import Image from "next/image";
import { cn, styles } from "@/app/event/libs/event-styles";
import { MockEvent } from "@/app/event/types/event";
import { ArrowRight } from "@/shared/components/icons/ArrowRight";
import { Pin } from "@/shared/components/icons/Pin";

interface HeroEventCardProps {
  event: MockEvent;
}

export default function HeroEventCard({ event }: HeroEventCardProps) {
  return (
    <div className={cn(styles.component.card, styles.color.white, "h-[420px]")}>
      {/* 배경 이미지 + 그라데이션 오버레이 */}
      <div className={styles.layout.absoluteInset}>
        <Image
          src={"/image/21party.svg"}
          alt={event.title}
          width={361}
          height={361}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />
      </div>

      {/* 우측 상단 자세히 버튼 */}
      <button className={styles.position.heroBackButton}>
        <ArrowRight color={"white"} className="w-[19px] h-full" />
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
          <Pin color="white" width={17.48} height={17.48} />
          <span className={styles.text.description}>{event.location}</span>
        </div>
        {/* 행사 설명 */}
        <span className={cn(styles.text.description, "line-clamp-2")}>
          {event.description}
        </span>
      </div>
      {/* 예약하기 버튼 */}
      <button
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
}
