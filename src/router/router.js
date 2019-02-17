import Vue from 'vue';
import VueRouter from 'vue-router';
import CnTopics from '../components/Topics/CnTopics.vue';
import CnTopicDetail from '../components/TopicDetail/CnTopicDetail.vue';
import CnLogin from '../components/Login/CnLogin.vue';
import CnUser from '../components/User/CnUser.vue';
import CnUserTopics from '../components/User/CnUserTopics.vue';
import CnUserReplies from '../components/User/CnUserReplies.vue';
import CnUserCollect from '../components/User/CnUserCollect.vue';
import CnPublish from '../components/Publish/CnPublish.vue';

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
    },
    {
      path: '/login',
      name: 'CnLogin',
      component: CnLogin
    },
    {
      path: '/user',
      name: 'CnUser',
      component: CnUser
    },
    {
      path: '/user/topics',
      name: 'CnUserTopic',
      component: CnUserTopics
    },
    {
      path: '/user/replies',
      name: 'CnUserReplies',
      component: CnUserReplies
    },
    {
      path: '/user/collect',
      name: 'CnUserCollect',
      component: CnUserCollect
    },
    {
      path: '/publish',
      name: 'CnPublish',
      component: CnPublish
    }
  ]
})