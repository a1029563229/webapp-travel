<script setup lang="ts">
import { ref } from 'vue';
import ShopList from '@/components/shop-list/index.vue';

const banners = ref();
banners.value = [
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
]
</script>

<template>
  <view class="home-container container">
    <image class="home-image" src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-03-13_11-58-14.jpg"></image>
    <!-- <nut-swiper class="swiper-wrapper" :width="365" :height="150" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item class="swiper-item" v-for="item in banners">
        <img class="image" :src="item" alt="" />
      </nut-swiper-item>
    </nut-swiper> -->
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
