"use client";

import Image from "next/image";
import { useState } from "react";
import LikeIcon from "@/assets/icon/like.svg";
import Profile from "@/assets/image/user-profile.png";
import CommentIcon from "@/assets/icon/comment.svg";
import CommentInputBar from "./CommentInputBar";
import { CommunityPost } from "../../(api)/getPostById";
import { useAuth } from "@/shared/stores/useAuthStore";
import { togglePostLike } from "../../(api)/togglePostLike";
import { createComment } from "../../(api)/createComment";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";

interface QuestionSectionProps {
  post: CommunityPost;
}

export default function QuestionSection({ post }: QuestionSectionProps) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const timeAgoText = useTimeAgo(post.createdAt);

  const { accessToken } = useAuth();

  const handleLike = async () => {
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      const result = await togglePostLike(post.postId, accessToken);
      setIsLiked(result);
      setLikes((prev) => (result ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
      alert("좋아요 요청 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitReply = async (text: string, parentCommentId?: number) => {
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      await createComment(post.postId, text, accessToken, parentCommentId);
      setIsReplyOpen(false);
      // TODO: 댓글 리스트 갱신
    } catch (err) {
      console.error(err);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };
  console.log(post);

  return (
    <section className="border-b-6 border-[#EEEEEE] pb-4 relative">
      <div className="flex items-center mb-3 mt-[10px]">
        <Image
          src={post.profileImageUrl ? post.profileImageUrl : Profile}
          alt={post.nickname}
          width={35}
          height={35}
          className="rounded-full object-cover aspect-square"
        />
        <p className="text-[16px] font-medium ml-[8px] mr-[10px]">
          {post.nickname}
        </p>
        <p className="text-[14px] text-[#757575]">{timeAgoText}</p>
      </div>

      <div className="mb-3 px-[5px] pb-[20px]">
        <h2 className="text-[20px] font-semibold mb-2">{post.title}</h2>
        <p className="text-[16px] text-sm">{post.content}</p>
        {post.imageUrlList && post.imageUrlList.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {post.imageUrlList.map((url, idx) => (
              <div
                key={idx}
                className="relative flex flex-col w-full aspect-square"
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-[100px] text-sm text-[#9E9E9E]">
        <button
          onClick={handleLike}
          className="flex items-center gap-[3px] active:opacity-60"
        >
          <LikeIcon width={20} height={20} /> 좋아요 {likes}
        </button>

        <button
          onClick={() => setIsReplyOpen(true)}
          className="flex items-center gap-[4px] active:opacity-60"
        >
          <CommentIcon width={20} height={20} /> 댓글 {post.comments}
        </button>
      </div>

      {isReplyOpen && (
        <CommentInputBar
          onSubmit={(text) => handleSubmitReply(text)}
          onClose={() => setIsReplyOpen(false)}
        />
      )}
    </section>
  );
}
