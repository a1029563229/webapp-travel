<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";
import ShopList from '@/components/shop-list/index.vue';
import CityNav from "@/components/city-nav/index.vue";

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
}

onMounted(() => computeRect());
</script>

<template>
  <view class="home-container container">
    <city-nav :rect="rect" />
    <view class="main-content" :style="`height: calc(100vh - ${rect.top + rect.height}px);`">
      <image class="home-image" src="http://shadows-mall.oss-cn-shenzhen.aliyuncs.com/images/assets/common3/Xnip2022-03-13_11-58-14.jpg"></image>
      <view>
          <suspense>
            <template #default>
              <shop-list />
            </template>
          </suspense>
      </view>
    </view>
  </view>
</template>

<style lang="less">
.home-container {
  .main-content {
    overflow-y: scroll;
  }
  .home-image {
    width: 100vw;
  }
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
