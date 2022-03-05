<script setup lang="ts">
defineProps<{
  list: any[]
}>()

</script>

<template>
<view class="shop-list flex-left">
  <view class="shop-item" v-for="item in list">
    <view class="shop-poster-wrapper">
      <image class="shop-poster" :src="item.poster"></image>
    </view>
    <view class="shop-content">
      <view class="shop-title flex-left">
        <view>{{item.name}}</view>
        <view>{{item.type}}</view>
      </view>
      <view class="shop-description">{{item.description}}</view>
      <view class="tag-wrapper">
        <view class="tag-item" v-for="tag in item.tags">{{tag}}</view>
      </view>
      <view class="flex-between">
        <view>评分：{{item.score}}</view>
        <view>距离：{{item.distance}}</view>
      </view>
      <nut-button type="warning">到这里去</nut-button>
    </view>
  </view>
</view>
</template>

<style lang="less">
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
  }
  .shop-item:nth-child(odd) {
    margin-right: 10px;
  }
}
</style>
