"use client";

import { useRouter } from "next/navigation";
import { postNewPost } from "@/app/community/(api)/postNewPost";

const categoryMap: Record<string, string> = {
  "자유 질문": "FREE",
  "수선 꿀팁": "REPAIR",
  "정보 공유": "INFO",
};

interface SubmitPostParams {
  board: string | null;
  title: string;
  content: string;
  images: File[];
}

export function usePostSubmit() {
  const router = useRouter();

  const submitPost = async ({
    board,
    title,
    content,
    images,
  }: SubmitPostParams) => {
    if (!board) {
      throw new Error("게시판을 선택해주세요.");
    }

    const postCategory = categoryMap[board];
    if (!postCategory) {
      throw new Error("유효하지 않은 게시판입니다.");
    }

    await postNewPost({
      postCategory,
      title,
      content,
      imageList: images,
    });

    router.back();
  };

  return { submitPost };
}
