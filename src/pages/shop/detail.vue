<script setup lang="ts">
import { computed, ref } from "vue";
import Taro, { getCurrentInstance, useShareAppMessage } from '@tarojs/taro';
import { ApiGetShopDetail, ApiDeleteShop } from "@/apis";
import { useUserStore } from "@/store";
import { getMap } from "@/utils/map";

const map = getMap('map');

Taro.setNavigationBarTitle({ title: '店铺详情' });
const shopId = getCurrentInstance().router?.params.id || "32";

const detail = ref();
const getShopDetail = async () => {
  const user = useUserStore();
  detail.value = await ApiGetShopDetail({ id: shopId, longitude: user.longitude, latitude: user.latitude });
  Taro.setNavigationBarTitle({ title: detail.value.name });
}
getShopDetail();
useShareAppMessage(() => ({
  title: detail.value.name + (detail.value.tags[0] ? `（${detail.value.tags[0]}）` : ''),
  path: `/pages/shop/detail?id=${detail.value.id}`,
  imageUrl: detail.value.poster
}));

const deleteShop = () => {
  Taro.showModal({
    title: "确定要删除该条信息吗？",
    success: async () => {
      await ApiDeleteShop({ id: shopId });
      Taro.showToast({ title: "删除成功！" });
      Taro.navigateBack();
    }
  });
}

const typeList = ref([
  "吃",
  "喝",
  "玩",
  "乐"
]);

const user = useUserStore();
const userRole = computed(() => user.role);

const heightList: any[] = [];
const currentHeight = ref(0);
const onLoadImg = (imgDetail) => {
  const list = detail.value.banners || [];
  const { width, height } = imgDetail;
  const ratioHeight = (Taro.getSystemInfoSync().windowWidth / width) * height;
  heightList.push(ratioHeight);
  if (heightList.length === list.length) {
    currentHeight.value = Math.max.apply(null, heightList);
  }
}

const locationTo = (longitude: number, latitude: number, name: string) => {
  map.locateTo(longitude, latitude, name);
}

</script>
<template>
  <view class="shop-detail-container" v-if="detail">
    <nut-swiper 
      :init-page="0" 
      :pagination-visible="true" 
      pagination-color="#426543" 
      auto-play="3000"
      :style="currentHeight && `height:${currentHeight}px;`">
      <nut-swiper-item v-for="item in detail.banners">
        <image class="swiper-img-item" :src="item" alt="" mode="widthFix" @load="(e: any) => onLoadImg(e.detail)" />
      </nut-swiper-item>
    </nut-swiper>
    <view class="shop-content">
      <view class="shop-name-wrapper">
        <view class="shop-name">{{detail.name}}</view>
        <view :class="`type-tag type-tag-${detail.type}`">{{typeList[detail.type - 1]}}</view>
      </view>
      <view class="tag-wrapper">
        <view class="tag-item" v-for="tag in detail.tags.slice(0, 2)">{{tag}}</view>
      </view>
      <view class="shop-description">{{detail.description}}</view>
      <view class="shop-footer">
        <view class="cost-wrapper">人均：{{detail.average_cost ? '￥' + detail.average_cost : '-'}}</view>
        <view class="score-wrapper">
          <view class="score-label">评分：</view>
          <nut-rate active-color="rgba(255, 177, 27)" v-model="detail.score" allow-half disabled />
        </view>
        <view class="address-wrapper">
          地址：{{detail.address}}
        </view>
        <view class="distance-wrapper">
          <view>距离：{{detail.distance || '-'}}</view>
        </view>
      </view>
    </view>
    <view class="btn-footer">
      <nut-button class="btn-go" block type="primary" @click="locationTo(detail.longitude, detail.latitude, detail.name)">到这儿去</nut-button>
    </view>
    <view class="modify-wrapper" v-if="userRole === 99">
      <view class="modify-item" @click="Taro.navigateTo({ url: `/pages/shop/modify?id=${shopId}` })">改</view>
      <view class="modify-item" @click="deleteShop()">删</view>
    </view>
  </view>
  <map id="map" scale={10} style="display: none;"></map>
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

.shop-detail-container {
  position: relative;
  min-height: 100vh;
  .swiper-img-item-wrapper {
    height: fit-content!important;
  }
  .swiper-img-item {
    width: 100vw;
  }
  .shop-content {
    box-sizing: border-box;
    padding: 0 10px;
    margin-top: 10px;
  }
  .shop-name-wrapper {
    .flex-left;
    .shop-name {
      margin-right: 5px;
      font-weight: bold;
      font-size: 20px;
    }
    .type-tag {
      width: 18px;
      height: 18px;
      color: #fff;
      font-size: 14px;
      .flex-center;
      background-color: @shanchui;
    }
    .type-tag-1 {
      // background-color: rgba(255, 177, 27);
    }
  }
  .shop-description {
    color: rgba(120, 120, 120, 1);
    font-size: 14px;
    margin-top: 20px;
  }
  .tag-wrapper {
    margin-top: 5px;
    .flex-left;
    font-size: 14px;
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
    font-size: 14px;
    margin-bottom: 5px;
    margin-top: 20px;
    .score-wrapper {
      .flex-left;
      margin: 8px 0;
      margin-bottom: 10px;
      .score-label {
        height: 15px;
      }
    }
    .address-wrapper {
      margin-top: 3px;
      margin-bottom: 5px;
    }
    .distance-wrapper {
      .flex-left;
    }
    .go-btn {
      margin-left: 5px;
      font-size: 14px;
      color: #fff;
      background-color: @shanchui;
      padding: 2px 5px;
      border-radius: 20px;
      display: inline-block;
    }
  }
  .btn-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    .btn-go {
      width: 100vw;
      background: @shanchui;
      border-radius: 0;
    }
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