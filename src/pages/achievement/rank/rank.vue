<!--
 * @Author: shenxh
 * @Date: 2021-05-16 11:10:42
 * @LastEditors: shenxh
 * @LastEditTime: 2021-05-17 14:09:40
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
              <view class="user-img-default"></view>
            </view>
            <view class="user-name">
              <view class="name">用户昵称</view>
              <view class="last-time">上次登录时间：12h前</view>
            </view>
          </view>
          <view class="user-info-right">
            签到领能量
          </view>
        </view>
        <view class="rank-num">
          <view class="rank-group">
            <view class="value">999</view>
            <view class="label">卡牌</view>
          </view>
          <view class="rank-group">
            <view class="value">999</view>
            <view class="label">排名</view>
          </view>
          <view class="rank-group">
            <view class="value">999</view>
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
              <image class="user-img" src="@/static/img/robot.png" alt="" />
              <view class="user-group">
                <view class="label">{{ item.name + (index + 1) }}</view>
                <view class="value">{{ item.cardQua }}张</view>
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
  </view>
</template>

<script>
export default {
  name: 'rank',
  components: {},
  props: {},
  data() {
    return {
      currentTab: 0,
      currentUser: {}, // 当前选中用户
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
          text: '可可卡'
        },
        {
          text: '露露卡'
        },
        {
          text: '洛奇卡'
        },
        {
          text: '波波卡'
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

      console.log(menu);
    },

    _mockRank(type = 'week') {
      let rankList = [];

      for (let i = 0; i < 10; i++) {
        let random = Math.round(Math.random() * 20);

        if (type == 'month') {
          random = Math.round(Math.random() * 100 + 20);
        }
        rankList.push({
          name: '用户',
          cardQua: random
        });
      }

      rankList.sort((a, b) => {
        return b.cardQua - a.cardQua;
      });

      return rankList;
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
}
</style>
