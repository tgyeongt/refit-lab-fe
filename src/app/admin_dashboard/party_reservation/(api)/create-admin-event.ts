import { privateAPI } from "@/shared/api/apiInstance";
import type { BaseResponse } from "@/shared/api/BaseResponse";

// [관리자] 행사 생성 - POST /api/events/admin (multipart/form-data)
export const createAdminEvent = async (formData: FormData): Promise<BaseResponse<any>> => {
  const response = await privateAPI.post<BaseResponse<any>>(
    "/events/admin",
    formData,
    {
      headers: {
        // 브라우저에서 FormData 사용 시 Content-Type은 자동 설정되므로 생략 가능하지만,
        // 명시적으로 지정해도 무방함
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


