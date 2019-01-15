import './assets/css/common/normalize.css';
import './assets/css/common/animate.css';
import './assets/css/common/base.css';
import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/router';
import App from './app.vue';


new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App></App>'
})