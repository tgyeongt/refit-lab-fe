import { privateAPI } from "@/shared/api/apiInstance";

export const testLogin = async () => {
  const response = await privateAPI.post("/auths/test-login");
  return response.data;
};
