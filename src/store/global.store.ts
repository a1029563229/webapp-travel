import Taro from "@tarojs/taro";
import { defineStore } from "pinia";

const useGlobalStore = defineStore<
  string, {
  shop: any;
  city: string;
}>('global', {
  state: () => ({
    shop: null,
    city: Taro.getStorageSync('city') || '深圳',
  }),

  actions: {
    setShop(shop: any) {
      this.shop = shop;
    },

    setCity(city: string) {
      this.city = city;
      Taro.setStorageSync('city', city);
    }
  }
});

export default useGlobalStore;