import { cn, styles } from '@/app/event/(util)/event-styles';
import { MockEvent } from '@/app/event/types/event';
import { ArrowRight } from '@/shared/components/icons/ArrowRight';
import { Calendar } from '@/shared/components/icons/Calendar';
import { Pin } from '@/shared/components/icons/Pin';
import Image from 'next/image';

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
          src="/image/mockEventImg.jpg"
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 우측 상단 화살표 버튼들 */}
      <button className={styles.position.cardArrow}>
        <ArrowRight color="#424242" />
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
            <Calendar color="#9E9E9E" className="translate-y-px" />
            <span className={cn(styles.color.gray400, styles.text.bodyXs)}>
              {event.date}
            </span>
          </div>

          {/* 위치 정보 */}
          <div
            className={cn(styles.component.iconGroupSmall, styles.layout.mb3)}
          >
            <Pin
              color="#9E9E9E"
              width={17}
              height={17}
              className="translate-y-[1.5px]"
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
