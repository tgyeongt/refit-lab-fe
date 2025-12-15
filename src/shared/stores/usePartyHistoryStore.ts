import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import { persist } from "zustand/middleware";
import { Event } from "@/app/event/types/event";
import { STORAGE_KEY } from "@/shared/constants/key";

// 참가한 행사 액션
interface PartyHistoryAction {
  addReservedEvent: (event: Event) => void;
  removeReservedEvent: (eventId: number) => void;
  clearReservedEvents: () => void;
}

// 참가한 행사 상태
interface PartyHistoryState {
  reservedEvents: Event[];
  actions: PartyHistoryAction;
}

// 참가한 행사 스토어
export const usePartyHistoryStore = create<PartyHistoryState>()(
  persist(
    immer((set) => {
      return {
        reservedEvents: [],
        actions: {
          addReservedEvent: (event) => {
            set((state) => {
              // 중복 체크
              const exists = state.reservedEvents.some(
                (e) => e.eventId === event.eventId
              );
              if (!exists) {
                state.reservedEvents.push(event);
              }
            });
          },
          removeReservedEvent: (eventId) => {
            set((state) => {
              state.reservedEvents = state.reservedEvents.filter(
                (e) => e.eventId !== eventId
              );
            });
          },
          clearReservedEvents: () => {
            set((state) => {
              state.reservedEvents = [];
            });
          },
        },
      };
    }),
    {
      name: STORAGE_KEY.partyHistory,
      partialize: (state) => ({ reservedEvents: state.reservedEvents }),
    }
  )
);

// 참가한 행사 정보 훅
export const usePartyHistoryInfo = () => {
  return usePartyHistoryStore(
    useShallow((state) => ({
      reservedEvents: state.reservedEvents,
    }))
  );
};

// 참가한 행사 액션 훅
export const usePartyHistoryActions = () => {
  return usePartyHistoryStore((state) => state.actions);
};
