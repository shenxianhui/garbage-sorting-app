<!--
 * @Author: shenxh
 * @Date: 2021-03-14 10:38:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 13:19:31
 * @Description: 首页
-->

<template>
  <view class="home">
    <image class="home-bg" src="@/static/img/home_bg.png" />
    <view class="button-group">
      <view class="btn" @click="handleButton(1)">识物 学分类</view>
      <view class="btn" @click="handleButton(2)">游戏 学分类</view>
      <view class="btn" @click="handleButton(3)">我的成就</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'home',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  onLoad() {},
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},
  methods: {
    handleButton(type) {
      let url;

      if (type == 1) {
        url = `/pages/discriminate/discriminate`;
      }

      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .home-bg {
    width: 100%;
    height: 100%;
  }
  .button-group {
    position: absolute;
    bottom: 250rpx;
    left: 50%;
    transform: translate(-50%, 0);
    .btn {
      text-align: center;
      width: 400rpx;
      height: 80rpx;
      background-color: #278c53;
      border-radius: 40rpx;
      font-size: 34rpx;
      line-height: 80rpx;
      color: #fff;
      &:not(:last-child) {
        margin-bottom: 60rpx;
      }
    }
  }
}
</style>
