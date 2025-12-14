"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Icon from "@/shared/components/Icon";
import XIcon from "@/assets/icon/X.svg";

interface FileUploaderProps {
  onChange: (file: File | null) => void;
}

// 파일 업로드 및 미리보기 컴포넌트
export const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일만 허용
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      onChange(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border border-gray-6 rounded-md bg-white">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-start gap-4 px-3.5 py-3">
        {/* 파일 선택 버튼 */}
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center justify-center bg-[#E0E0E0] px-2.5 py-1.5 text-gray-5A rounded text-base font-medium cursor-pointer hover:bg-gray-5 transition-colors"
        >
          파일 선택
        </button>

        {/* 미리보기 */}
        {preview && (
          <div className="relative w-[150px] h-[150px] border border-gray-6 rounded overflow-hidden">
            <Image
              src={preview}
              alt="썸네일 미리보기"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red/80 transition-colors"
            >
              <Icon icon={XIcon} width={16} height={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
