import Vue from 'vue';
import VueRouter from 'vue-router';
import CnTopics from '../components/Topics/CnTopics.vue';
import CnTopicDetail from '../components/TopicDetail/CnTopicDetail.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'CnTopics',
      component: CnTopics
    },
    {
      path: '/topic',
      name: 'CnTopicDetail',
      component: CnTopicDetail
    }
  ]
})