"use client";

import { HeroEventCard } from "@/app/event/(component)/HeroEventCard";
import { EventList } from "@/app/event/(component)/EventList";
import { cn, styles } from "@/app/event/(util)/event-styles";
import { useEventsGroup } from "@/app/event/(hook)/query/useEventsGroup";
import { ScheduledEvent, EndedEvent } from "@/app/event/types/event";
import events from "@/app/event/(util)/events.json";

export default function PartyEventsPage() {
  const { upcomingEvent, scheduledEvents, endedEvents } = events;
  const { data: eventsGroup, isLoading, error } = useEventsGroup();

  // Mock 데이터를 API 타입으로 변환
  const mockScheduledEvent: ScheduledEvent = {
    eventId: parseInt(scheduledEvents.id),
    thumbnailUrl: scheduledEvents.thumbnailUrl,
    name: scheduledEvents.title,
    description: scheduledEvents.description,
    location: scheduledEvents.location,
    date: scheduledEvents.date,
    dday: 0,
  };

  const mockEndedEvent: EndedEvent = {
    eventId: parseInt(endedEvents.id),
    thumbnailUrl: endedEvents.thumbnailUrl,
    name: endedEvents.title,
    description: endedEvents.description,
    location: endedEvents.location,
    date: endedEvents.date,
    dday: 0,
  };

  // API 데이터가 null이면 mock 데이터 사용
  const scheduledEvent = eventsGroup?.scheduled || mockScheduledEvent;
  const endedEvent = eventsGroup?.ended || mockEndedEvent;

  return (
    <main
      className={cn(
        styles.color.bgWhite,
        "w-full",
        "min-h-screen",
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

      {/* 로딩 중 */}
      {isLoading && (
        <div className="text-center py-10">
          <p>로딩 중...</p>
        </div>
      )}

      {/* 에러 */}
      {error && (
        <div className="text-center py-10">
          <p>행사를 불러오는데 실패했습니다.</p>
        </div>
      )}

      {/* 예정된 행사 섹션 */}
      {!isLoading && <EventList event={scheduledEvent} title="예정된 행사" />}

      {/* 종료된 행사 섹션 */}
      {!isLoading && <EventList event={endedEvent} title="종료된 행사" />}
    </main>
  );
}
