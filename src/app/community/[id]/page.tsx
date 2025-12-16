"use client";

import { useQuery } from "@tanstack/react-query";
import useHeader from "@/shared/hooks/useHeader";
import { useHeaderStore } from "@/shared/stores/headerStore";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionSection from "./(component)/QuestionSection";
import AnswerSection from "./(component)/AnswerSection";
import { getPostById, CommunityPost } from "../(api)/getPostById";
import { useAuth } from "@/shared/stores/useAuthStore";
import { deletePost } from "../(api)/deletePost";

export default function CommunityDetailPage() {
  useHeader({ showBack: true, showMenu: false });

  const { id } = useParams();
  const postId = Number(id);
  const router = useRouter();

  const { accessToken, isLoggedIn, hydrated } = useAuth();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<CommunityPost>({
    queryKey: ["communityPost", postId, accessToken],
    queryFn: () => {
      if (!isLoggedIn || !accessToken) throw new Error("로그인이 필요합니다.");
      return getPostById(postId, accessToken);
    },
    enabled: hydrated && isLoggedIn,
  });

  useEffect(() => {
    if (!post) return;

    useHeaderStore.getState().setHeader({
      isAuthor: post.isAuthor,
      showBack: true,
      showMenu: false,
      onEdit: () => console.log("수정"),
      onDelete: async () => {
        try {
          if (!confirm("정말 삭제하시겠습니까?")) return;

          await deletePost(post.postId);
          alert("게시글이 삭제되었습니다.");
          router.push("/community");
        } catch (error: any) {
          console.error(error);
          alert("게시글 삭제에 실패했습니다.");
        }
      },
    });
  }, [post]);

  if (!hydrated) return <p className="text-center mt-10">데이터 준비 중...</p>;
  if (!isLoggedIn)
    return <p className="text-center mt-10">로그인이 필요합니다.</p>;
  if (isLoading) return <p className="text-center mt-10">로딩중...</p>;
  if (isError)
    return <p className="text-center mt-10">데이터를 불러오지 못했습니다.</p>;
  if (!post)
    return (
      <div className="p-6 text-center text-gray-500">
        해당 게시글을 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="p-4">
      <QuestionSection post={post} />
      {post.commentIdList.length > 0 && <AnswerSection postId={post.postId} />}
    </div>
  );
}
