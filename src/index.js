import './assets/css/common/normalize.css';
import './assets/css/common/animate.css';
import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';


new Vue({
  render:(h) => h(App)
}).$mount(document.body)