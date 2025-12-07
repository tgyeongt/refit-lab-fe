import { useQuery } from "@tanstack/react-query";
import { ADMIN_DASHBOARD_DATA_MOCK } from "@/shared/mocks/admin-dashboard-mock";
import type { AdminDashboardData } from "@/shared/types/admin";

/**
 * Mock 데이터 fetch 함수
 * 실제 API 연동 시 privateAPI.get("/admin/dashboard")로 교체
 */
const fetchAdminDashboardData = async (): Promise<AdminDashboardData> => {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Promise.resolve(ADMIN_DASHBOARD_DATA_MOCK);
};

/**
 * 관리자 대시보드 데이터 조회 훅
 */
export const useAdminDashboardQuery = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchAdminDashboardData,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

