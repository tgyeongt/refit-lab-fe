"use client";

import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import { ProfileSection } from "./(component)/ProfileSection";
import { MembershipBadge } from "./(component)/MembershipBadge";
import { TicketBadge } from "./(component)/TicketBadge";
import { StatsCard } from "./(component)/StatsCard";
import { MenuSection } from "./(component)/MenuSection";
import { mypageStyles } from "./(util)/mypage-styles";
import { useMyPage } from "./(hook)/query/useMyPage";
import { myPageMenu } from "./(util)/dummyData";

export default function MyPage() {
  const router = useRouter();
  useHeader({ title: "", showBack: true, showMenu: true });

  // 마이페이지 데이터 조회
  const { data: myPageData, isLoading, error } = useMyPage();

  // 로딩 상태
  if (isLoading) {
    return (
      <main className={mypageStyles.layout.container}>
        <div className="flex items-center justify-center h-screen">
          <p>로딩 중...</p>
        </div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className={mypageStyles.layout.container}>
        <div className="flex items-center justify-center h-screen">
          <p>데이터를 불러오는데 실패했습니다.</p>
        </div>
      </main>
    );
  }

  // API 데이터 또는 기본값
  const userData = myPageData?.data;
  const userName = userData?.user?.nickname || "사용자";
  const userProfile =
    userData?.user?.profileImageUrl || "/images/default-profile.jpg";
  const exchangeCount = userData?.exchangeCount || 0;
  const carbonReduction = userData?.totalReducedCarbonG || 0;
  const ticketCount = 0; // 티켓 개수는 별도 API 필요
  const membershipLevel = "bronze"; // 멤버십 레벨은 별도 로직 필요

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
        router.push("/my/party-history");
        break;
      case "experience-posts":
        router.push("/my/experience-posts");
        break;
      default:
        break;
    }
  };

  return (
    <main className={mypageStyles.layout.container}>
      {/* 프로필 섹션 */}
      <div className="w-full max-w-[393px]">
        <ProfileSection userName={userName} userProfile={userProfile} />
      </div>

      {/* 멤버십 및 티켓 배지 */}
      <div className={mypageStyles.badges.container}>
        <div className={mypageStyles.badges.wrapper}>
          <div className={mypageStyles.badges.membership}>
            <MembershipBadge level={membershipLevel} />
          </div>
          <div className={mypageStyles.badges.divider} />
          <TicketBadge count={ticketCount} onClick={handleTicketClick} />
        </div>
      </div>

      {/* 통계 카드 */}
      <div className={mypageStyles.stats.container}>
        <StatsCard
          exchangeCount={exchangeCount}
          carbonReduction={carbonReduction}
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
