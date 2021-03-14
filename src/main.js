import Vue from 'vue';
import App from './App';
import request from './utils/request';
import uView from 'uview-ui';

// [按需引入部分组件](https://www.npmjs.com/package/@dcloudio/uni-ui)
import { uniPopup } from '@dcloudio/uni-ui';

Vue.use(uView);

Vue.component('uniPopup', uniPopup);

// 挂载
Vue.prototype.$request = request;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
