<template>
  <div id="sidebar">
    <div v-if='user == null'>
      <span>please login</span>
    </div>
    <div v-else>
      <cn-user-info :userinfo='user'></cn-user-info>
      <div class="topic" v-show="user.loginname == 'wkstudy'">
        <span>发布话题</span>
      </div>
      <cn-other-topics 
        :otherTopics='user.recent_topics'
        v-show="user.loginname != 'wkstudy'"
      ></cn-other-topics>
    </div>
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
import CnUserInfo from './CnUserInfo.vue';
import CnOtherTopics from './CnOtherTopics.vue';
export default {
  name: 'CnSideBar',
  data () {
    return {
      user: {}
    }
  },
  components: {
    CnUserInfo,
    CnOtherTopics
  },
  mounted () {
    var _this = this;
    _this.bus.$on('userName', function (name) {
      _this.getUser('/' + name);
    })
  },
  methods: {
    getUser (username) {
      var _this = this;
      _this.$axios.get('/api/v1/user' + username)
        .then(function (response) {
          if (response.data.success) {
           _this.user = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getAccessToken () {
      var _this = this;
      _this.$axios.post('/api/v1/accesstoken', {
        accesstoken: '5540feb8-1535-4028-9d17-4c88ec5d6cca'
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
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
