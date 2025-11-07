"use client";

import useHeader from "@/shared/hooks/useHeader";
import { useParams } from "next/navigation";
import QuestionSection from "./QuestionSection";
import AnswerSection from "./AnswerSection";
import { dataMap } from "../dummyData";

export default function CommunityDetailPage() {
  useHeader({ showBack: true, showMenu: true });

  const { id } = useParams();
  const postId = Number(id);

  const allPosts = Object.values(dataMap).flat();
  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="p-6 text-center text-gray-500">
        해당 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="p-4">
      <QuestionSection post={post} />
      {post.commentList && post.commentList.length > 0 && (
        <AnswerSection comments={post.commentList} />
      )}
    </div>
  );
}
