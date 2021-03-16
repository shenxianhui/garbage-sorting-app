<!--
 * @Author: shenxh
 * @Date: 2021-03-14 10:38:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-16 14:47:07
 * @Description: 首页
-->

<template>
  <view class="home">
    <image class="home-bg" src="@/static/img/home_bg.png" />
    <view class="button-group">
      <u-button class="btn" type="success" @click="handleButton(1)">识物 学分类</u-button>
      <u-button class="btn" type="success" @click="handleButton(2)">游戏 学分类</u-button>
      <u-button class="btn" type="success" @click="handleButton(3)">我的成就</u-button>
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
      if (type == 2) {
        // const { openId } = getApp().globalData;

        // uni.navigateToMiniProgram({
        //   appId: 'wxc4d110c0edbf2baa',
        //   path: `pages/index/index?userId=${openId}`,
        //   success(res) {
        //     console.log(res);
        //   }
        // });
      }
      if (type == 3) {
        url = `/pages/achievement/achievement`;
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
    display: flex;
    flex-direction: column;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%, 0);
    .btn {
      &:not(:last-child) {
        margin-bottom: 60rpx;
      }
      /deep/ button {
        text-align: center;
        width: 400rpx;
        height: 80rpx;
        background-color: #278c53;
        border-radius: 40rpx;
        font-size: 34rpx;
        line-height: 80rpx;
        color: #fff;
      }
    }
  }
}
</style>
