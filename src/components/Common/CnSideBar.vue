<template>
  <div id="sidebar">
    <!-- <div v-if='userinfo == null'>
      <span>please login</span>
    </div> -->
    <div>
      <cn-user-basic-info :userinfo='userinfo'></cn-user-basic-info>
      <div class="topic" v-if="userinfo != null && userinfo.loginname == selfName">
        <span @click='pageToPublish()'>发布话题</span>
      </div>
      <cn-other-topics 
        :otherTopics='userinfo.recent_topics'
        v-if="userinfo != null && userinfo.loginname != selfName"
      ></cn-other-topics>
    </div>
    <ul class="community">
      <li>
        <img src="../../assets/imgs/ruby-china.png" alt="community">
      </li>
      <li>
        <img src="../../assets/imgs/golangtc-logo.png" alt="community">
      </li>
      <li>
        <img src="../../assets/imgs/phphub-logo.png" alt="community">
      </li>
      <li>
        <img src="../../assets/imgs/testhome.jpg" alt="community">
      </li>
    </ul>
    <div class="qr-code">
      <h2>客户端二维码</h2>
      <div>
        <img src="../../assets/imgs/erweima.jpg" alt="address">
      </div>
      <span>客户端源码地址</span>
    </div>
  </div>
</template>
<script>
import CnUserBasicInfo from './CnUserBasicInfo.vue';
import CnOtherTopics from './CnOtherTopics.vue';
import CookieUtil from '../../assets/js/cookie.js';

export default {
  name: 'CnSideBar',
  data () {
    return {
      userinfo: null,
      selfName: ''
    }
  }, 
  components: {
    CnUserBasicInfo,
    CnOtherTopics
  },
  created () {
    var _this = this,
        path = _this.$route.path;
      if (path == '/') {

        // 首页
        if (CookieUtil.get("loginname")) { 
          _this.selfName = CookieUtil.get("loginname");
          _this.getUser('/' + CookieUtil.get('loginname'));
        }
      } else if (path == '/user') {
        //  用户详情页
        _this.getUser('/' + _this.$route.query.loginname)
      } else {
        // 具体话题页 
        _this.bus.$on('userName', function (name) {
          console.log(name)
          _this.getUser('/' + name);
        });
      }
      
  },
  methods: {
    getUser (username) {
      var _this = this;
      _this.$axios.get('/api/v1/user' + username)
        .then(function (response) {
          if (response.data.success) {
           _this.userinfo = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    pageToPublish () {
      this.$router.push({path: '/publish'});
    }
  }
}
</script>
<style lang='stylus' scoped>
#sidebar
  float right
  width 24%
  margin-left 1%
.topic
  margin-top 1rem
  margin-bottom 1rem
  background-color #fff
  padding 1rem
.topic span
  border-radius 3px 
  background-color #80bd01
  padding .3rem 1rem
  font-size 1.4rem
  color #fff
  cursor pointer
  letter-spacing 2px
  line-height 2.4rem
.community img
  width 15rem
  cursor pointer
.community
  padding-left 1rem
.community li
  padding-left 2rem
  text-align left
.community, 
.qr-code
  background-color #fff
  margin-top 1rem
  text-align center
  padding-bottom 1rem
h2
  margin 0
  text-align left
  color #51585c
  border-radius 3px 3px 0 0
  padding 1rem
  background-color #f6f6f6
  font-size 1.4rem
.qr-code h2 + div
  padding 1rem
</style>
