"use client";

import CommunityCard from "./CommunityCard";
import { dataMap } from "../dummyData";

interface ContentProps {
  activeTab: string;
}

export default function Content({ activeTab }: ContentProps) {
  const contentList =
    activeTab === "전체"
      ? Object.values(dataMap).flat()
      : dataMap[activeTab] ?? [];

  return (
    <div>
      {contentList.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}

      {contentList.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-10">
          데이터를 불러올 수 없습니다.
        </div>
      )}
    </div>
  );
}
