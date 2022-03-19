<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { getMap } from "@/utils/map";

type WxMapLocation = {
  id: number | string;
  longitude: number;
  latitude: number;
  iconPath?: string;
  width?: number;
  height?: number;
}

defineProps<{
  markers: WxMapLocation[],
  longitude?: number,
  latitude?: number
}>()

// 定位相关
const map = getMap('map');
const myLocation = await map.getLocation();
const myMarker = ref({
  longitude: myLocation.longitude,
  latitude: myLocation.latitude,
  id: -1,
  iconPath: "http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/weight/position.png",
  width: 40,
  height: 40
});
const innerLongitude = ref(myLocation.longitude);
const innerLatitude = ref(myLocation.latitude);

const onMarkerTap = e => {
  console.log('onMarkerTap');
  console.log(e);
}
</script>

<template>
  <map 
    id="map" 
    :scale="12" 
    :longitude="longitude || innerLongitude" 
    :latitude="latitude || innerLatitude" 
    :markers="[myMarker, ...(markers || [])]" 
    @markerTap="onMarkerTap" />
</template>