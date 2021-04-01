<!--
 * @Author: shenxh
 * @Date: 2021-03-14 17:25:31
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-27 20:08:59
 * @Description: 我的卡片
-->

<template>
  <view class="my-card">
    <view class="my-card-content">
      <view class="tabs">
        <view class="tab" :class="{ active: currentTab == 1 }" @click="handleTab(1)">
          <view class="tab-group">
            <text>获得一次抽卡机会</text>
            <view class="tab-line"></view>
          </view>
        </view>
        <view class="tab" :class="{ active: currentTab == 2 }" @click="handleTab(2)">
          <view class="tab-group">
            <text>我的卡牌</text>
            <view class="tab-line"></view>
          </view>
        </view>
      </view>
      <view class="cards">
        <view v-if="currentTab == 1" class="cards-wrap">
          <image class="card" src="@/static/img/card_back_1.png" @click="handleLotteryDraw()" />
          <image class="card" src="@/static/img/card_back_2.png" @click="handleLotteryDraw()" />
          <image class="card" src="@/static/img/card_back_3.png" @click="handleLotteryDraw()" />
          <image class="card" src="@/static/img/card_back_4.png" @click="handleLotteryDraw()" />
        </view>
        <view v-if="currentTab == 2" class="cards-wrap">
          <image
            v-for="(item, index) in userCards"
            :key="index"
            class="card-front"
            :src="item.url"
          />
        </view>

        <text v-if="currentTab == 1" class="instruction">恭喜您, 可以抽取卡牌了</text>
        <!-- <text v-if="currentTab == 2" class="instruction">可以使用卡牌啦</text> -->
      </view>
    </view>

    <!-- 弹出框 -->
    <u-mask :show="showMask" :mask-click-able="false" @click="showMask = false">
      <view class="popup-wrap">
        <view class="popup-content">
          <view class="cards-wrap" @click.stop>
            <image v-if="currentCard == 1" class="card-front" src="@/static/img/card_bobo.png" />
            <image v-if="currentCard == 2" class="card-front" src="@/static/img/card_keke.png" />
            <image v-if="currentCard == 3" class="card-front" src="@/static/img/card_lulu.png" />
            <image v-if="currentCard == 4" class="card-front" src="@/static/img/card_luoqi.png" />
          </view>

          <u-button class="btn" type="success" @click="handleGetCard()">收下环保卡</u-button>
        </view>
      </view>
    </u-mask>
  </view>
</template>

<script>
export default {
  name: 'my-card',
  components: {},
  props: {},
  data() {
    return {
      showMask: false,
      currentTab: 1,
      currentCard: 1,
      hasGetCard: false,
      userCards: []
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
    handleTab(num) {
      this.currentTab = num;

      if (num == 2) {
        this._getUserInfo();
      }
    },
    handleLotteryDraw() {
      if (this.hasGetCard) {
        uni.showToast({
          title: '您已经抽取过卡牌了~',
          icon: 'none',
          duration: 2000
        });

        return;
      }

      this._countProbability();
    },
    handleGetCard() {
      this.showMask = false;
      this.currentTab = 2;
    },

    _countProbability() {
      const { probability } = getApp().globalData;
      const { bobo, keke, lulu, luoqi } = probability;
      const arr = [
        [0, bobo],
        [bobo, bobo + keke],
        [bobo + keke, bobo + keke + lulu],
        [bobo + keke + lulu, bobo + keke + lulu + luoqi]
      ];
      const randomNum = Math.random();

      arr.forEach((item, index) => {
        if (item[0] <= randomNum && randomNum < item[1]) {
          this.currentCard = index + 1;
        }
      });

      this._updUserInfo();
    },
    _updUserInfo() {
      const { openId } = getApp().globalData;

      this.$request
        .post('/present', {
          wx_id: openId,
          life: this.currentCard == 1 ? 1 : 0,
          eye: this.currentCard == 2 ? 1 : 0,
          time_back: this.currentCard == 3 ? 1 : 0,
          sky: this.currentCard == 4 ? 1 : 0
        })
        .then(res => {
          if (res.code == -1) {
            uni.showToast({
              title: '今日抽奖机会已用完, 请明天再来~',
              icon: 'none',
              duration: 2000
            });
            return;
          }
          this.hasGetCard = true;
          this.showMask = true;

          this._getUserInfo();
        });
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
                      url: this._getCardFile(item.value)
                    })
                  );
                }
              }
            });
          }

          this.userCards = arr;
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
.my-card {
  background-color: #278c53;
  height: 100%;
  .my-card-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 30rpx 30rpx 0 0;
    background-color: #fff;
    .tabs {
      display: flex;
      height: 80rpx;
      .tab {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 50%;
        height: 100%;
        &.active {
          .tab-group {
            text {
              color: #278c53;
            }
            .tab-line {
              background: #278c53;
            }
          }
        }
        .tab-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          text {
            font-size: 28rpx;
            color: 333;
            margin-bottom: 10rpx;
          }
          .tab-line {
            width: 80%;
            height: 6rpx;
            border-radius: 3rpx;
            background: transparent;
          }
        }
      }
    }
    .cards {
      height: 75vh;
      overflow: auto;
      padding: 30rpx;
      .cards-wrap {
        display: flex;
        flex-wrap: wrap;
        .card {
          flex-shrink: 0;
          width: 230rpx;
          height: 376rpx;
        }
        .card-front {
          flex-shrink: 0;
          width: 190rpx;
          height: 350rpx;
          margin: 20rpx;
          box-shadow: 0 5rpx 20rpx 10rpx #dfdfdf;
        }
      }
      .instruction {
        position: absolute;
        bottom: 70rpx;
        left: 50%;
        color: #999;
        transform: translate(-50%, 0);
      }
    }
  }
  .popup-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .popup-content {
      .card-front {
        width: 380rpx;
        height: 700rpx;
      }
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
          margin-top: 40rpx;
        }
      }
    }
  }
}
</style>
