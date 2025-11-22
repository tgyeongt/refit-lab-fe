"use client";

import Icon from "@/shared/components/Icon";
import DiamondIcon from "@/assets/icon/diamond.svg";
import { mypageStyles } from "../(util)/mypage-styles";

interface MembershipBadgeProps {
  level: string;
}

export const MembershipBadge = ({ level }: MembershipBadgeProps) => {
  return (
    <>
      <Icon icon={DiamondIcon} color="#642C8D" width={19} height={16.5} />
      <span className={mypageStyles.badges.membershipText}>{level}</span>
    </>
  );
};
