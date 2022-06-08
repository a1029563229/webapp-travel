<script setup lang="ts">
import Taro, { useDidShow } from '@tarojs/taro';
import { computed, ref, watchEffect } from "vue";
import { getMap, Location } from "@/utils/map";
import { ApiGetShopList } from "@/apis";
import { useUserStore, useGlobalStore } from "@/store";

const map = getMap('shop');
const user = useUserStore();
await user.setLocation();

const userLocation = ref<Location>({ longitude: user.longitude, latitude: user.latitude });
const userRole = computed(() => user.role);

const typeList = ref([
  "全部",
  "吃",
  "喝",
  "玩",
  "乐"
])
const activeType = ref(0);
const selectType = (type: number) => {
  if (activeType.value === type) return;
  activeType.value = type;
}

// 店铺列表
const shopList = ref();
const global = useGlobalStore();
const getShopList = async () => {
  const data = await ApiGetShopList({
    ...userLocation.value,
    city: global.city,
    type: activeType.value,
    pageIndex: 1,
    pageSize: 999
  });
  shopList.value = data.list;
}
getShopList();
useDidShow(async () => {
  await user.setLocation();
  getShopList()
});
watchEffect(() => {
  getShopList();
})

const locationTo = (longitude: number, latitude: number, name: string) => {
  map.locateTo(longitude, latitude, name);
}

</script>

<template>
<view class="type-list">
  <view 
    :class="`type-item ${activeType === index && 'type-active-item'}`" 
    v-for="(item, index) in typeList"
    @click="selectType(index)">{{item}}</view>
</view>
<view class="shop-list flex-left">
  <view class="shop-item" v-for="item in shopList" @click="Taro.navigateTo({ url: `/pages/shop/detail?id=${item.id}` })">
    <view class="shop-poster-wrapper">
      <image class="shop-poster" :src="item.poster"></image>
    </view>
    <view class="shop-content">
      <view class="shop-name-wrapper">
        <view class="shop-name">{{item.name}}</view>
        <view :class="`type-tag type-tag-${item.type}`">{{typeList[item.type]}}</view>
      </view>
      <view class="shop-description">{{item.description}}</view>
      <view class="tag-wrapper">
        <view class="tag-item" v-for="tag in item.tags.slice(0, 2)">{{tag}}</view>
      </view>
      <view class="shop-footer">
        <view>人均：{{item.average_cost ? '￥' + item.average_cost : '-'}}</view>
        <view class="flex-left">
          <view>评分：</view>
          <view :class="`${item.score > 3.5 && 'high-score'}`">{{item.score || '-'}}</view>
        </view>
        <view class="distance-wrapper" @click.stop="locationTo(item.longitude, item.latitude, item.name)">
          <view>距离：{{item.distance || '-'}}</view>
          <view class="go-btn">Go</view>
        </view>
      </view>
    </view>
  </view>
  <view class="modify-wrapper" v-if="userRole === 99">
    <view class="modify-item" @click="Taro.navigateTo({ url: `/pages/shop/modify` })">增</view>
  </view>
</view>
<map id="shop" scale={10} style="display: none;" />
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

.type-list {
  .flex-left;
  padding-left: 10px;
  .type-item {
    padding: 3px 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
  .type-active-item {
    background: @shanchui;
    color: #fff;
  }
}
.shop-list {
  padding-left: 10px;
  .shop-item {
    width: 175px;
    box-shadow: 0px 2px 3px 1px #f5f5f5;
    border-radius: 3px;
    overflow: hidden;
    background: #fff;
    margin: 0;
    padding-bottom: 10px;
    margin-bottom: 15px;
    .shop-poster-wrapper {
      max-height: 250px;
      overflow: hidden;
      .shop-poster {
        width: 100%;
        height: 140px;
      }
    }
    .shop-content {
      box-sizing: border-box;
      padding: 0 10px;
    }
    .shop-name-wrapper {
      .flex-left;
      .shop-name {
        margin-right: 5px;
        font-weight: bold;
      }
      .type-tag {
        width: 18px;
        height: 18px;
        color: #fff;
        font-size: 12px;
        .flex-center;
        background-color: @shanchui;
      }
      .type-tag-1 {
        // background-color: rgba(255, 177, 27);
      }
    }
    .shop-description {
      color: rgba(120, 120, 120, 1);
      font-size: 12px;
      margin: 3px 0;
    }
    .tag-wrapper {
      margin-bottom: 10px;
      .flex-left;
      font-size: 12px;
      .tag-item {
        margin-right: 6px;
        margin-bottom: 3px;
        border-radius: 10px;
        background-color: @shanhuzhu;
        padding: 1px 6px;
        color: #fff;
      }
    }
    .shop-footer {
      font-size: 12px;
      margin-bottom: 5px;
      .distance-wrapper {
        .flex-left;
      }
      .go-btn {
        margin-left: 5px;
        font-size: 12px;
        color: #fff;
        background-color: @shanchui;
        padding: 2px 5px;
        border-radius: 20px;
        display: inline-block;
      }
      .high-score {
        color: @shanhuzhu;
        font-weight: bold;
      }
    }
  }
  .shop-item:nth-child(odd) {
    margin-right: 10px;
  }
  .modify-wrapper {
    position: fixed;
    bottom: 50px;
    right: 10px;
    .modify-item {
      .flex-center;
      margin-top: 10px;
      width: 40px;
      height: 40px;
      color: #fff;
      border-radius: 100%;
      font-size: 16px;
      background-color: @shanchui;
    }
  }
}


</style>
