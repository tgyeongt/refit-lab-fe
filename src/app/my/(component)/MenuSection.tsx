"use client";

import Icon from "@/shared/components/Icon";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import { mypageStyles } from "../(util)/mypage-styles";
import { MenuItem } from "../(util)/dummyData";

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemClick?: (id: string) => void;
}

export const MenuSection = ({
  title,
  items,
  onItemClick,
}: MenuSectionProps) => {
  return (
    <div className={mypageStyles.menu.section}>
      {/* 섹션 제목 */}
      <h3 className={mypageStyles.menu.title}>{title}</h3>

      {/* 메뉴 아이템들 */}
      <div className="flex flex-col">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={mypageStyles.menu.item}
          >
            <div className="flex items-center gap-2">
              <Icon icon={item.icon} color="#141414" width={20} height={20} />
              <span className={mypageStyles.menu.itemText}>{item.label}</span>
            </div>
            <Icon icon={ArrowRight} color="#757575" width={10} height={20} />
          </button>
        ))}
      </div>
    </div>
  );
};
