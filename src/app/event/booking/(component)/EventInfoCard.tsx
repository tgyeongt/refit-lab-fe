'use client';

import { bookingStyles } from '@/app/event/booking/(util)/booking-styles';
import { cn } from '@/app/event/(util)/event-styles';
import { EventDetail } from '../(util)/event-detail';

interface EventInfoCardProps {
  eventDetail: EventDetail;
}

export const EventInfoCard = ({ eventDetail }: EventInfoCardProps) => {
  return (
    <div className={bookingStyles.component.infoCard}>
      <h2
        className={cn(
          bookingStyles.text.sectionTitle,
          'mb-[15px]',
          bookingStyles.color.textPrimary
        )}
      >
        행사 정보
      </h2>
      <div className={bookingStyles.layout.flexCol}>
        <InfoRow label="날짜" value={eventDetail.date} />
        <InfoRow label="장소" value={eventDetail.location} />
        <InfoRow
          label="참여 정원"
          value={eventDetail.info.participantCapacity}
        />
        <InfoRow
          label="누적 교환 의류수"
          value={eventDetail.info.totalClothesExchanged}
        />
        {eventDetail.info.recycledItems && (
          <InfoRow label="재활용품" value={eventDetail.info.recycledItems} />
        )}
      </div>
    </div>
  );
};

// 행사 상세 정보 뷰 컴포넌트
const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      className={cn(bookingStyles.text.body, bookingStyles.color.textPrimary)}
    >
      <span className="font-medium">{label}:</span> <span>{value}</span>
    </div>
  );
};
