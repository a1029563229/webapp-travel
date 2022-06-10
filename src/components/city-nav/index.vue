<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useGlobalStore } from "@/store";
import { ApiGetCityList } from "@/apis";

defineProps({
  rect: { 
    default: { top: 0 } 
  }
})

const layerVisible = ref(false);
const cityList = ref([
  { text: '深圳', value: '深圳' },
  { text: '成都', value: '成都' },
]);
const setCityList = async () => {
  const reply = await ApiGetCityList();
  cityList.value = reply.map(item => ({ text: item.value, value: item.value }));
}
setCityList();

const g = useGlobalStore();
const city = ref(g.city);
const cityIndex = ref(cityList.value.findIndex(item => item.value === g.city));
const selectCity = e => {
  const v = e.selectedValue[0];
  if (v === city.value) return;
  
  city.value = v;
  cityIndex.value = cityList.value.findIndex(item => item.value === v);
  g.setCity(v);
}
</script>

<template>
  <view :style="`padding-top: ${rect.top}px;`">
    <view class="area-location" @click="() => { layerVisible = true;}">{{city}}</view>
    <nut-picker
      :defaultIndex="cityIndex"
      v-model:visible="layerVisible"
      :columns="cityList"
      @confirm="selectCity"
      title="城市选择"
    >
    </nut-picker>
  </view>
</template>

<style lang="less">
.area-location {
  padding: 5px 0;
  padding-left: 10px;
}
</style>