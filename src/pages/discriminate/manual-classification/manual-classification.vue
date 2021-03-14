<!--
 * @Author: shenxh
 * @Date: 2021-03-14 17:25:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 19:05:56
 * @Description: 手动提交分类
-->

<template>
  <view class="manual-classification">
    <div class="guide">
      <image class="robot" src="@/static/img/robot.png" />
      <div class="btn guide-text">请帮我识别一下</div>
    </div>
    <div class="manual-classification-content">
      <div class="goods-img">
        <image class="robot" src="@/static/img/robot.png" />
      </div>
      <div class="product-name">
        <u-input v-model="form.name" placeholder="请输入产品名称" />
      </div>
      <div class="select-type">
        <select-type class="title">选择分类</select-type>
        <div class="options">
          <div class="btn option">可回收垃圾</div>
          <div class="btn option">有害垃圾</div>
          <div class="btn option">厨余垃圾</div>
          <div class="btn option">干垃圾</div>
        </div>
      </div>
      <div class="remind">注: 不知道哪一类, 可以不选择分类</div>
      <div class="btn">提交</div>
    </div>
  </view>
</template>

<script>
export default {
  name: 'manual-classification',
  components: {},
  props: {},
  data() {
    return {
      form: {}
    };
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

<style scoped lang="scss"></style>
