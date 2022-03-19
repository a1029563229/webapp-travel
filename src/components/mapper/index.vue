<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useUserStore } from "@/store";

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
const user = useUserStore();
const myMarker = ref({
  longitude: user.longitude,
  latitude: user.latitude,
  id: -1,
  iconPath: "http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/weight/position.png",
  width: 40,
  height: 40
});
const innerLongitude = ref(user.longitude);
const innerLatitude = ref(user.latitude);

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