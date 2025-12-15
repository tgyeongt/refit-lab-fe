"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BoardSelector from "./(component)/BoardSelector";
import ImageSelector from "./(component)/ImageSelector";
import CloseIcon from "@/assets/icon/close.svg";
import BackIcon from "@/assets/icon/arrow-left.svg";

import { postNewPost } from "../(api)/postNewPost";
import { useAuth } from "@/shared/stores/useAuthStore";

export default function PostPage() {
  const router = useRouter();
  const { accessToken } = useAuth();

  const [board, setBoard] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const isActive = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async () => {
    if (!accessToken) return alert("로그인이 필요합니다.");
    if (!board) return alert("게시판을 선택해주세요.");

    try {
      const result = await postNewPost(
        {
          postCategory: board,
          title,
          content,
          imageList: images,
        },
        accessToken
      );

      console.log("게시글 등록 완료:", result);
      alert("게시글이 등록되었습니다!");
      router.back();
    } catch (err: any) {
      console.error("게시글 등록 실패:", err.message);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {/* ✅ 로컬 헤더 */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <button onClick={() => router.back()}>
          <BackIcon width={24} height={24} />
        </button>

        <span className="text-[16px] font-medium">커뮤니티 글쓰기</span>

        <button
          onClick={handleSubmit}
          disabled={!isActive}
          className={`text-[16px] font-medium transition
            ${isActive ? "text-[#642C8D]" : "text-[#BDBDBD]"}
          `}
        >
          올리기
        </button>
      </header>

      {/* 본문 */}
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
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute top-2 right-2 z-10 bg-black/50 text-white
                    w-[30px] h-[30px] rounded-full flex items-center justify-center"
                >
                  <CloseIcon width={14} height={14} />
                </button>

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

        {/* 이미지 선택 */}
        <ImageSelector
          onSelectImages={(files) => setImages((prev) => [...prev, ...files])}
        />
      </div>
    </>
  );
}
