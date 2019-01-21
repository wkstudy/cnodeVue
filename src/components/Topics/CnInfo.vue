<template>
  <div>
    <cn-topic-title-wrapper :titleList='title' :category='category'></cn-topic-title-wrapper>
    <cn-page></cn-page>
  </div>
</template>
<script>
import CnTopicTitleWrapper from './CnTopicTitleWrapper.vue';
import CnPage from './CnPage.vue';
export default {
  name: 'CnInfo',
  data () {
    return {
      title: [],
      category: ''  // 将导航栏tab参数传递给子组件，便于子组件调整样式
    }
  },
  created () {
    var _this = this,
        route = _this.$route.query.tab;

    //  每次页面加载时都需要判断导航栏有没有参数
    if (route) {

      //  获取数据
      _this.getTopics('/?tab=' + route);

      //  标识类别：all/share/good/ask/jog/dev，分类不同，样式略有不同
      _this.category = route;
    } else {
      _this.getTopics('');
      _this.category = 'all';
    }
  },
  watch: {
    $route (to) {

      // 监控路由变化
      if (to.query.tab) {
        this.getTopics('/?tab=' + to.query.tab);
        this.category = to.query.tab;
      } else {
        this.getTopics('');
        this.category = 'all';
      }
    }
  },
  methods: {
    getTopics (query) {
      var _this = this;
      _this.$axios.get('/api/v1/topics' + query)
        .then(function (response) {
          if (response.data.success) {
            _this.title = response.data.data;

            // 获取用户名，用于传到 sidebar 中获取用户信息(首页默认显示自己的信息)
            _this.bus.$emit('userName', 'wkstudy');
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  },
  components: {
    CnTopicTitleWrapper,
    CnPage
  }
}
</script>
<style>
</style>