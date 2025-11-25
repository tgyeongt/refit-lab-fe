import CommunityCard from "@/app/community/(component)/CommunityCard";
import { dataMap } from "@/app/community/dummyData";

export default function Community() {
  const allPosts = Object.values(dataMap).flat();

  const topPosts = allPosts.sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="px-[15px]">
      {topPosts.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}

      {topPosts.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-10">
          불러올 커뮤니티 글이 없습니다.
        </div>
      )}
    </div>
  );
}
