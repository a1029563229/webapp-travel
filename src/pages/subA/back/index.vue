<script setup>
import Taro from '@tarojs/taro';
import { getMap } from "@/utils/map";

const map = getMap('map');
Taro.navigateBack();
</script>
<template>
  <map id="map" scale={10} style="display: none;"></map>
</template>