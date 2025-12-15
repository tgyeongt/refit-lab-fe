import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEY } from "@/shared/constants/key";
import { MyPageUser } from "@/app/my/(types)/my";
import { useShallow } from "zustand/react/shallow";

// 인증 상태 타입
interface AuthState {
  accessToken: string | null;
  user: MyPageUser | null;
  isLoggedIn: boolean;
  hydrated: boolean;
}

// 인증 액션 타입
interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setUser: (user: MyPageUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

// 인증 스토어 타입
interface AuthStore extends AuthState {
  actions: AuthActions;
}

// 인증 스토어
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
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
        setIsLoggedIn: (isLoggedIn) =>
          set((state) => ({
            ...state,
            isLoggedIn,
          })),
        logout: () => {
          // 기존 accessToken 키 정리 (하위 호환성)
          if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY.accessToken);
          }
          set({
            accessToken: null,
            user: null,
            isLoggedIn: false,
            hydrated: true,
          });
        },
      },
    }),
    {
      name: STORAGE_KEY.authStore,
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (useAuthStore.getState().hydrated) return;

        useAuthStore.setState({
          hydrated: true,
          isLoggedIn: !!state?.accessToken,
        });
      },
    }
  )
);

// 인증 정보 훅
export const useAuthInfo = () => {
  return useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      hydrated: state.hydrated,
    }))
  );
};

// 인증 액션 훅
export const useAuthActions = () => {
  return useAuthStore((state) => state.actions);
};

export const useAuth = () => {
  const authInfo = useAuthInfo();
  const authActions = useAuthActions();

  return {
    ...authInfo,
    ...authActions,
  };
};
