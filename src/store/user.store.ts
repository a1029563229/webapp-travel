import Taro from "@tarojs/taro";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: () => ({
    location: {
      longitude: +(Taro.getStorageSync('longitude') || 0),
      latitude: +(Taro.getStorageSync('latitude') || 0),
    },
    info: null,
    token: Taro.getStorageSync('token') || '',
    role: 0
  }),

  getters: {
    longitude: (state) => state.location.longitude,
    latitude: (state) => state.location.latitude,
  },

  actions: {
    async setLocation() {
      const location = await Taro.getLocation({ type: "gcj02" });
      this.location.longitude = location.longitude;
      this.location.latitude = location.latitude;
      Taro.setStorageSync('longitude', location.longitude);
      Taro.setStorageSync('latitude', location.latitude);
    },

    setInfo(info: any) {
      this.info = {
        ...(this.info || {}),
        ...info
      }
    },

    setRole(role: number) {
      this.role = role;
    },

    setToken(token: string) {
      console.log({ token });
      this.token = token;
      Taro.setStorageSync('token', token);
    }
  }
});

export default useUserStore;