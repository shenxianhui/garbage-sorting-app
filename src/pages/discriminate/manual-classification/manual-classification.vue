<!--
 * @Author: shenxh
 * @Date: 2021-03-14 17:25:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 21:21:41
 * @Description: 手动提交分类
-->

<template>
  <view class="manual-classification">
    <view class="manual-classification-content">
      <view class="guide">
        <image class="robot" src="@/static/img/robot.png" />
        <view class="btn guide-text">请帮我识别一下</view>
      </view>
      <view class="goods-img">
        <image mode="aspectFit" src="@/static/img/robot.png" />
      </view>
      <view class="product-name">
        <u-input v-model="form.name" :clearable="false" placeholder="请输入产品名称" />
      </view>
      <view class="select-type">
        <select-type class="title">选择分类</select-type>
        <view class="options">
          <view class="btn option" :class="{ active: form.type == 1 }" @click="handleOpt(1)">
            可回收垃圾
          </view>
          <view class="btn option" :class="{ active: form.type == 2 }" @click="handleOpt(2)">
            有害垃圾
          </view>
          <view class="btn option" :class="{ active: form.type == 3 }" @click="handleOpt(3)">
            厨余垃圾
          </view>
          <view class="btn option" :class="{ active: form.type == 4 }" @click="handleOpt(4)">
            干垃圾
          </view>
        </view>
      </view>
      <view class="remind">注: 不知道哪一类, 可以不选择分类</view>
      <view class="btn" @click="handleSubForm()">提交</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'manual-classification',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '',
        type: null
      }
    };
  },
  computed: {},
  watch: {},
  onLoad() {},
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},
  methods: {
    handleOpt(type) {
      if (this.form.type == type) {
        this.form.type = null;
      } else {
        this.form.type = type;
      }
    },
    handleSubForm() {
      if (!this.form.name) {
        uni.showToast({
          title: '请输入产品名称',
          icon: 'none',
          duration: 2000
        });

        return;
      }

      uni.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });

      console.log(this.form);
      uni.redirectTo({
        url: `/pages/discriminate/my-card/my-card`
      });
    }
  }
};
</script>

<style scoped lang="scss">
.manual-classification {
  background-color: #278c53;
  height: 100%;
  .manual-classification-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 30rpx 30rpx 0 0;
    background-color: #fff;
    padding: 60rpx 80rpx;
    .btn {
      text-align: center;
      width: 100%;
      height: 70rpx;
      background-color: #278c53;
      border-radius: 35rpx;
      font-size: 30rpx;
      line-height: 70rpx;
      color: #fff;
    }
    .guide {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: -146rpx;
      left: 50%;
      transform: translate(-50%, 0);
      .robot {
        width: 200rpx;
        height: 160rpx;
      }
      .guide-text {
        width: 360rpx;
      }
    }
    .goods-img {
      width: 100%;
      height: 300rpx;
      border-radius: 20rpx;
      border: 1px solid #278c53;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .product-name {
      margin-top: 20px;
      /deep/ input {
        height: 100%;
        background: #eee;
        border-radius: 40rpx;
        padding: 0 40rpx;
      }
    }
    .select-type {
      margin-top: 50rpx;
      .title {
        color: #666;
        font-size: 40rpx;
        font-weight: bold;
      }
      .options {
        .option {
          margin-top: 30rpx;
          background: #eee;
          color: #999;
          &.active {
            background: #278c53;
            color: #fff;
          }
        }
      }
    }
    .remind {
      font-size: 26rpx;
      color: #666;
      margin-top: 50rpx;
    }
    .btn {
      margin-top: 20rpx;
    }
  }
}
</style>
