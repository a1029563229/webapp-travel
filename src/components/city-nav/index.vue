<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store";
import { ApiGetCityList } from "@/apis";

const rect = ref<any>({});
const computeRect = async () => {
  const systemInfo = await Taro.getSystemInfo();

  let rectInstance: any = rect.value = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
  try {
    if (rectInstance === null) {
      throw 'getMenuButtonBoundingClientRect error';
    }
    //取值为0的情况
    if (!rectInstance.width) {
      throw 'getMenuButtonBoundingClientRect error';
    }
  } catch (error) {
    let gap: any = ''; //胶囊按钮上下间距 使导航内容居中
    let width = 96; //胶囊的宽度，android大部分96，ios为88
    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      gap = 5.5; //开发工具中ios手机
    } else {
      gap = 4;
      width = 88;
    }
    if (!systemInfo.statusBarHeight) {
      //开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect.value = {
      //获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width: width
    };
  }

  console.log(rect.value);
}

onMounted(() => computeRect());

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