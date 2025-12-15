"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/assets/icon/arrow-bottom.svg";

interface BoardSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
}

const BOARDS = [
  {
    title: "자유 질문",
    description:
      "교환 과정에서 생기는 다양한 궁금증과 고민들을 자유롭게 나눠요",
  },
  {
    title: "수선 꿀팁",
    description: "작게 고치고 살려내는 즐거움, 수선 이야기를 공유해요",
  },
  {
    title: "정보 공유",
    description:
      "지역 행사와 봉사 소식 등, 함께 알면 좋은 정보를 편하게 나눠요",
  },
];

export default function BoardSelector({ value, onChange }: BoardSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 선택 영역 */}
      <div
        className="flex justify-between items-center border-b border-[#BDBDBD] py-3 px-1 text-[20px] text-[#424242]"
        onClick={() => setOpen(true)}
      >
        {value ? (
          <span className="text-black">{value}</span>
        ) : (
          <div>
            <span className="text-[#424242]">게시판을 선택해주세요</span>
            <span className="text-[#E42938] ml-[5px]">*</span>
          </div>
        )}
        <ArrowIcon />
      </div>

      {/* 배경 Dim */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
          >
            <div className="w-[40px] h-[2px] bg-[#9E9E9E] mt-[15px] rounded-full mx-auto mb-4" />

            <h2 className="text-[14px] font-medium pb-6 border-b border-[#9E9E9E] text-center">
              게시판 선택
            </h2>

            <div className="flex flex-col px-[10px]">
              {BOARDS.map((item) => (
                <button
                  key={item.title}
                  className="py-4 text-left px-2"
                  onClick={() => {
                    onChange(item.title);
                    setOpen(false);
                  }}
                >
                  <div className="text-[15px]">{item.title}</div>
                  <div className="text-[13px] text-[#9E9E9E] mt-[1px]">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>

            <button
              className="w-full py-3 mt-4 text-center text-gray-500"
              onClick={() => setOpen(false)}
            >
              취소
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
