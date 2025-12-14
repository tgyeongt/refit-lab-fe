"use client";

const tabs = ["아우터", "상의", "하의", "신발", "액세서리"] as const;

interface FilterBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FilterBar({ activeTab, setActiveTab }: FilterBarProps) {
  return (
    <div className="flex justify-center py-[25px]">
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
