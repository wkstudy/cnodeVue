<template>
  <div class="main clr">
    <div v-if='datas != null' class="user-reply">
      <header>
        <a href="javascript:void(0)"
            @click='pageToIndex()'>主页</a>
        <span>/</span>
        <a href="javascript:void(0)"
            @click='pageToUser(datas.loginname)'>{{datas.loginname}}的主页</a>
      </header>
      <section>
        <h3>{{datas.loginname}}参与的话题</h3>
        <cn-user-topic 
            :titleList='datas.recent_replies'
        ></cn-user-topic>
      </section>
    </div>
    <cn-side-bar></cn-side-bar>
  </div>
</template>
<script>
import CnSideBar from '../Common/CnSideBar.vue';
import CnUserTopic from './CnUserTopic.vue';
export default {
  name: 'CnUserReplies',
  components: {
    CnSideBar,
    CnUserTopic
  },
  data () {
    return {
      datas: null
    }
  },
  created () {
    var _this = this,
        name = _this.$route.query.loginname;
    _this.getUserDetail(name)
  },
  methods: {
    getUserDetail (loginname) {
      var url = '/api/v1/user/' + loginname,
          _this = this;
      _this.$axios.get(url)
        .then(function (response) {
          if (response.data.success) {
            _this.datas = response.data.data;
            // console.table(_this.datas.recent_topics)

            // 获取用户名，用于传到 sidebar 中获取用户信息
            _this.bus.$emit('userName', loginname);
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    pageToIndex () {
      this.$router.push({
        path: '/'
      })
    },
    pageToUser (name) {
      this.$router.push({
        path: '/user',
        query: {
          loginname: name
        }
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.main
  width 90%
  min-width 96rem
  margin 1.5rem auto
.user-reply
  float left
  width 75%
  background-color #e1e1e1
header
  background-color #f6f6f6
  border-radius: 3px 3px 0 0
  padding 1rem
  color #80bd01
  font-size 1.4rem
header a
  color #80bd01
h3
  padding: 1rem
  margin-bottom 0
  background-color #f6f6f6
  border-radius 3px 3px 0 0
  font-size 1.4rem
  font-weight normal
</style>