'use client';

import Image from 'next/image';
import { bookingStyles } from '@/app/event/booking/(util)/booking-styles';
import { cn } from '@/app/event/(util)/event-styles';
import { ArrowRight } from '@/shared/components/icons/ArrowRight';
import { EventDetail } from '../(util)/event-detail';

interface EventDetailHeroProps {
  eventDetail: EventDetail;
  onDetailClick: () => void;
}

export const EventDetailHero = ({
  eventDetail,
  onDetailClick,
}: EventDetailHeroProps) => {
  return (
    <section className="relative w-full">
      {/* 히어로 이미지 */}
      <div className={bookingStyles.component.imageContainer}>
        <Image
          src={eventDetail.thumbnailUrl || '/image/21party.svg'}
          alt={eventDetail.title}
          width={361}
          height={361}
          className="w-full h-[361px] object-cover rounded-t-lg"
          priority
        />
      </div>
      {/* 콘텐츠 영역 */}
      <div className={bookingStyles.layout.flexCol}>
        {/* 제목 */}
        <h1
          className={cn(
            bookingStyles.text.heroTitle,
            'mt-[42px]',
            'ml-[42px]',
            'mb-[40px]',
            bookingStyles.color.textPurple
          )}
        >
          {eventDetail.title}
        </h1>
        {/* 설명 */}
        <p
          className={cn(
            bookingStyles.text.body,
            'ml-[42px]',
            'mr-[41px]',
            'mb-[94px]',
            'min-h-[180px]',
            bookingStyles.color.textSecondary
          )}
        >
          {eventDetail.description}
        </p>

        {/* 자세히 알아보기 버튼 */}
        <div className="flex justify-end pr-[229px] pb-[122px]">
          <button
            onClick={onDetailClick}
            className={bookingStyles.component.buttonSmall}
            type="button"
          >
            <span className={bookingStyles.layout.flexCenter}>
              <ArrowRight color="#642C8D" className="mr-1" />
              자세히 알아보기
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
