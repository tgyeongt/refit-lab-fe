"use client";

import { useRouter } from "next/navigation";
import { CommunityPost } from "@/app/community/dummyData";
import Image from "next/image";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";
import Icon from "@/shared/components/Icon";

// CommunityPost 타입 확장 (썸네일 추가)
interface MyPostCardProps {
  post: CommunityPost & { thumbnailUrl?: string };
}

// 내 경험 공유글 카드 컴포넌트 (Figma 디자인 기반)
export const MyPostCard = ({ post }: MyPostCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/community/${post.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 컨텐츠 영역 */}
      <div className="p-[17px]">
        {/* 전체 컨텐츠 (태그 + 제목 + 설명 vs 이미지) */}
        <div className="flex gap-4">
          {/* 왼쪽: 태그 & 제목 & 설명 */}
          <div className="flex-1 min-w-0">
            {/* 태그 */}
            <div className="inline-flex items-center justify-center bg-[#EEEEEE] text-purple text-[10px] font-medium px-3 py-[5.6px] rounded-[4px] mb-[11px]">
              {post.tag}
            </div>

            {/* 제목 */}
            <p className="text-lg font-medium text-black leading-5 mb-[9px] truncate">
              {post.title}
            </p>

            {/* 설명 */}
            <p className="text-[15px] font-medium text-gray-7 leading-5 mb-[9px] truncate">
              {post.description}
            </p>
          </div>

          {/* 오른쪽: 썸네일 이미지 (있을 경우만, 수직 중앙 정렬) */}
          {post.thumbnailUrl && (
            <div className="flex items-center shrink-0">
              <div className="w-20 h-20 rounded-[10px] overflow-hidden border border-[#EEEEEE]">
                <Image
                  src={post.thumbnailUrl}
                  alt={post.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* 하단: 시간, 좋아요, 댓글 */}
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-7 leading-5">{post.time}</span>
          <div className="flex gap-[10px]">
            <span className="flex items-center gap-[3px] text-[13px] text-gray-6">
              <Icon icon={LikeIcon} width={20} height={20} /> {post.likes}
            </span>
            <span className="flex items-center gap-[4px] text-[13px] text-gray-6">
              <Icon icon={CommentIcon} width={20} height={20} />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
