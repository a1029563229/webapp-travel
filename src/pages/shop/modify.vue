<script setup lang="ts">
import Taro from "@tarojs/taro";
import { ref } from "vue";

const formData = ref({
  name: '',
  description: '',
  type: 0,
  poster: '',
  banners: [],
  tags: [],
  score: 0,
  evaluation: ''
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

const uploadUrl = ref('');
const banners = ref([]);
const tagStr = ref('');
const positionType = ref('1')
</script>

<template>
  <view class="shop-modify-container">
    <view class="title">添加新店铺</view>
    <nut-input placeholder="请输入店铺名称"
        v-model="formData.name"
        label="店铺名称"
      />
    <nut-input placeholder="请输入店铺描述"
        v-model="formData.description"
        label="店铺描述"
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
      <nut-uploader :url="uploadUrl" v-model:file-list="banners" maximum="10" multiple />
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
      <nut-textarea v-model="formData.evaluation" rows="3" autosize />
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
      <view class="form-item-description">
        请选择店铺位置
      </view>
    </view>
    <view v-if="positionType === '2'">
      <nut-input placeholder="请输入店铺地址"
          v-model="formData.description"
          label="店铺地址"
        />
      <nut-input placeholder="请输入店铺经度"
          v-model="formData.description"
          label="店铺经度"
        />
      <nut-input placeholder="请输入店铺纬度"
          v-model="formData.description"
          label="店铺纬度"
        />
    </view>
    <view class="btn-wrapper">
      <nut-button block type="primary" @click="Taro.navigateTo({ url: '/pages/map/index' })">新增店铺</nut-button>
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
  }
  .form-textarea-wrapper {
    align-items: flex-start;
  }
  .upload-wrapper {
    align-items: flex-start;
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