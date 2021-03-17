<!--
 * @Author: shenxh
 * @Date: 2021-03-15 13:55:56
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-17 18:40:52
 * @Description: 我的成就
-->

<template>
  <view class="achievement">
    <image class="achievement-bg" src="@/static/img/achievement_bg.png" />
    <view class="achievement-wrap">
      <view class="achievement-title">集齐卡牌, 增值能量</view>
      <div class="wrap">
        <u-swiper
          class="swiper"
          :list="swiperList"
          :autoplay="false"
          :effect3d="true"
          :circular="false"
          mode="none"
          bg-color="transparent"
        ></u-swiper>
        <view v-if="currentLabel" class="card-name">{{ currentLabel }}</view>
      </div>
      <view class="buttons">
        <view class="button" @click="handleBtn(1)">
          <view v-if="cardsLulu.length" class="tag">x{{ cardsLulu.length }}</view>
          <image class="btn" v-if="currentBtn == 1" src="@/static/img/btn_plate_active.png" />
          <image class="btn" v-else src="@/static/img/btn_plate.png" />
          <text class="btn-name">露露</text>
        </view>
        <view class="button" @click="handleBtn(2)">
          <view v-if="cardsLuoqi.length" class="tag">x{{ cardsLuoqi.length }}</view>
          <image class="btn" v-if="currentBtn == 2" src="@/static/img/btn_plate_active.png" />
          <image class="btn" v-else src="@/static/img/btn_plate.png" />
          <text class="btn-name">洛奇</text>
        </view>
        <view class="button" @click="handleBtn(3)">
          <view v-if="cardsKeke.length" class="tag">x{{ cardsKeke.length }}</view>
          <image class="btn" v-if="currentBtn == 3" src="@/static/img/btn_plate_active.png" />
          <image class="btn" v-else src="@/static/img/btn_plate.png" />
          <text class="btn-name">可可</text>
        </view>
        <view class="button" @click="handleBtn(4)">
          <view v-if="cardsBobo.length" class="tag">x{{ cardsBobo.length }}</view>
          <image class="btn" v-if="currentBtn == 4" src="@/static/img/btn_plate_active.png" />
          <image class="btn" v-else src="@/static/img/btn_plate.png" />
          <text class="btn-name">波波</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'achievement',
  components: {},
  props: {},
  data() {
    return {
      currentLabel: '',
      currentBtn: 1,
      userCards: [],
      cardsBobo: [],
      cardsKeke: [],
      cardsLulu: [],
      cardsLuoqi: [],
      swiperList: []
    };
  },
  computed: {},
  watch: {},
  onLoad() {
    this._getUserInfo();
  },
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},
  methods: {
    handleBtn(type) {
      let arr = [];

      this.currentBtn = type;
      if (type == 1) {
        arr = this.cardsLulu;
        this.currentLabel = '露露技能卡';
      }
      if (type == 2) {
        arr = this.cardsLuoqi;
        this.currentLabel = '洛奇技能卡';
      }
      if (type == 3) {
        arr = this.cardsKeke;
        this.currentLabel = '可可技能卡';
      }
      if (type == 4) {
        arr = this.cardsBobo;
        this.currentLabel = '波波技能卡';
      }

      this.swiperList = arr;
    },

    _getUserInfo() {
      const { openId } = getApp().globalData;

      this.$request
        .get('/get', {
          wx_id: openId
        })
        .then(res => {
          const { userCards } = res.data;
          let arr = [];

          if (userCards && userCards.length) {
            userCards.map(item => {
              if (item.quantity) {
                for (let i = 0; i < item.quantity; i++) {
                  arr.push(
                    Object.assign(item, {
                      image: this._getCardFile(item.value)
                    })
                  );

                  if (item.value == 'time_back') {
                    this.cardsLulu.push(item);
                  }
                  if (item.value == 'life') {
                    this.cardsBobo.push(item);
                  }
                  if (item.value == 'eye') {
                    this.cardsKeke.push(item);
                  }
                  if (item.value == 'sky') {
                    this.cardsLuoqi.push(item);
                  }
                }
              }
            });
          }
          this.userCards = arr;

          this.handleBtn(1);
        });
    },
    _getCardFile(cardVal) {
      let file;

      if (cardVal == 'time_back') {
        file = require('@/static/img/card_lulu.png');
      }
      if (cardVal == 'life') {
        file = require('@/static/img/card_bobo.png');
      }
      if (cardVal == 'eye') {
        file = require('@/static/img/card_keke.png');
      }
      if (cardVal == 'sky') {
        file = require('@/static/img/card_luoqi.png');
      }

      return file;
    }
  }
};
</script>

<style scoped lang="scss">
.achievement {
  width: 100%;
  height: 100%;
  .achievement-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .achievement-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 150rpx 30rpx 50rpx;
    height: 100%;
    .achievement-title {
      text-align: center;
      width: 520rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 38rpx;
      margin: 40rpx auto;
      color: #fff;
      background: url('~@/static/img/title_bg.png') 0 0;
      background-size: 100% 100%;
    }
    .swiper {
      /deep/ .u-swiper-wrap {
        swiper {
          height: 50vh !important;
          swiper-item {
            width: 70% !important;
            margin: 0 15%;
            .u-list-scale {
              opacity: 0.3;
            }
          }
        }
      }
    }
    .card-name {
      text-align: center;
      width: 300rpx;
      height: 70rpx;
      background-color: #278c53;
      border-radius: 40rpx;
      font-size: 34rpx;
      line-height: 70rpx;
      color: #fff;
      margin: 30rpx auto;
    }
    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20rpx;
      padding: 20rpx;
      .button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        .tag {
          position: absolute;
          text-align: center;
          right: -25rpx;
          top: -25rpx;
          width: 50rpx;
          height: 50rpx;
          line-height: 50rpx;
          background: url('~@/static/img/tag_bg.png') 0 0;
          background-size: 100% 100%;
          color: #333;
          font-size: 30rpx;
        }
        .btn {
          width: 120rpx;
          height: 120rpx;
          margin-bottom: 10rpx;
        }
        .btn-name {
          font-size: 26rpx;
          color: #278c53;
        }
      }
    }
  }
}
</style>
