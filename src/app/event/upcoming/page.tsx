"use client";

import { useEffect } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { cn, styles } from "@/app/event/(util)/event-styles";
import { EventCard } from "@/app/event/(component)/EventCard";
import { useUpcomingEvents } from "@/app/event/(hook)/query/useUpcomingEvents";

export default function UpcomingEventsPage() {
  useHeader({ title: "예정된 행사", showBack: true, showMenu: true });

  const { data: events = [], isLoading, error } = useUpcomingEvents();

  // 페이지 로드 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className={cn(
        styles.color.bgWhite,
        "w-full",
        "min-h-screen",
        "pt-[10px]"
      )}
    >
      <section className={styles.layout.px4}>
        <div className={cn(styles.layout.flexBetween, styles.layout.mb5)}></div>

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base">
              예정된 행사를 불러오는 중입니다...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base">
              예정된 행사를 불러오는데 실패했습니다.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base">예정된 행사가 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <EventCard key={event.eventId} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
