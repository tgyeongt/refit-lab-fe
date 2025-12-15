"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORAGE_KEY } from "@/shared/constants/key";
import type { MyPageUser } from "@/app/my/(types)/my";
import { useShallow } from "zustand/react/shallow";

interface AuthState {
  accessToken: string | null;
  user: MyPageUser | null;
  isLoggedIn: boolean;
  hydrated: boolean;
}

interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setUser: (user: MyPageUser | null) => void;
  logout: () => void;
  _setHydrated: (v: boolean) => void;
}

interface AuthStore extends AuthState {
  actions: AuthActions;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      hydrated: false,

      actions: {
        setAccessToken: (token) =>
          set((state) => ({
            ...state,
            accessToken: token,
            isLoggedIn: !!token,
          })),

        setUser: (user) =>
          set((state) => ({
            ...state,
            user,
          })),

        logout: () => {
          set({
            accessToken: null,
            user: null,
            isLoggedIn: false,
            hydrated: true,
          });

          useAuthStore.persist?.clearStorage?.();

          if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY.legacyAccessToken);
          }
        },

        _setHydrated: (v) =>
          set((state) => ({
            ...state,
            hydrated: v,
          })),
      },
    }),
    {
      name: STORAGE_KEY.authStore,
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,

      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("[authStore] rehydrate 실패:", error);
          return;
        }

        // (옵션) 예전 localStorage accessToken 마이그레이션
        if (typeof window !== "undefined") {
          const legacy = localStorage.getItem(STORAGE_KEY.legacyAccessToken);
          if (!state?.accessToken && legacy) {
            state?.actions.setAccessToken(legacy);
            localStorage.removeItem(STORAGE_KEY.legacyAccessToken);
          } else {
            // isLoggedIn 파생값 정리 (토큰 그대로 다시 셋해도 OK)
            state?.actions.setAccessToken(state?.accessToken ?? null);
          }
        } else {
          state?.actions.setAccessToken(state?.accessToken ?? null);
        }

        state?.actions._setHydrated(true);
      },
    }
  )
);

// 인증 상태 정보 훅
export const useAuthInfo = () =>
  useAuthStore(
    useShallow((s) => ({
      accessToken: s.accessToken,
      user: s.user,
      isLoggedIn: s.isLoggedIn,
      hydrated: s.hydrated,
    }))
  );

// 인증 상태 액션 훅
export const useAuthActions = () => useAuthStore((s) => s.actions);

// 인증 상태 훅
export const useAuth = () => {
  const info = useAuthInfo(); // 인증 상태 정보 훅
  const actions = useAuthActions(); // 인증 상태 액션 훅
  return { ...info, ...actions }; // 인증 상태 정보와 액션 훅을 합쳐서 반환
};
