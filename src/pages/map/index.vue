<script setup lang="ts">
import Taro from "@tarojs/taro";

</script>

<template>
  <view>
    <nut-button block type="primary" @click="Taro.navigateBack()">确定</nut-button>
  </view>
</template>