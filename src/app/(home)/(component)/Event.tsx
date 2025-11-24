"use client";

import { EventCard } from "@/app/event/(component)/EventCard";
import events from "@/app/event/(util)/events.json";

export default function Event() {
  const { scheduledEvents } = events;
  return (
    <div className="px-[15px]">
      <EventCard event={scheduledEvents} />
    </div>
  );
}
