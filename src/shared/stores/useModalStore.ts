import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

// 모달 타입
type ModalType = "profile" | "party-gallery" | null;

// 모달 액션
interface ModalAction {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

// 모달 상태
interface ModalState {
  isOpen: boolean;
  type: ModalType;
  actions: ModalAction;
}

// 모달 스토어
export const useModalStore = create<ModalState>()(
  immer((set) => {
    return {
      isOpen: false,
      type: null,
      actions: {
        openModal: (type) => {
          set((state) => {
            state.isOpen = true;
            state.type = type;
          });
        },
        closeModal: () => {
          set((state) => {
            state.isOpen = false;
            state.type = null;
          });
        },
      },
    };
  })
);

// 모달 정보 훅
export const useModalInfo = () => {
  return useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      type: state.type,
    }))
  );
};

// 모달 액션 훅
export const useModalActions = () => {
  return useModalStore((state) => state.actions);
};
