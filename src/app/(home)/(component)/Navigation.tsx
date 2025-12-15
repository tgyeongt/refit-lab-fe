"use client";

interface NavigationProps {
  sections: {
    label: string;
    targetId: string;
  }[];
}

export default function Navigation({ sections }: NavigationProps) {
  const handleMove = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="w-full flex justify-around pt-[30px]">
      {sections.map((item) => (
        <button
          key={item.targetId}
          onClick={() => handleMove(item.targetId)}
          className="text-[18px] font-medium text-[#757575]"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
