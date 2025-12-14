import { cn, styles } from "@/app/event/(util)/event-styles";
import { Event, ScheduledEvent, EndedEvent } from "@/app/event/types/event";
import { EventCard } from "./EventCard";

interface EventListProps {
  event: ScheduledEvent | EndedEvent;
  title: string;
}

export const EventList = ({ event, title }: EventListProps) => {
  if (!event) return null;

  // EventCard에 바로 전달 (Event 타입 호환)
  const convertedEvent: Event = event;

  return (
    <section className={cn("w-full", styles.layout.mb8, "px-4")}>
      {/* 섹션 헤더 */}
      <div className={cn(styles.layout.flexBetween, styles.layout.mb5)}>
        <h2 className={cn(styles.text.sectionTitle, styles.color.black)}>
          {title}
        </h2>
        <button
          className={cn(
            styles.text.bodySm,
            styles.color.gray400,
            styles.component.button
          )}
        >
          더보기
        </button>
      </div>

      {/* 이벤트 카드 */}
      <div className="flex flex-col gap-4">
        <EventCard event={convertedEvent} />
      </div>
    </section>
  );
};
