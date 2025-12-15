"use client";

const tabs = ["전체", "자유 질문", "수선 꿀팁", "정보 공유"] as const;

interface FilterBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FilterBar({ activeTab, setActiveTab }: FilterBarProps) {
  return (
    <div className="flex justify-center py-4 border-b border-[#EEEEEE]">
      <div className="flex gap-[10px]">
        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <button
              onClick={() => setActiveTab(tab)}
              className={`px-[15px] py-[4px] rounded-full text-[14px] font-medium cursor-pointer transition-colors
                ${
                  activeTab === tab
                    ? "bg-[#642C8D] text-white"
                    : " border border-[#E0E0E0]"
                }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
