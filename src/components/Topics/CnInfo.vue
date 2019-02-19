<template>
<div>
  <cn-topic-title-wrapper :titleList='title' :category='category'></cn-topic-title-wrapper>
  <cn-page :totalpage='tp'></cn-page>
</div>
</template>
<script>
import CnTopicTitleWrapper from './CnTopicTitleWrapper.vue';
import CnPage from '../Common/CnPage.vue';
export default {
  name: 'CnInfo',
  data () {
    return {
      title: [],
      category: '',  // 将导航栏tab参数传递给子组件，便于子组件调整样式
      tp: 0
    }
  },
  created () {
    var _this = this,
        query = _this.$route.query,
        aru = '';

    //  每次页面加载时都需要判断导航栏有没有参数
    if (query) {
      if (query.page && query.tab) {
        aru = '/?tab=' + query.tab + '&page=' + query.page;
        _this.category = query.tab;

        //  设置分页页数
        switch (query.tab) {
          case 'good':
            _this.tp = 17
            break;
          case 'share':
            _this.tp = 33
            break;
          case 'ask':
            _this.tp = 45
            break;
          case 'job':
            _this.tp = 12
            break;
          case 'dev':
            _this.tp = 67
            break;
          default:
            // statements_def
            break;
        }
      } else if (query.page && !query.tab) {
        aru = '/?page=' + query.page;
        _this.category = 'all';
      } else if (!query.page && query.tab) {
        aru = '/?tab=' + query.tab;
        _this.category = query.tab;

        //  设置分页页数
        switch (query.tab) {
          case 'good':
            _this.tp = 17
            break;
          case 'share':
            _this.tp = 33
            break;
          case 'ask':
            _this.tp = 45
            break;
          case 'job':
            _this.tp = 12
            break;
          case 'dev':
            _this.tp = 67
            break;
          default:
            // statements_def
            break;
        }
      } else {
        aru = '';
        _this.category = 'all';

        // 设置分页页数 
        _this.tp = 77;
      }
    } else {
      aru ='';
      _this.category = 'all';

      // 设置分页页数 
      _this.tp = 77;
    }

    _this.getTopics(aru);
  },
  watch: {
    $route (to) {
      // 监控路由变化
      var _this = this,
        query = to.query,
        aru = '';
        
      if (query) {
        if (query.page && query.tab) {
          aru = '/?tab=' + query.tab + '&page=' + query.page;
          _this.category = query.tab;

          //  设置分页页数
        switch (query.tab) {
          case 'good':
            _this.tp = 17
            break;
          case 'share':
            _this.tp = 33
            break;
          case 'ask':
            _this.tp = 45
            break;
          case 'job':
            _this.tp = 12
            break;
          case 'dev':
            _this.tp = 67
            break;
          default:
            // statements_def
            break;
        }
        } else if (query.page && !query.tab) {
          aru = '/?page=' + query.page;
          _this.category = 'all';
        } else if (!query.page && query.tab) {
          aru = '/?tab=' + query.tab;
          _this.category = query.tab;

          //  设置分页页数
        switch (query.tab) {
          case 'good':
            _this.tp = 17
            break;
          case 'share':
            _this.tp = 33
            break;
          case 'ask':
            _this.tp = 45
            break;
          case 'job':
            _this.tp = 12
            break;
          case 'dev':
            _this.tp = 67
            break;
          default:
            // statements_def
            break;
        }
        } else {
          aru = '';
          _this.category = 'all';

          // 设置分页页数 
          _this.tp = 77;
        }
      } else {
        aru = '';
        _this.category = 'all';

        // 设置分页页数 
        _this.tp = 77;
      }

      _this.getTopics(aru);
    }
  },
  methods: {
    getTopics (query) {
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
    CnTopicTitleWrapper,
    CnPage
  }
}
</script>
<style>
</style>