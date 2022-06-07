<script setup lang="ts">
import ShopList from '@/components/shop-list/index.vue';
import CityNav from "@/components/city-nav/index.vue";
</script>

<template>
  <view class="home-container container">
    <city-nav />
    <image class="home-image" src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-03-13_11-58-14.jpg"></image>
    <view>
      <view class="sub-title">吃喝玩乐</view>
        <suspense>
          <template #default>
            <shop-list />
          </template>
        </suspense>
    </view>
  </view>
</template>

<style lang="less">
.home-container {
  .home-image {
    width: 100vw;
  }
  .swiper-wrapper {
    margin: 5px;
    border-radius: 5px;
    overflow: hidden;
    .image {
      width: 375px;
      height: 100%;
    }
  }
  .sub-title {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>
