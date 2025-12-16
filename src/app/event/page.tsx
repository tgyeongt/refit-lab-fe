"use client";

import { HeroEventCard } from "@/app/event/(component)/HeroEventCard";
import { EventList } from "@/app/event/(component)/EventList";
import { cn, styles } from "@/app/event/(util)/event-styles";
import { useEventsGroup } from "@/app/event/(hook)/query/useEventsGroup";
import {
  ScheduledEvent,
  EndedEvent,
  UpcomingEvent,
} from "@/app/event/types/event";

export default function PartyEventsPage() {
  const { data: eventsGroup, isLoading, error } = useEventsGroup();

  const upcomingEventData: UpcomingEvent | null = eventsGroup?.upcoming ?? null;
  const scheduledEvent: ScheduledEvent | null = eventsGroup?.scheduled ?? null;
  const endedEvent: EndedEvent | null = eventsGroup?.ended ?? null;

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
        {upcomingEventData ? (
          <>
            <HeroEventCard event={upcomingEventData} />

            {/* 히어로 카드 하단 설명 */}
            <p
              className={cn(
                styles.layout.px7,
                styles.color.white,
                styles.text.bodySm
              )}
            >
              {upcomingEventData.description}
            </p>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base">예정된 행사가 없습니다.</p>
          </div>
        )}
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
      {!isLoading && (
        <EventList
          event={scheduledEvent ?? undefined}
          title="예정된 행사"
          moreHref="/event/upcoming"
        />
      )}

      {/* 종료된 행사 섹션 */}
      {!isLoading && (
        <EventList
          event={endedEvent ?? undefined}
          title="종료된 행사"
          moreHref="/event/ended"
        />
      )}
    </main>
  );
}
