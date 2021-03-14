<!--
 * @Author: shenxh
 * @Date: 2021-03-14 11:17:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 14:26:49
 * @Description: 识物
-->

<template>
  <view class="discriminate">
    <image class="discriminate-bg" src="@/static/img/discriminate_bg.png" />
    <view class="scan" @click="handleScan()">扫一扫 学分类</view>

    <!-- 弹出框 -->
    <u-popup v-model="showPopup" mode="center" border-radius="14">
      <view class="popup-content">
        <view class="popup-header">
          <view class="popup-header-tag"></view>
          <view class="popup-header-title">
            <text>{{ garbageType[0].name }}</text>
            <view class="icon"></view>
          </view>
        </view>
        <view class="popup-body">
          <view class="goods-img"></view>
          <view class="line"></view>
          <view class="remarks">
            <view class="remarks-tit">
              <view class="remarks-tit-tag"></view>
              投放要求
            </view>
            <view class="remarks-info" v-html="garbageType[0].remarks"></view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: 'discriminate',
  components: {},
  props: {},
  data() {
    return {
      showPopup: true,
      garbageType: [
        {
          name: '干垃圾',
          icon: '',
          img: '',
          remarks: '禁止投放<br />禁止投放禁止投放禁止投放禁止投放禁止投放禁止投放禁止投放禁止投放'
        },
        {
          name: '湿垃圾',
          icon: '',
          img: '',
          remarks: '禁止投放\n禁止投放禁止投放禁止投放禁止投放'
        },
        {
          name: '可回收垃圾',
          icon: '',
          img: '',
          remarks: '禁止投放\n禁止投放禁止投放禁止投放禁止投放'
        },
        {
          name: '有害垃圾',
          icon: '',
          img: '',
          remarks: '禁止投放\n禁止投放禁止投放禁止投放禁止投放'
        }
      ]
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
    handleScan() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          console.log(res.tempFilePaths);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.discriminate {
  width: 100%;
  height: 100%;
  .discriminate-bg {
    width: 100%;
    height: 100%;
  }
  .scan {
    position: absolute;
    bottom: 100rpx;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    width: 400rpx;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    background-color: #278c53;
    color: #fff;
  }
  .popup-content {
    .popup-header {
      background: #66cc66;
      color: #fff;
      padding: 20rpx;
      .popup-header-tag {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: #fff;
        margin-bottom: 10rpx;
      }
      .popup-header-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 36rpx;
        height: 50rpx;
        padding: 0 10rpx;
      }
    }
    .popup-body {
      padding: 20rpx 30rpx;
      color: #66cc66;
      .goods-img {
        width: 300rpx;
        height: 300rpx;
        margin: 10rpx auto 30rpx;
        border: 1px solid #66cc66;
      }
      .line {
        width: 100%;
        border: 1px dashed #66cc66;
      }
      .remarks {
        margin-top: 10rpx;
        .remarks-tit {
          display: flex;
          align-items: center;
          font-size: 34rpx;
          .remarks-tit-tag {
            left: 0;
            top: 0;
            width: 8rpx;
            height: 30rpx;
            background: #66cc66;
            margin-right: 10rpx;
          }
        }
        .remarks-info {
          font-size: 26rpx;
          margin-top: 10rpx;
          width: 460rpx;
          padding: 0 20rpx;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
