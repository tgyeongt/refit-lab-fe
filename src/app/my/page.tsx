"use client";

import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import { ProfileSection } from "./(component)/ProfileSection";
import { MembershipBadge } from "./(component)/MembershipBadge";
import { TicketBadge } from "./(component)/TicketBadge";
import { StatsCard } from "./(component)/StatsCard";
import { MenuSection } from "./(component)/MenuSection";
import { mypageStyles } from "./(util)/mypage-styles";
import { myPageUser, myPageMenu } from "./(util)/dummyData";

export default function MyPage() {
  const router = useRouter();
  useHeader({ title: "", showBack: true, showMenu: true });

  // 보유 티켓 클릭 핸들러
  const handleTicketClick = () => {
    router.push("/my/tickets");
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = (id: string) => {
    switch (id) {
      case "exchange-history":
        console.log("교환 내역 클릭");
        break;
      case "receipt-history":
        console.log("환경영수증 발급 내역 클릭");
        break;
      case "party-history":
        console.log("참가한 21% 파티 클릭");
        break;
      case "experience-posts":
        console.log("내 경험 공유 글 클릭");
        break;
      default:
        break;
    }
  };

  return (
    <main className={mypageStyles.layout.container}>
      {/* 프로필 섹션 */}
      <div className="w-full max-w-[393px]">
        <ProfileSection
          userName={myPageUser.userName}
          userProfile={myPageUser.userProfile}
        />
      </div>

      {/* 멤버십 및 티켓 배지 */}
      <div className={mypageStyles.badges.container}>
        <div className={mypageStyles.badges.wrapper}>
          <div className={mypageStyles.badges.membership}>
            <MembershipBadge level={myPageUser.membershipLevel} />
          </div>
          <div className={mypageStyles.badges.divider} />
          <TicketBadge
            count={myPageUser.ticketCount}
            onClick={handleTicketClick}
          />
        </div>
      </div>

      {/* 통계 카드 */}
      <div className={mypageStyles.stats.container}>
        <StatsCard
          exchangeCount={myPageUser.exchangeCount}
          carbonReduction={myPageUser.carbonReduction}
        />
      </div>

      {/* 나의 교환 섹션 */}
      <div className={mypageStyles.menu.container}>
        <MenuSection
          title="나의 교환"
          items={myPageMenu.exchange}
          onItemClick={handleMenuClick}
        />
      </div>

      {/* 나의 활동 섹션 */}
      <div className={mypageStyles.menu.container}>
        <MenuSection
          title="나의 활동"
          items={myPageMenu.activity}
          onItemClick={handleMenuClick}
        />
      </div>
    </main>
  );
}
