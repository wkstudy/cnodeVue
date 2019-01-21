import './assets/css/common/normalize.css';
import './assets/css/common/animate.css';
import './assets/font/iconfont.css';
import './assets/css/common/base.css';
import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './router/router';
import App from './app.vue';

Vue.prototype.$axios = axios;
Vue.prototype.bus = new Vue(); // 非父子组件间传值

new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App></App>'
})