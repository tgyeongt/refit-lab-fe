"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CloseIcon from "@/assets/icon/close.svg";

interface ExchangeBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

type FormState = {
  photo: File | null;
  title: string;
  category: string;
  size: string;
  condition: string;
  wantCategory: string;
  wantSize: string;
  spot: string;
  description: string;
};

export default function ExchangeBottomSheet({
  open,
  onClose,
}: ExchangeBottomSheetProps) {
  const [form, setForm] = useState<FormState>({
    photo: null,
    title: "",
    category: "",
    size: "",
    condition: "",
    wantCategory: "",
    wantSize: "",
    spot: "",
    description: "",
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () =>
    setForm({
      photo: null,
      title: "",
      category: "",
      size: "",
      condition: "",
      wantCategory: "",
      wantSize: "",
      spot: "",
      description: "",
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    update("photo", files && files.length > 0 ? files[0] : null);
  };

  const handleSubmit = () => {
    console.log("submit form:", form);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[90]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl px-[25px] py-[20px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-[25px] border-b border-[#E5E7EB] pb-[20px]">
              <span className="text-[16px] font-medium">교환 아이템 등록</span>
              <button onClick={onClose}>
                <CloseIcon width={14} />
              </button>
            </div>

            {/* 사진 */}
            <div className="mb-4">
              <p className="text-[14px] mb-2">사진</p>

              <label
                htmlFor="photo-upload"
                className="
      w-full h-[200px]
      border border-[#D1D5DC] rounded-[10px]
      flex items-center justify-center
      overflow-hidden cursor-pointer
    "
              >
                {!form.photo && (
                  <div className="flex flex-col text-center ">
                    <p className="text-[12px] text-[#9E9E9E]">
                      클릭하여 사진 업로드
                    </p>
                    <p className="text-[12px] text-[#9E9E9E]">
                      PNG, JPG (최대 10MB)
                    </p>
                  </div>
                )}

                {form.photo && (
                  <Image
                    src={URL.createObjectURL(form.photo)}
                    alt="preview"
                    width={500}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                )}
              </label>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* 제목 */}
            <div className="mb-[20px]">
              <p className="text-[14px] mb-1">제목 *</p>
              <input
                className="w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 appearance-none outline-none"
                placeholder="아이템 제목 입력"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>

            {/* 카테고리 & 사이즈 */}
            <div className="flex gap-3 mb-[20px] w-full">
              <div className="flex-1">
                <p className="text-[14px] mb-1">카테고리 *</p>
                <select
                  className="
                    w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 
                    appearance-none outline-none
                    bg-[url('/icons/arrow-down.svg')] bg-no-repeat bg-right-3 bg-center
                  "
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="top">상의</option>
                  <option value="bottom">하의</option>
                  <option value="outer">아우터</option>
                  <option value="shoes">신발</option>
                </select>
              </div>

              <div className="flex-1">
                <p className="text-[14px] mb-1">사이즈 *</p>
                <input
                  className="w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 appearance-none outline-none"
                  placeholder="예: M, 95, 28"
                  value={form.size}
                  onChange={(e) => update("size", e.target.value)}
                />
              </div>
            </div>

            {/* 상태 */}
            <div className="mb-[20px] border-b border-[#E5E7EB] pb-[20px]">
              <p className="mb-2">상태 *</p>

              <div className="flex gap-2">
                {["상", "중", "하"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("condition", c)}
                    className={`
          flex-1 px-4 py-2 rounded-[10px] text-center
          ${
            form.condition === c
              ? "bg-[#642C8D] text-white"
              : "bg-white border border-[#D1D5DC]"
          }
        `}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[16px] font-medium mb-6">교환 희망 아이템</p>
            </div>

            {/* 희망 카테고리 & 사이즈 */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <p className="text-[14px] mb-1">희망 카테고리 *</p>
                <select
                  className="
                    w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 
                    appearance-none outline-none
                    bg-[url('/icons/arrow-down.svg')] bg-no-repeat bg-right-3 bg-center
                  "
                  value={form.wantCategory}
                  onChange={(e) => update("wantCategory", e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="top">상의</option>
                  <option value="bottom">하의</option>
                  <option value="outer">아우터</option>
                  <option value="shoes">신발</option>
                </select>
              </div>

              <div className="flex-1">
                <p className="text-[14px] mb-1">희망 사이즈 *</p>
                <input
                  className="w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 appearance-none outline-none"
                  placeholder="예: M, 95, 28"
                  value={form.wantSize}
                  onChange={(e) => update("wantSize", e.target.value)}
                />
              </div>
            </div>

            {/* 교환 스팟 */}
            <div className="mb-4">
              <p className="text-[14px] mb-1">교환 스팟 *</p>
              <input
                className="w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 appearance-none outline-none"
                placeholder="예: 강남역 3번 출구"
                value={form.spot}
                onChange={(e) => update("spot", e.target.value)}
              />
            </div>

            {/* 상세 설명 */}
            <div className="mb-6">
              <p className="text-[14px] mb-1">상세 설명 (선택)</p>
              <textarea
                className="w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 h-24 appearance-none outline-none"
                placeholder="상세 설명을 입력하세요"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-between gap-[12px] mt-6">
              <button
                type="button"
                onClick={reset}
                className="flex-1 border border-[#D1D5DC] px-4 py-2 rounded-[10px] text-[#0A0A0A]"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-[#642C8D] text-white px-6 py-2 rounded-[10px]"
              >
                등록하기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
