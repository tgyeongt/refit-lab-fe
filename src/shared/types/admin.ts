/**
 * 관리자 대시보드 타입 정의
 */

// 통계 카드 데이터
export interface AdminStat {
  label: string;
  value: number | string;
  change?: number; // 변화율 (%)
  trend?: "up" | "down"; // 증가/감소 트렌드
}

// 차트 데이터 포인트
export interface ChartDataPoint {
  date: string; // "12월 09", "09", etc.
  value: number;
}

// 인기 페이지 데이터
export interface PopularPage {
  path: string; // "/웹사이트 링크"
  activeUsers: number;
}

// 빠른 접근 카드 데이터
export interface QuickAccessCard {
  id: string;
  title: string;
  description: string;
  status: string; // "12개 진행중", "8개 활성화" etc.
  icon: string; // 아이콘 이름
  link: string; // 이동할 경로
}

// 대시보드 전체 데이터
export interface AdminDashboardData {
  currentActiveUsers: number;
  totalUsers: number;
  totalExchanges: number;
  usersChange: number;
  exchangesChange: number;
  chartData: ChartDataPoint[];
  popularPages: PopularPage[];
  quickAccessCards: QuickAccessCard[];
}
