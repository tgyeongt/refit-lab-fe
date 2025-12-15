import type {
  AdminDashboardData,
  ChartDataPoint,
  PopularPage,
  QuickAccessCard,
} from "@/shared/types/admin";

// 차트 데이터
export const CHART_DATA_MOCK: ChartDataPoint[] = [
  { date: "09", value: 1200 },
  { date: "10", value: 1800 },
  { date: "11", value: 1500 },
  { date: "12", value: 2200 },
  { date: "13", value: 1900 },
  { date: "14", value: 2400 },
  { date: "15", value: 2000 },
];

// 인기 페이지 데이터
export const POPULAR_PAGES_MOCK: PopularPage[] = [
  { path: "/event/4", activeUsers: 11 },
  { path: "/event/1", activeUsers: 11 },
  { path: "/event/2", activeUsers: 11 },
  { path: "/event/3", activeUsers: 11 },
];

// 빠른 접근 카드 데이터
export const QUICK_ACCESS_CARDS_MOCK: QuickAccessCard[] = [
  {
    id: "party-management",
    title: "행사 등록 및\n 예약 관리",
    description: "새로운 행사를 등록하고 \n참가자 예약을 관리합니다",
    status: "12개 진행중",
    icon: "party",
    link: "/admin_dashboard/party_reservation",
  },
  {
    id: "exchange-status",
    title: "교환 현황",
    description: "새로운 행사를 등록하고 \n참가자 예약을 관리합니다",
    status: "8개 활성화",
    icon: "tag",
    link: "#",
  },
  {
    id: "checkin-status",
    title: "QR 기반\n체크인 현황",
    description: "실시간 체크인 현황을 \n조회하고 관리합니다",
    status: "12개 체크인",
    icon: "qr",
    link: "#",
  },
  {
    id: "community-management",
    title: "커뮤니티 관리",
    description: "커뮤니티 사용자와 게시글을\n관리합니다",
    status: "12개 리포트",
    icon: "community",
    link: "#",
  },
];

// 전체 대시보드 데이터
export const ADMIN_DASHBOARD_DATA_MOCK: AdminDashboardData = {
  currentActiveUsers: 30,
  totalUsers: 2000,
  totalExchanges: 2000,
  usersChange: 0.2,
  exchangesChange: 0.2,
  chartData: CHART_DATA_MOCK,
  popularPages: POPULAR_PAGES_MOCK,
  quickAccessCards: QUICK_ACCESS_CARDS_MOCK,
};
