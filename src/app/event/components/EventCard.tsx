import { cn, styles } from "@/libs/styles";
import { MockEvent } from "@/types/event";
import Image from "next/image";

interface EventCardProps {
  event: MockEvent;
}

export default function EventCard({ event }: EventCardProps) {
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
          src="/event/mockEventImg.jpg"
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 우측 상단 화살표 버튼들 */}
      <button className={styles.position.cardArrow}>
        <Image src="/icons/arrow-right.svg" alt="상세" width={10} height={7} />
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
          {event.title}
        </h3>

        <div className="flex gap-4">
          {/* 날짜 정보 */}
          <div className={cn(styles.component.iconGroup, styles.layout.mb3)}>
            <Image
              src="/icons/calendar.svg"
              alt="날짜"
              width={13.3}
              height={12.8}
            />
            <span className={cn(styles.text.bodyXs, styles.color.gray400)}>
              {event.date}
            </span>
          </div>

          {/* 위치 정보 */}
          <div
            className={cn(styles.component.iconGroupSmall, styles.layout.mb3)}
          >
            <Image
              src="/icons/pin-gray.svg"
              alt="위치"
              width={17}
              height={17}
            />
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
}
