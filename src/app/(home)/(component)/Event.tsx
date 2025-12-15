"use client";

import { EventCard } from "@/app/event/(component)/EventCard";
import { useEventsGroup } from "@/app/event/(hook)/query/useEventsGroup";

export default function Event() {
  const { data: eventsGroup, isLoading } = useEventsGroup();

  const scheduledEvent = eventsGroup?.scheduled;

  if (isLoading) {
    return (
      <div className="px-[15px] flex items-center justify-center h-[150px]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!scheduledEvent) {
    return null;
  }

  return (
    <div className="px-[15px]">
      <EventCard event={scheduledEvent} />
    </div>
  );
}
