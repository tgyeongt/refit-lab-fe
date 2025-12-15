"use client";

import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { EventDetail } from "@/app/event/types/event";
import { formatDateRange } from "@/shared/util/formatDate";

interface EventInfoCardProps {
  eventDetail: EventDetail;
}

export const EventInfoCard = ({ eventDetail }: EventInfoCardProps) => {
  return (
    <div className={bookingStyles.component.infoCard}>
      <h2
        className={cn(
          bookingStyles.text.sectionTitle,
          "mb-[15px]",
          bookingStyles.color.textPrimary
        )}
      >
        행사 정보
      </h2>
      <div className={bookingStyles.layout.flexCol}>
        <InfoRow
          label="날짜"
          value={formatDateRange(eventDetail.startDate, eventDetail.endDate)}
        />
        <InfoRow label="장소" value={eventDetail.location} />
        {eventDetail.capacity != null && (
          <InfoRow
            label="참여 정원"
            value={`${eventDetail.totalReservedCount}/${eventDetail.capacity}명`}
          />
        )}
        <InfoRow
          label="누적 교환 의류수"
          value={`${eventDetail.totalReservedCount}벌`}
        />
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
      <span>{label}:</span> <span className="font-semibold">{value}</span>
    </div>
  );
};
