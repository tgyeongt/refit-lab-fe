import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseMyPage } from "../(types)/my";

// 마이페이지 홈 조회 (GET /my)
export const getMyPage = async (): Promise<ResponseMyPage> => {
  try {
    const { data } = await privateAPI.get<ResponseMyPage>("/my");
    return data;
  } catch (error: any) {
    console.error("[getMyPage] 마이페이지 조회 실패:", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    });
    throw error;
  }
};
