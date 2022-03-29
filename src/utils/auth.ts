import { ApiGetUserInfo, ApiLogin } from "@/apis";
import { useUserStore } from "@/store";
import Taro from "@tarojs/taro"

export const login = async () => {
  const user = useUserStore();

  if (user.token) {
    getUserInfo();
    return;
  }
  const { code } = await Taro.login();
  const data = await ApiLogin({ code });
  user.setToken(data);
}

export const getUserInfo = async () => {
  const user = useUserStore();
  const userInfo = await ApiGetUserInfo({ token: user.token });
  user.setRole(userInfo.role);
}