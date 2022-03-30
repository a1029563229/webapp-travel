<script setup>
import Taro from "@tarojs/taro";
import { computed, ref } from "vue";
import { useUserStore } from "@/store";
import { updateUserInfo } from "@/utils/auth";

const user = useUserStore();
const userInfo = computed(() => user.info);
const login = async () => {
  const reply = await Taro.getUserProfile({ desc: '用于提供店铺收藏功能' });
  const info = {
    ...reply.userInfo,
    id: user.info.id,
    nickname: reply.userInfo.nickName,
    avatar: reply.userInfo.avatarUrl,
  }
  userInfo.value = info;
  user.setInfo(info);
  updateUserInfo(info);
}
</script>

<template>
  <view className='personal-container'>
    <view className='personal-card'>
      <image
        className='card-img'
        src='https://jk-box.oss-cn-shanghai.aliyuncs.com/fb5343d6-b00f-4b3e-9b68-ac08a255a326/348a87abc5f0870ed4d0e6085fd032fb.png'
      />
      <view className='user-info-wrapper' v-if="userInfo && userInfo.nickname">
        <view className='avatar-wrapper'>
          <image className='avatar' :src="userInfo.avatar"></image>
        </view>
        <view className='nickname'>{{userInfo.nickname}}</view>
      </view>
      <button
        v-else
        className='btn btn-login'
        type="normal"
        @click="login"
      >
        登录
      </button>
    </view>
  </view>
</template>

<style lang="less">
@import url("~@/assets/style/preset.less");

.personal-container {
  .personal-card {
    width: 375px;
    height: 210px;
    position: relative;
    .card-img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .btn-login {
      width: 100px;
      font-size: 16px;
      background: @shanchui;
      color: #fff;
      border-radius: 25px;
      text-align: center;
      height: 34px;
      line-height: 34px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    .user-info-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      text-align: center;
      .avatar-wrapper {
        width: 90px;
        height: 90px;
        border-radius: 52px;
        border: 2px solid @shanchui;
        overflow: hidden;
        margin: auto;
      }
      .avatar {
        width: 86px;
        height: 86px;
        border-radius: 52px;
        border: 2px solid #fff;
        margin: auto;
      }
      .nickname {
        margin-top: 15px;
        max-width: 160px;
        .text-ellipsis(1);
        display: inline-block;
      }
    }
  }
}
</style>