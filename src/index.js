import './assets/css/common/normalize.css';
import './assets/css/common/animate.css';
import './assets/css/common/base.css';
import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './router/router';
import App from './app.vue';

Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App></App>'
})