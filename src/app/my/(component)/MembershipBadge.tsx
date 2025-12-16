"use client";

import Icon from "@/shared/components/Icon";
import DiamondIcon from "@/assets/icon/diamond.svg";
import { mypageStyles } from "../(util)/mypage-styles";

export const MembershipBadge = () => {
  return (
    <>
      <Icon icon={DiamondIcon} color="#642C8D" width={19} height={16.5} />
      <span className={mypageStyles.badges.membershipText}>멤버쉽</span>
    </>
  );
};
