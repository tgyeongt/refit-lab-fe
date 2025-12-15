import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseMyPage } from "../(types)/my";

// 마이페이지 홈 조회 (GET /api/my)
export const getMyPage = async (): Promise<ResponseMyPage> => {
  try {
    const { data } = await privateAPI.get<ResponseMyPage>("/my");
    return data;
  } catch (error) {
    console.error("마이페이지 조회 실패:", error);
    throw error;
  }
};


