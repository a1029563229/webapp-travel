<script setup lang="ts">
import { ref } from 'vue';
import Taro from "@tarojs/taro";
import { ApiMapSearch } from "@/apis";
import Mapper from "@/components/mapper/index.vue";
import { useUserStore, useGlobalStore } from "@/store";

Taro.setNavigationBarTitle({ title: '定位店铺' });

// 搜索相关
const user = useUserStore();
const keywords = ref('');
const markers = ref([]);
const currentShopIndex = ref(0);
const currentShop = ref<{
  name?: string;
  address?: string;
  distance?: string;
  longitude: number;
  latitude: number;
}>({
  longitude: 0,
  latitude: 0
});
const onSearch = async () => {
  const data = await ApiMapSearch({
    longitude: user.longitude,
    latitude: user.latitude,
    keywords: keywords.value,
    city: '深圳'
  });
  if (data.length > 0) {
    markers.value = data.map(item => ({
      ...item,
      longitude: item.longitude,
      latitude: item.latitude,
      iconPath: "https://jk-box.oss-cn-shanghai.aliyuncs.com/84dddf44-f177-4e85-81f6-8c621e636fd8/6b12fbb21970f3694d4731ca4e00c592.png",
      width: 30,
      height: 30
    }));
    currentShopIndex.value = 0;
    currentShop.value = data[0];
  } else {
    currentShopIndex.value = 0;
    currentShop.value = {
      longitude: 0,
      latitude: 0
    }
  }
}

const prevOrNext = (addOrDesc: number) => {
  const index = currentShopIndex.value + addOrDesc;
  currentShopIndex.value = index;
  currentShop.value = markers.value[currentShopIndex.value];
}

const globalStore = useGlobalStore();
const confirm = () => {
  globalStore.setShop(currentShop.value);
  Taro.navigateBack();
}
</script>

<template>
  <view class="map-container">
    <nut-searchbar v-model="keywords" @search="onSearch">
      <template v-slot:rightout>
        <view @click="onSearch">搜索</view>
      </template>
    </nut-searchbar>
    <suspense>
      <template #default>
        <Mapper 
          :markers="markers" 
          :longitude="currentShop.longitude" 
          :latitude="currentShop.latitude" />
      </template>
    </suspense>
    <view class="shop-card" v-if="currentShop.name">
      <view class="shop-title">{{currentShop.name}}</view>
      <view class="shop-address">{{currentShop.address}}</view>
      <view class="shop-distance">距离：{{currentShop.distance || '-'}}</view>
      <view class="btn-group">
        <nut-button class="btn-item" type="default" @click="prevOrNext(-1)" :disabled="currentShopIndex === 0">上一家</nut-button>
        <nut-button class="btn-item" type="default" @click="prevOrNext(1)" :disabled="currentShopIndex === markers.length - 1">下一家</nut-button>
        <nut-button class="btn-item btn-primary" type="primary" @click="confirm">确定</nut-button>
      </view>
    </view>
  </view>
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

.map-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  #map {
    width: 100vw;
    height: 100vh;
    z-index: 10;
    position: relative;
  }
  .shop-card {
    position: absolute;
    left: 0;
    width: 94vw;
    margin: 0 3vw;
    bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    padding: 15px;
    z-index: 20;
    box-sizing: border-box;
    .shop-title {
      font-size: 16px;
      font-weight: bold;
    }
    .shop-address, .shop-distance {
      font-size: 14px;
      color: @gray;
      margin-top: 5px;
    }
    .btn-group {
      margin-top: 15px;
      .flex-between;
      .btn-item {
        width: 30%;
      }
      .nut-button--default {
        border-color: @shanhuzhu;
        color: @shanhuzhu;
      }
    }
  }
}
</style>