import { ApiGetUserInfo, ApiLogin, ApiUpdateUserInfo } from "@/apis";
import { useUserStore } from "@/store";
import Taro from "@tarojs/taro"

export type UserInfo = {
  nickname: string;
  avatar: string;
}

export const logout = () => {
  const user = useUserStore();
  user.clearToken();
}

export const login = async () => {
  const user = useUserStore();
  if (user.token) {
    getUserInfo();
    return;
  }

  const { code } = await Taro.login();
  const data = await ApiLogin({ code });
  user.setToken(data);
  getUserInfo();
}

export const getUserInfo = async () => {
  const user = useUserStore();
  const userInfo = await ApiGetUserInfo();
  user.setRole(userInfo.role);
  user.setInfo(userInfo);
}

export const updateUserInfo = async (userInfo: UserInfo) => {
  return ApiUpdateUserInfo(userInfo);
}