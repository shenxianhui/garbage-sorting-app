<!--
 * @Author: shenxh
 * @Date: 2021-03-14 17:25:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 21:20:42
 * @Description: 我的卡片
-->

<template>
  <view class="my-card">
    <view class="my-card-content"> </view>
  </view>
</template>

<script>
export default {
  name: 'my-card',
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
  methods: {}
};
</script>

<style scoped lang="scss">
.my-card {
  background-color: #278c53;
  height: 100%;
  .my-card-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 30rpx 30rpx 0 0;
    background-color: #fff;
    padding: 60rpx 80rpx;
  }
}
</style>
