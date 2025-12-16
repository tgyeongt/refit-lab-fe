import { privateAPI } from "@/shared/api/apiInstance";
import type { BaseResponse } from "@/shared/api/BaseResponse";

// [관리자] 행사 삭제 - DELETE /api/events/admin/{id}
export const deleteAdminEvent = async (
  id: string
): Promise<BaseResponse<{}>> => {
  const response = await privateAPI.delete<BaseResponse<{}>>(
    `/events/admin/${id}`
  );
  return response.data;
};
