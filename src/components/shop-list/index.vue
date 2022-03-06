<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  list: any[]
}>()

const typeList = ref([
  "吃",
  "喝",
  "玩",
  "乐"
])

</script>

<template>
<view class="shop-list flex-left">
  <view class="shop-item" v-for="item in list">
    <view class="shop-poster-wrapper">
      <image class="shop-poster" :src="item.poster"></image>
    </view>
    <view class="shop-content">
      <view class="shop-name-wrapper">
        <view class="shop-name">{{item.name}}</view>
        <view :class="`type-tag type-tag-${item.type}`">{{typeList[item.type - 1]}}</view>
      </view>
      <view class="shop-description">{{item.description}}</view>
      <view class="tag-wrapper">
        <view class="tag-item" v-for="tag in item.tags.slice(0, 2)">{{tag}}</view>
      </view>
      <view class="shop-footer">
        <view>评分：{{item.score}}</view>
        <view class="distance-wrapper">
          <view>距离：{{item.distance}}</view>
          <view class="go-btn">Go</view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

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
    }
  }
  .shop-item:nth-child(odd) {
    margin-right: 10px;
  }
}
</style>
