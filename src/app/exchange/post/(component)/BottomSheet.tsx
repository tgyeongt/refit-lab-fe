"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  disabled?: boolean;
  children: ReactNode;
}

export default function BottomSheet({
  open,
  onClose,
  onConfirm,
  title,
  disabled,
  children,
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-[20px] py-[15px] border-b border-[#9E9E9E]">
              <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto mb-4" />
              {title && <p className="text-[18px] font-medium">{title}</p>}
            </div>

            <div className="p-[20px]">{children}</div>

            <div className="p-[20px]">
              <button
                disabled={disabled}
                onClick={onConfirm}
                className={`w-full py-[15px] rounded-[8px] transition
                  ${
                    disabled
                      ? "bg-[#BDBDBD] text-white"
                      : "bg-[#642C8D] text-white"
                  }
                `}
              >
                완료
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
