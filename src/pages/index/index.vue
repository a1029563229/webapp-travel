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

const shopList = ref();
shopList.value = [
  {
    "name": "生蚝馆",
    "description": "固戍的宝藏店铺！生蚝馆！还有超大蟹钳！",
    "type": 1,
    "poster": "https://img1.baidu.com/it/u=2401989050,2062596849&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    "banners": [
      "https://img1.baidu.com/it/u=2401989050,2062596849&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      "https://img1.baidu.com/it/u=2043954707,1889077177&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      "https://img1.baidu.com/it/u=1340805476,3006236737&fm=253&fmt=auto&app=120&f=JPEG?w=360&h=360"
    ],
    "tags": [
      "绝绝子好吃",
      "宝藏店铺",
      "价格实惠"
    ],
    "score": 4.5,
    "evaluation": "吃过两次了，他们家的高压锅生蚝、蒜蓉生蚝、粥、蟹钳、虾都是首推，风味十足，特别好吃！",
    "address": "宝安区上围园新村十二巷 5-6 号 101",
    "longitude": 113.851415,
    "latitude": 22.602297,
    "distance": "2.3km"
  },
  {
    "name": "生蚝馆",
    "description": "固戍的宝藏店铺！生蚝馆！还有超大蟹钳！",
    "type": 1,
    "poster": "https://img1.baidu.com/it/u=2401989050,2062596849&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    "banners": [
      "https://img1.baidu.com/it/u=2401989050,2062596849&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      "https://img1.baidu.com/it/u=2043954707,1889077177&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      "https://img1.baidu.com/it/u=1340805476,3006236737&fm=253&fmt=auto&app=120&f=JPEG?w=360&h=360"
    ],
    "tags": [
      "绝绝子好吃",
      "宝藏店铺",
      "价格实惠"
    ],
    "score": 4.5,
    "evaluation": "吃过两次了，他们家的高压锅生蚝、蒜蓉生蚝、粥、蟹钳、虾都是首推，风味十足，特别好吃！",
    "address": "宝安区上围园新村十二巷 5-6 号 101",
    "longitude": 113.851415,
    "latitude": 22.602297,
    "distance": "<100米"
  },
]

</script>

<template>
  <view class="home-container container">
    <nut-swiper class="swiper-wrapper" :width="365" :height="150" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item class="swiper-item" v-for="item in banners">
        <img class="image" :src="item" alt="" />
      </nut-swiper-item>
    </nut-swiper>
    <view>
      <view class="sub-title">吃喝玩乐</view>
      <shop-list :list="shopList"></shop-list>
    </view>
  </view>
</template>

<style lang="less">
.home-container {
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
