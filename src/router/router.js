import Vue from 'vue';
import VueRouter from 'vue-router';
import CnInfo from '../components/Common/CnInfo.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'CnInfo',
      component: CnInfo
    }
  ]
})