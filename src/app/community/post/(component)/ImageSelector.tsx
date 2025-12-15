"use client";

import { useRef } from "react";
import ImageIcon from "@/assets/icon/image.svg";

interface Props {
  onSelectImages: (files: File[]) => void;
}

export default function ImageSelector({ onSelectImages }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onSelectImages(files);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-4 flex">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 text-[16px]"
        >
          <ImageIcon />
          <span>사진</span>
        </button>
      </div>
    </>
  );
}
