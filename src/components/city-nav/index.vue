<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";


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
const columns = ref([
  '深圳',
  '成都'
]);
const city = ref('深圳');
console.log(columns)
</script>

<template>
  <div :style="`padding-top: ${rect.top}px;`">
    <div class="area-location" @click="() => { layerVisible = true;}">深圳</div>
    <nut-picker
      v-model="city"
      v-model:visible="layerVisible"
      :list-data="columns"
      title="城市选择"
    >
    </nut-picker>
  </div>
</template>

<style lang="less">
.area-location {
  padding: 5px 0;
  padding-left: 10px;
}
</style>