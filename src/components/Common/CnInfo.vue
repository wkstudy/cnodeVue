<template>
  <div>
    <cn-topic-title-wrapper :titleList='title' :category='category'></cn-topic-title-wrapper>
  </div>
</template>
<script>
import CnTopicTitleWrapper from './CnTopicTitleWrapper.vue';
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
      _this.getDataAll('/?tab=' + route);

      //  标识类别：all/share/good/ask/jog/dev，分类不同，样式略有不同
      _this.category = route;
    } else {
      _this.getDataAll('');
      _this.category = 'all';
    }
  },
  watch: {
    $route (to) {

      // 监控路由变化
      if (to.query.tab) {
        this.getDataAll('/?tab=' + to.query.tab);
        this.category = to.query.tab;
      } else {
        this.getDataAll('');
        this.category = 'all';
      }
    }
  },
  methods: {
    getDataAll (query) {
      var _this = this;
      _this.$axios.get('/api/v1/topics' + query)
        .then(function (response) {
          if (response.data.success) {
            _this.title = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  },
  components: {
    CnTopicTitleWrapper
  }
}
</script>
<style>
</style>