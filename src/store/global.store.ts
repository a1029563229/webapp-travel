import { defineStore } from "pinia";

const useGlobalStore = defineStore<
  string, {
  shop: any
}>('global', {
  state: () => ({
    shop: null
  }),

  actions: {
    setShop(shop: any) {
      this.shop = shop;
    }
  }
});

export default useGlobalStore;