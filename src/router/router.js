import Vue from 'vue';
import VueRouter from 'vue-router';
import CnAll from '../components/All/CnAll.vue';
import CnEssence from '../components/Essence/CnEssence.vue';
import CnShare from '../components/Share/CnShare.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'CnAll',
      component: CnAll
    },
    {
      path: '/CnAll',
      redirect: '/'
    },
    {
      path: '/CnEssence',
      name: 'CnEssence',
      component: CnEssence
    },
    {
      path: '/CnShare',
      name: 'CnShare',
      component: CnShare
    }
  ]
})