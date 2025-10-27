import { cn, styles } from "@/app/event/libs/event-styles";
import { MockEvent } from "@/app/event/types/event";
import EventCard from "./EventCard";
interface EventListProps {
  event: MockEvent;
  title: string;
  showMoreLink?: boolean;
}

export default function EventList({
  event,
  title,
  showMoreLink = true,
}: EventListProps) {
  return (
    <section className={cn("w-full", styles.layout.mb8, "px-4")}>
      {/* 섹션 헤더 */}
      <div className={cn(styles.layout.flexBetween, styles.layout.mb5)}>
        <h2 className={cn(styles.text.sectionTitle, styles.color.black)}>
          {title}
        </h2>
        {showMoreLink && (
          <button
            className={cn(
              styles.text.bodySm,
              styles.color.gray400,
              styles.component.button
            )}
          >
            더보기
          </button>
        )}
      </div>

      {/* 이벤트 카드 리스트 */}
      <div className="flex flex-col">
        <EventCard event={event} />
      </div>
    </section>
  );
}
