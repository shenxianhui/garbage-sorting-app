<script>
export default {
  // 全局变量
  globalData: {
    userAppInfo: {}, // 用户信息-小程序
    userStoreInfo: {}, // 用户信息-店铺
    provider: 'weixin', // 服务提供商
    userCode: '', // 小程序专有，用户登录凭证
    // 购物车
    shoppingCart: [
      // {
      //   name: '电子产品',
      //   value: 'electronic-product',
      //   checked: true,
      //   children: [
      //     {
      //       name: '手机',
      //       value: 'phone',
      //       checked: true,
      //       quantity: 1,
      //       price: 2999
      //     }
      //   ]
      // }
    ]
  },
  onLaunch() {
    uni.getProvider({
      service: 'oauth',
      success: res => {
        this.globalData.provider = res.provider[0];

        this.login();
      }
    });
  },
  onShow(data) {
    console.log(data);
  },
  onHide() {},
  onError() {},

  methods: {
    // 登录
    login() {
      const { provider } = this.globalData;

      uni.login({
        provider,
        success: res => {
          this.globalData.userCode = res.code;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

html,
body {
  box-sizing: border-box;
  font-size: $xx-font-size-base;
}
page {
  height: 100vh;
  background: $xx-bg-color;
  font-size: $xx-font-size-base;
}
view,
scroll-view {
  box-sizing: border-box;
}
image {
  width: 100rpx;
  height: 100rpx;
}
.checkbox-goods {
  flex-shrink: 0;
  .wx-checkbox-input {
    border-radius: 50%;
  }
  .wx-checkbox-input.wx-checkbox-input-checked {
    color: #fff;
    background: $xx-color-red;
    border-color: $xx-color-red;
  }
}
</style>
