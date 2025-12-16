import { privateAPI } from "@/shared/api/apiInstance";
import type { BaseResponse } from "@/shared/api/BaseResponse";

// [관리자] 행사 생성
export const createAdminEvent = async (
  formData: FormData
): Promise<BaseResponse<any>> => {
  const response = await privateAPI.post<BaseResponse<any>>(
    "/events/admin",
    formData
  );

  return response.data;
};
