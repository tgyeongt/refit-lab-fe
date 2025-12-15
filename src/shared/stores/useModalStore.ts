import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

// 모달 타입
type ModalType = "profile" | "party-gallery" | "ticket-detail" | null;

// 모달 액션
interface ModalAction {
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

// 모달 상태
interface ModalState {
  isOpen: boolean;
  type: ModalType;
  modalData: any;
  actions: ModalAction;
}

// 모달 스토어
export const useModalStore = create<ModalState>()(
  immer((set) => {
    return {
      isOpen: false,
      type: null,
      modalData: null,
      actions: {
        openModal: (type, data) => {
          set((state) => {
            state.isOpen = true;
            state.type = type;
            state.modalData = data;
          });
        },
        closeModal: () => {
          set((state) => {
            state.isOpen = false;
            state.type = null;
            state.modalData = null;
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
      modalData: state.modalData,
    }))
  );
};

// 모달 액션 훅
export const useModalActions = () => {
  return useModalStore((state) => state.actions);
};
