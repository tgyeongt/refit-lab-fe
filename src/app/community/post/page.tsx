"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useHeaderStore } from "@/shared/stores/headerStore";
import BoardSelector from "./(component)/BoardSelector";
import ImageSelector from "./(component)/ImageSelector";
import CloseIcon from "@/assets/icon/close.svg";

export default function PostPage() {
  const { setHeader, setRightHeader } = useHeaderStore();

  const [board, setBoard] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [images, setImages] = useState<File[]>([]); // 이미지 목록

  const isActive = title.trim().length > 0 && content.trim().length > 0;

  useEffect(() => {
    setHeader({
      title: "커뮤니티 글쓰기",
      showBack: true,
      showMenu: false,
    });

    setRightHeader({
      text: "올리기",
      onClick: () =>
        console.log("게시물 등록", { board, title, content, images }),
      active: isActive,
    });

    return () => {
      setRightHeader(null);
    };
  }, [board, title, content, images, isActive, setHeader, setRightHeader]);

  return (
    <div className="p-4 pb-24 flex flex-col relative">
      {/* 게시판 선택 */}
      <BoardSelector value={board} onChange={setBoard} />

      {/* 제목 */}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 text-[20px] mt-[16px] font-semibold outline-none"
      />

      {/* 내용 */}
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="
          w-full h-48 
          p-2
          text-[16px]
          font-medium
          outline-none 
          resize-none 
          [appearance:none]
          [background:none]
          [border-radius:0]
        "
      />

      {/* 이미지 미리보기 */}
      {images.length > 0 && (
        <div className="mt-4 flex flex-col gap-4">
          {images.map((file, idx) => (
            <div
              key={idx}
              className="relative w-full h-[350px] overflow-hidden"
            >
              {/* 삭제 버튼 */}
              <button
                onClick={() =>
                  setImages((prev) => prev.filter((_, i) => i !== idx))
                }
                className="absolute top-2 right-2 z-10 bg-black/50 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center"
              >
                <CloseIcon width={14} height={14} color="white" />
              </button>

              {/* 이미지 */}
              <Image
                src={URL.createObjectURL(file)}
                alt={`uploaded-image-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 이미지 선택 버튼 */}
      <ImageSelector
        onSelectImages={(files) => setImages((prev) => [...prev, ...files])}
      />
    </div>
  );
}
