import Link from "next/link";
import { cn, styles } from "@/app/event/(util)/event-styles";
import { Event, ScheduledEvent, EndedEvent } from "@/app/event/types/event";
import { EventCard } from "./EventCard";

interface EventListProps {
  event?: ScheduledEvent | EndedEvent | null;
  title: string;
  moreHref: string;
}

export const EventList = ({ event, title, moreHref }: EventListProps) => {
  // EventCard에 바로 전달 (Event 타입 호환)
  const convertedEvent: Event | null = event ? event : null;

  return (
    <section className={cn("w-full", styles.layout.mb8, "px-4")}>
      {/* 섹션 헤더 */}
      <div className={cn(styles.layout.flexBetween, styles.layout.mb5)}>
        <h2 className={cn(styles.text.sectionTitle, styles.color.black)}>
          {title}
        </h2>
        <Link
          href={moreHref}
          className={cn(
            styles.text.bodySm,
            styles.color.gray400,
            styles.component.button
          )}
        >
          더보기
        </Link>
      </div>

      {/* 이벤트 카드 또는 비어 있는 상태 */}
      {convertedEvent ? (
        <div className="flex flex-col gap-4">
          <EventCard event={convertedEvent} />
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-base">
            {title === "예정된 행사"
              ? "예정된 행사가 없습니다."
              : "종료된 행사가 없습니다."}
          </p>
        </div>
      )}
    </section>
  );
};
