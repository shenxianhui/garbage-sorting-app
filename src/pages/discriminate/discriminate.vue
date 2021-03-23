<!--
 * @Author: shenxh
 * @Date: 2021-03-14 11:17:10
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-22 20:46:04
 * @Description: 识物
-->

<template>
  <view class="discriminate">
    <text class="assignment">【今日任务】 至少包含2类垃圾, 去完成 ></text>
    <image class="discriminate-bg" src="@/static/img/discriminate_bg.png" />
    <view class="scan" @click="handleScan()">扫一扫&nbsp;&nbsp;学分类</view>

    <!-- 弹出框 -->
    <u-popup v-model="showPopup" mode="center" border-radius="14" @close="closePopup">
      <swiper class="swiper" :autoplay="false">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view class="popup-content">
            <view class="popup-header">
              <view class="popup-header-tag"></view>
              <view v-if="item.value" class="popup-header-title">
                <text>{{ garbageType[item.value - 1].name }}</text>
                <image class="icon" :src="garbageType[item.value - 1].icon" />
              </view>
            </view>
            <view class="popup-body">
              <view class="goods-img"> </view>
              <view class="line"></view>
              <view v-if="item.value" class="remarks">
                <view class="remarks-tit">
                  <view class="remarks-tit-tag"></view>
                  投放要求
                </view>
                <view class="remarks-info" v-html="garbageType[item.value - 1].remarks"></view>
              </view>
              <view v-else class="learn">
                <text>学习垃圾分类集卡牌</text>
                <u-button class="btn" type="success" @click="handleType()">教教我</u-button>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
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
          name: '可回收垃圾',
          icon: require('@/static/icon/可回收垃圾图标.png'),
          img: '',
          remarks:
            '1、可回收物应轻投轻放，清洁干燥、避免污染; <br />2、废纸尽量平整; <br />3、立体包装物请清空内容物，清洁后压扁投放; <br />4、有尖锐边角的，应包裹后投放。'
        },
        {
          name: '湿垃圾',
          icon: require('@/static/icon/厨余垃圾标志.png'),
          img: '',
          remarks:
            '投放前尽量沥干水分。<br />有包装物的湿垃圾应将包装物去除后分类投放，包装物应投放到对应的可回收物或干垃圾收集容器。'
        },
        {
          name: '有害垃圾',
          icon: require('@/static/icon/有害垃圾标志.png'),
          img: '',
          remarks:
            '1、分类投放有害垃圾时，应注意轻放; <br />2、废灯管等易破损的有害垃圾应连带包装<br />3、废弃药品宜连带包装一并投放;杀虫剂等压力罐装容器，应排空内容物后投放; '
        },
        {
          name: '干垃圾',
          icon: require('@/static/icon/其他垃圾图标.png'),
          img: '',
          remarks:
            '禁止混投。<br />其他垃圾应投入其他垃圾收集容器，并保持周边环境整洁。凡未列入本目录或成分复杂难以分辨类别的生活垃圾,投入其他垃圾收集容器。'
        }
      ],
      swiperList: [
        {
          label: '图片识别失败',
          value: 0,
          pic_url: ''
        },
        {
          label: '可回收垃圾',
          value: 1,
          pic_url: ''
        },
        {
          label: '厨余垃圾',
          value: 2,
          pic_url: ''
        },
        {
          label: '有害垃圾',
          value: 3,
          pic_url: ''
        },
        {
          label: '其他垃圾',
          value: 4,
          pic_url: ''
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
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          console.log(res);
          // this.showPopup = true;

          uni.uploadFile({
            url: 'http://39.100.130.112:30001/upload_pic',
            // url: 'http://39.100.130.112:30501/frame',
            filePath: res.tempFilePaths[0],
            header: {
              'Content-Type': 'multipart/form-data'
            },
            name: 'file',
            formData: {},
            success: uploadFileRes => {
              // console.log(uploadFileRes.data);
              console.log(uploadFileRes);
            }
          });
        }
      });
    },
    handleType() {
      uni.navigateTo({
        url: `/pages/discriminate/manual-classification/manual-classification`
      });
    },
    closePopup() {
      uni.redirectTo({
        url: `/pages/discriminate/my-card/my-card`
      });
    }
  }
};
</script>

<style scoped lang="scss">
.discriminate {
  width: 100%;
  height: 100%;
  .assignment {
    position: absolute;
    text-align: center;
    top: 31%;
    width: 100%;
    color: #278c53;
  }
  .discriminate-bg {
    width: 100%;
    height: 100%;
  }
  .scan {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    width: 400rpx;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
    background: url('~@/static/img/button_bg.png') 0 0;
    background-size: 100% 100%;
    color: #fff;
  }
  .swiper {
    width: 520rpx;
    height: 840rpx;
  }
  .popup-content {
    width: 520rpx;
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
        .icon {
          flex-shrink: 0;
          width: 50rpx;
          height: 50rpx;
        }
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
          padding: 0 20rpx;
          line-height: 1.5;
          /deep/ rich-text {
            line-height: 1.5;
          }
        }
      }
      .learn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 330rpx;
        padding: 60rpx 0;
        .btn {
          /deep/ button {
            text-align: center;
            width: 300rpx;
            height: 80rpx;
            background-color: #66cc66;
            border-radius: 40rpx;
            font-size: 34rpx;
            line-height: 80rpx;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
