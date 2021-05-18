<!--
 * @Author: shenxh
 * @Date: 2021-05-16 11:10:42
 * @LastEditors: shenxh
 * @LastEditTime: 2021-05-18 09:45:48
 * @Description: 排行榜
-->

<template>
  <view class="rank">
    <view class="bg-blue"></view>
    <view class="rnak-wrap">
      <view class="rank-user">
        <view class="user-info">
          <view class="user-info-left">
            <view class="user-img">
              <!-- <view class="user-img-default"></view> -->
              <image class="user-img-default" src="@/static/avatar/10.jpg" alt="" />
            </view>
            <view class="user-name">
              <view class="name">suncaiya</view>
              <view class="last-time">上次登录时间：12h前</view>
            </view>
          </view>
          <view class="user-info-right" @click="signIn++">
            签到领能量
          </view>
        </view>
        <view class="rank-num">
          <view class="rank-group">
            <view class="value">{{ mayCardTotal }}</view>
            <view class="label">卡牌</view>
          </view>
          <view class="rank-group">
            <view class="value">11</view>
            <view class="label">排名</view>
          </view>
          <view class="rank-group">
            <view class="value">{{ signIn }}</view>
            <view class="label">签到</view>
          </view>
        </view>
      </view>
      <view class="rank-list">
        <view class="rank-tabs">
          <u-tabs
            :list="tabList"
            :is-scroll="false"
            :current="currentTab"
            active-color="#278c52"
            @change="changeTab"
          ></u-tabs>
        </view>
        <view class="user-list">
          <view v-for="(item, index) in rankList" :key="index" class="user-card">
            <view class="user-card-left">
              <view class="user-num">
                <image v-if="index === 0" src="@/static/img/medal_1.png" alt="" />
                <image v-else-if="index === 1" src="@/static/img/medal_2.png" alt="" />
                <image v-else-if="index === 2" src="@/static/img/medal_3.png" alt="" />
                <view v-else class="num">{{ index + 1 }}</view>
              </view>
              <image class="user-img" :src="item.avatar" alt="" />
              <view class="user-group">
                <view class="label">{{ item.name }}</view>
                <view class="value">{{ item.cardQua }} 张</view>
              </view>
            </view>
            <view class="user-card-right" @click="handleSendCard(item)">赠卡</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 操作菜单 -->
    <u-action-sheet
      :list="menuList"
      v-model="showMenu"
      :tips="menuTips"
      :cancel-btn="true"
      @click="handleMenu"
    ></u-action-sheet>
    <!-- 弹出框 -->
    <u-popup class="rank-popup" v-model="showPopup" mode="center">
      <view class="popup-content">
        <view class="close" @click="showPopup = false"></view>
        <view class="popup-content-wrap">
          <view class="popup-card-bg">
            <image src="@/static/img/popup_bg.png" alt="" />
          </view>
          <view class="popup-card">
            <view class="user-info">
              <image class="user-avatar" :src="currentUser.avatar" />
              <view class="user-group">
                <view class="label">发送给：</view>
                <view class="name">{{ currentUser.name }}</view>
              </view>
            </view>
            <view class="card-title">{{ currentMenu.name }}</view>
            <view class="card-det">{{ currentMenu.detail }}</view>
          </view>
        </view>
        <view class="popup-btn" @click="handleSendBtn()">赠送</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: 'rank',
  components: {},
  props: {},
  data() {
    return {
      signIn: 18,
      mayCardTotal: 0,
      showPopup: false,
      currentTab: 0,
      currentUser: {},
      currentMenu: {},
      showMenu: false,
      tabList: [
        {
          name: '周排行'
        },
        {
          name: '月排行'
        }
      ],
      menuTips: {
        text: '选择赠送的环保卡',
        color: '#999',
        fontSize: 30
      },
      menuList: [
        {
          text: '可可卡',
          name: '可可卡——火眼金睛',
          detail: '在游戏分类模块，帮你找到符合目标的垃圾'
        },
        {
          text: '露露卡',
          name: '露露卡——时光回溯',
          detail: '在游戏分类模块，在关卡中给你额外加上5s时间'
        },
        {
          text: '洛奇卡',
          name: '洛奇卡——苍穹庇护',
          detail: '在游戏分类模块，帮你排除错误的垃圾'
        },
        {
          text: '波波卡',
          name: '波波卡——绝地重生',
          detail: '在游戏分类模块，任务失败后，帮你复活一次'
        }
      ],
      rankList: [],
      weekRankList: [],
      monthRankList: []
    };
  },
  computed: {},
  watch: {},
  onLoad() {
    this.rankList = this.weekRankList = this._mockRank();
    this.monthRankList = this._mockRank('month');

    this._getUserInfo();
  },
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},
  methods: {
    changeTab(idx) {
      this.currentTab = idx;

      if (idx === 0) {
        this.rankList = this.weekRankList;
      } else {
        this.rankList = this.monthRankList;
      }
    },
    handleSendCard(user) {
      this.currentUser = user;
      this.showMenu = true;
    },
    handleMenu(idx) {
      const menu = this.menuList[idx];

      this.currentMenu = menu;
      this.showPopup = true;
    },
    handleSendBtn() {
      uni.showToast({
        title: '赠送成功',
        icon: 'success',
        duration: 2000
      });
      this.showPopup = false;
    },

    _getUserInfo() {
      const { openId } = getApp().globalData;

      this.$request
        .get('/get', {
          wx_id: openId
        })
        .then(res => {
          const { userCards } = res.data;

          if (userCards && userCards.length) {
            let quaTotal = 0;

            userCards.forEach(item => {
              quaTotal += item.quantity;
            });

            this.mayCardTotal = quaTotal;
          }
        });
    },
    _mockRank(type = 'week') {
      let rankList = [];
      let hasAvatar = [];

      for (let i = 0; i < 10; i++) {
        let random = Math.round(Math.random() * 20);
        let randomAvatar = this._getRandom(hasAvatar, 20);

        hasAvatar.push(randomAvatar);

        if (type == 'month') {
          random = Math.round(Math.random() * 100 + 20);
        }
        rankList.push({
          name: '用户' + (i + 1),
          cardQua: random,
          avatar: require(`@/static/avatar/${randomAvatar || 0}.jpg`)
        });
      }

      rankList.sort((a, b) => {
        return b.cardQua - a.cardQua;
      });

      return rankList;
    },
    // 获取不重复的随机数
    _getRandom(list, max) {
      let randomAvatar = Math.round(Math.random() * max);

      if (list.includes(randomAvatar)) {
        return this._getRandom(list, max);
      } else {
        return randomAvatar;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.rank {
  .bg-blue {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 250rpx;
    background: #278c52;
    z-index: -1;
  }
  .rnak-wrap {
    padding: 40rpx;
    .rank-user {
      background-color: #fff;
      border-radius: 18rpx;
      padding: 20rpx;
      box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(28, 44, 29, 0.17);
      .user-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-info-left {
          display: flex;
          align-items: center;
          .user-img {
            flex-shrink: 0;
            width: 135rpx;
            height: 135rpx;
            margin-right: 20rpx;
            .user-img-default {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #eee;
            }
          }
          .user-name {
            .name {
              font-size: 34rpx;
              color: #333333;
              margin-bottom: 10rpx;
            }
            .last-time {
              font-size: 23rpx;
              color: #c4d1d7;
            }
          }
        }
        .user-info-right {
          width: 160rpx;
          height: 52rpx;
          line-height: 52rpx;
          text-align: center;
          background: linear-gradient(90deg, #ff9c3c 0%, #fb731c 100%);
          border-radius: 26rpx 9rpx 4rpx 26rpx;
          font-size: 23rpx;
          color: #fff;
          margin-right: -40rpx;
        }
      }
      .rank-num {
        display: flex;
        justify-content: space-around;
        margin-top: 40rpx;
        .rank-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          .value {
            font-size: 34rpx;
            color: #333;
          }
          .label {
            font-size: 24rpx;
            color: #c4d1d7;
            margin-top: 5rpx;
          }
        }
      }
    }
    .rank-list {
      margin-top: 40rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(28, 44, 29, 0.17);
      overflow: hidden;
      .user-list {
        height: calc(100vh - 500rpx);
        overflow: scroll;
        .user-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30rpx 18rpx;
          border-top: 1px solid #e6e6e6;
          .user-card-left {
            display: flex;
            align-items: center;
            .user-num {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40rpx;
              height: 60rpx;
              margin-right: 10rpx;
              image {
                width: 100%;
                height: 100%;
              }
              .num {
                font-size: 34rpx;
                color: #333;
              }
            }
            .user-img {
              width: 72rpx;
              height: 72rpx;
              border-radius: 10rpx;
              margin-right: 28rpx;
            }
            .user-group {
              .label {
                font-size: 24rpx;
                color: #333;
                margin-bottom: 10rpx;
              }
              .value {
                font-size: 20rpx;
                color: #666;
              }
            }
          }
          .user-card-right {
            width: 100rpx;
            height: 40rpx;
            text-align: center;
            line-height: 40rpx;
            color: #fff;
            background: url('~@/static/img/rank_btn_bg.png') 0 0;
            background-size: 100% 100%;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  /deep/ .rank-popup {
    .u-drawer {
      .u-drawer-content {
        .u-mode-center-box {
          background: transparent;
        }
      }
    }
    .popup-content {
      .close {
        position: absolute;
        right: 10rpx;
        top: 35rpx;
        width: 70rpx;
        height: 70rpx;
      }
      .popup-card-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 600rpx;
        height: 530rpx;
        z-index: -1;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .popup-card {
        width: 600rpx;
        height: 530rpx;
        padding: 20rpx;
        .user-info {
          display: flex;
          align-items: center;
          .user-avatar {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            border: 5rpx solid #fff;
            margin-right: 20rpx;
          }
          .user-group {
            color: #fff;
            opacity: 0.8;
            .label {
              margin-bottom: 10rpx;
            }
          }
        }
        .card-title {
          position: absolute;
          top: 165rpx;
          width: 560rpx;
          text-align: center;
          font-size: 32rpx;
          color: #fff;
          opacity: 0.8;
        }
        .card-det {
          position: absolute;
          bottom: 145rpx;
          width: 560rpx;
          text-align: center;
          font-size: 28rpx;
          color: #fff;
          opacity: 0.8;
        }
      }
    }
    .popup-btn {
      width: 200rpx;
      height: 68rpx;
      margin: 50rpx auto 0;
      text-align: center;
      line-height: 68rpx;
      font-size: 32rpx;
      color: #fff;
      background: #278c52;
      border-radius: 34rpx;
    }
  }
}
</style>
