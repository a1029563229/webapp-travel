<script setup lang="ts">
import { ref } from "vue";
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import ImageUploader from "@/components/image-uploader/index.vue";
import { useGlobalStore } from "@/store";
import { ApiAddShop, ApiUpdateShop, ApiGetShopDetail } from "@/apis";


type ShopInfo = {
  id?: number;
  name: string;
  description: string;
  type: number;
  poster: string;
  banners: string[];
  tags: string[];
  score: number;
  evaluation: string;
  address: string;
  latitude: number;
  longitude: number;
}

const formData = ref<ShopInfo>({
  name: '',
  description: '',
  type: 0,
  poster: '',
  banners: [],
  tags: [],
  score: 0,
  evaluation: '',
  address: '',
  latitude: 0,
  longitude: 0
});

const typeList = ref([
  "吃",
  "喝",
  "玩",
  "乐"
])
const typeName = ref('');
const typePickerVisible = ref(false);
const confirmType = (res)=>{
  typeName.value = res;
  const index = typeList.value.findIndex(type => type === res);
  formData.value.type = index + 1;
}

const tagStr = ref('');
const positionType = ref('1')

useDidShow(() => {
  const globalStore = useGlobalStore();
  const shop = globalStore.shop;
  if (shop) {
    formData.value.address = shop.address;
    formData.value.longitude = shop.longitude;
    formData.value.latitude = shop.latitude;
  }
  console.log(shop);
})

const shopId = getCurrentInstance().router?.params.id || '23';
Taro.setNavigationBarTitle({ title: shopId ? '修改店铺信息' : '添加新店铺' });
const hasDetail = ref(false);
const getShopDetail = async () => {
  formData.value = await ApiGetShopDetail({ id: shopId });
  typeName.value = typeList.value[formData.value.type - 1];
  tagStr.value = formData.value.tags.join('，');
  hasDetail.value = true;
}
if (shopId) {
  getShopDetail();
}


const submit = async () => {
  const data = formData.value;
  data.tags = tagStr ? tagStr.value.split('，') : [];
  data.poster = data.banners[0];
  console.log(data);
  if (shopId) {
    updateShop(data);
  } else {
    addShop(data);
  }
}

const addShop = async (data) => {
  await ApiAddShop(data);
  Taro.showToast({
    title: "新增成功！"
  });
  Taro.navigateBack();
}

const updateShop = async (data) => {
  await ApiUpdateShop({ ...data, id: shopId });
  Taro.showToast({
    title: "更新成功！"
  });
  Taro.navigateBack();
}

</script>

<template>
  <view class="shop-modify-container" v-if="!shopId || hasDetail">
    <view class="title">{{shopId ? '修改店铺信息' : '添加新店铺'}}</view>
    <nut-input placeholder="请输入店铺名称"
        v-model="formData.name"
        label="店铺名称"
      />
    <view>
      <nut-input placeholder="请选择店铺类型"
        disabled
        v-model="typeName"
        label="店铺类型"
        @click="typePickerVisible = true"
      />
      <nut-picker
        v-model:visible="typePickerVisible"
        :list-data="typeList"
        title="选择店铺类型"
        @confirm="confirmType" 
        :defaultIndex="0"
      ></nut-picker>
    </view>
    <view class="form-item-wrapper upload-wrapper">
      <view class="form-item-label">店铺图片</view>
      <ImageUploader v-model:value="formData.banners" maximum="9" multiple />
    </view>
    <nut-input placeholder="请输入店铺标签，用逗号隔开"
        v-model="tagStr"
        label="店铺标签"
      />
    <view class="form-item-wrapper">
      <view class="form-item-label">
        店铺评分
      </view>
      <nut-rate active-color="#FFC800" v-model="formData.score" allow-half  />
    </view>
    <view class="form-item-wrapper form-textarea-wrapper">
      <view class="form-item-label">
        店铺测评
      </view>
      <nut-textarea v-model="formData.description" rows="3" autosize />
    </view>
    <view class="form-item-wrapper form-textarea-wrapper">
      <view class="form-item-label">
        店铺位置
      </view>
      <nut-radiogroup v-model="positionType" direction="horizontal">
        <nut-radio shape="button" label="1">地图定位</nut-radio>
        <nut-radio shape="button" label="2">手动填入</nut-radio>
      </nut-radiogroup>
    </view>
    <view class="form-item-wrapper" v-if="positionType === '1'">
      <view class="form-item-label">
        店铺定位
      </view>
      <view class="form-item-description" @click="Taro.navigateTo({ url: '/pages/map/index' })">
        {{ formData.address || '请选择店铺位置' }}
      </view>
    </view>
    <view v-if="positionType === '2'">
      <nut-input placeholder="请输入店铺地址"
          v-model="formData.address"
          label="店铺地址"
        />
      <nut-input placeholder="请输入店铺经度"
          v-model="formData.longitude"
          label="店铺经度"
        />
      <nut-input placeholder="请输入店铺纬度"
          v-model="formData.latitude"
          label="店铺纬度"
        />
    </view>
    <view class="btn-wrapper">
      <nut-button block type="primary" @click="submit">提交</nut-button>
    </view>
  </view>
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

.shop-modify-container {
  .title {
    margin: 10px 0;
    padding-left: 20px;
    font-weight: bold;
  }
  .nut-input-disabled {
    color: #000!important;
  }
  .form-item-wrapper {
    .flex-left;
    padding: 10px 0px 10px 25px;
    font-size: 13px;
    border-bottom: 1px solid #eaf0fb;
    .form-item-label {
      width: 80px;
      margin-right: 10px;
    }
    .form-item-description {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
    }
    .nut-textarea {
      width: 70%;
      padding: 5px 0;
      textarea {
        height: 50px;
      }
    }
    .nut-uploader {
      width: 360px;
    }
  }
  .form-textarea-wrapper {
    align-items: flex-start;
  }
  .upload-wrapper {
    align-items: flex-start;
    flex-wrap: nowrap;
    .nut-uploader__upload {
      width: 80px;
      height: 80px;
    }
    .nut-uploader__preview-img {
      width: 80px;
      height: 80px;
    }
  }
  .btn-wrapper {
    padding: 10px 25px;
    margin-top: 30px;
    .nut-button__warp {
      font-family: "Microsoft YaHei";
    }
  }
  .nut-radio__button {
    border: 1px solid transparent;
  }
  .nut-radio__button--active {
    border: 1px solid #fa2c19;
  }
}
</style>