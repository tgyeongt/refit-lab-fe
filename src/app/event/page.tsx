import events from "@/app/event/(util)/events.json";
import { HeroEventCard } from "@/app/event/(component)/HeroEventCard";
import { EventList } from "@/app/event/(component)/EventList";
import { cn, styles } from "@/app/event/(util)/event-styles";

export default function PartyEventsPage() {
  const { upcomingEvent, scheduledEvents, endedEvents } = events;

  return (
    <main
      className={cn(
        "w-[393px]",
        "min-h-screen",
        styles.color.bgWhite,
        "pt-[10px]"
      )}
    >
      {/* 다가오는 행사 섹션 */}
      <section className={styles.layout.px4}>
        <div className={cn(styles.layout.flexBetween, styles.layout.mb5)}>
          <h2 className={cn(styles.color.black, styles.text.sectionTitle)}>
            다가오는 행사
          </h2>
        </div>
        <HeroEventCard event={upcomingEvent} />

        {/* 히어로 카드 하단 설명 */}
        <p
          className={cn(
            styles.layout.px7,
            styles.color.white,
            styles.text.bodySm
          )}
        >
          {upcomingEvent.description}
        </p>
      </section>

      {/* 예정된 행사 섹션 */}
      <EventList event={scheduledEvents} title="예정된 행사" />

      {/* 종료된 행사 섹션 */}
      <EventList event={endedEvents} title="종료된 행사" />
    </main>
  );
}
