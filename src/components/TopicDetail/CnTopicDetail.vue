<template>
  <div id="main" class="clr">
    <div id="topic-detail">
      <cn-detail :detail='detail'></cn-detail>
      <cn-reply :detail='detail'></cn-reply>
      <cn-add-reply :name='null' :replyid='null'></cn-add-reply>
    </div>
    <cn-side-bar></cn-side-bar>
  </div>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
import CnDetail from './CnDetail.vue';
import CnReply from './CnReply.vue';
import CnAddReply from './CnAddReply.vue';
import CnSideBar from '../Common/CnSideBar.vue';
export default {
  name: 'CnTopicDetail',
  created () {
    var _this = this,
      query = _this.$route.query;
    
    _this.getTopicById(query.id);
  },
  data () {
    return {
      detail: {}
    }
  },
  components: {
    CnDetail,
    CnReply,
    CnAddReply,
    CnSideBar
  },
  watch: {
    $route (to) {

      // 监控路由变化
      if (to.query.id) {
        this.getTopicById(to.query.id);
      }
    }
  },
  methods: {
    getTopicById (id, accesstoken) {
      var _this = this,
          url = '';

      if (CookieUtil.get("accesstoken")) {
        url = '/api/v1/topic/' + id + '?accesstoken=' + CookieUtil.get("accesstoken");
      } else {
        url = '/api/v1/topic/' + id;
      }
      
      _this.$axios.get(url)
        .then(function (response) {
          if (response.data.success) {
            _this.detail = response.data.data;

            // 获取用户名，用于传到 sidebar 中获取用户信息
            _this.bus.$emit('userName', response.data.data.author.loginname);
          }
        })
        .catch(function (error) {
          console.log(error);
        })

    }
  }
}
</script>
<style lang='stylus' scoped>
#main
  width 90%
  min-width 96rem
  margin 1.5rem auto
#topic-detail
  float left
  width 75%
  background-color #e1e1e1
</style>