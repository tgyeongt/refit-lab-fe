"use client";

export const TABS = ["아우터", "상의", "하의", "신발", "액세사리"] as const;
export type RecommendTab = (typeof TABS)[number];

interface FilterBarProps {
  activeTab: RecommendTab;
  setActiveTab: (tab: RecommendTab) => void;
}

export default function FilterBar({ activeTab, setActiveTab }: FilterBarProps) {
  return (
    <div className="flex justify-center py-[25px]">
      <div className="flex gap-[10px]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-[15px] py-[4px] rounded-full text-[14px] font-medium transition-colors
              ${
                activeTab === tab
                  ? "bg-[#642C8D] text-white"
                  : "border border-[#E0E0E0] text-[#424242]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
