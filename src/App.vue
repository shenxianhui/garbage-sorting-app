<script>
import request from '@/utils/request';

export default {
  // 全局变量
  globalData: {
    userInfo: {}, // 用户信息
    openId: null, // openId
    provider: 'weixin', // 服务提供商
    userCode: '' // 小程序专有，用户登录凭证
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
  onShow() {},
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

          this.getOpenId(res.code);
        }
      });
    },
    // 获取 openId
    getOpenId(code) {
      request
        .post('/login', {
          code
        })
        .then(res => {
          if (res.wx_id) {
            this.globalData.openId = res.wx_id;

            this.registerUser(res.wx_id);
          }
        });
    },
    // 用户注册
    registerUser(wx_id) {
      request
        .post('/register', {
          wx_id
        })
        .then(res => {
          if (res.wx_id) {
            this.openId = res.wx_id;
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
  overflow: hidden;
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
