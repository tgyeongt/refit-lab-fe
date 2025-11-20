import { publicAPI } from "@/shared/api/apiInstance";

export const testLogin = async () => {
  const response = await publicAPI.post("/auths/test-login");
  return response.data;
};
