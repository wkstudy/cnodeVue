<template>
  <div id="main" class="clr">
    <div id="user">
      <cn-user-info :datas='datas' :number='number'></cn-user-info>
      <div>
        <h3>最近创建的话题</h3>
        <cn-user-topic 
            :titleList='datas.recent_topics.slice(0, 5)' 
        ></cn-user-topic>
        <div class="more">
          <a href="javascript:void(0)" @click='pageToTopics()'>查看更多>></a>
        </div>
      </div>
      <div>
        <h3>最近参与的话题</h3>
        <cn-user-topic 
            :titleList='datas.recent_replies.slice(0, 5)'
        ></cn-user-topic>
        <div class="more">
          <a href="javascript:void(0)" @click='pageToReplies()'>查看更多>></a>
        </div>
      </div>
    </div>
    <cn-side-bar></cn-side-bar>
  </div>
</template>
<script>
import CnSideBar from '../Common/CnSideBar.vue';
import CnUserInfo from './CnUserInfo.vue';
import CnUserTopic from './CnUserTopic.vue';
export default {
  name: "CnUser",
  data () {
    return {
      datas: {},
      number: 0 // 用户收藏的数组的长度
    }
  },
  components: {
    CnSideBar,
    CnUserInfo,
    CnUserTopic
  },
  created () {
    var _this = this,
        name = _this.$route.query.loginname;

    _this.getUserDetail(name);
    _this.getCollectTopics(name);
  },
  methods: {
    getUserDetail (loginname) {
      var url = '/api/v1/user/' + loginname,
          _this = this;
      _this.$axios.get(url)
        .then(function (response) {
          if (response.data.success) {
            _this.datas = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getCollectTopics (loginname) {
      var url = '/api/v1/topic_collect/' + loginname,
          _this = this;
      _this.$axios.get(url)
      .then(function (response) {
        if (response.data.success) {
          _this.number = response.data.data.length;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    pageToTopics () {
      var name = this.$route.query.loginname;
      this.$router.push({
        path: '/user/topics',
        query: {
          loginname: name
        }
      });
    },
    pageToReplies () {
      var name = this.$route.query.loginname;
      this.$router.push({
        path: '/user/replies',
        query: {
          loginname: name
        }
      });
    }
  }
}
</script>
<style lang='stylus' scoped>
#main
  width 90%
  min-width 96rem
  margin 1.5rem auto
#user
  float left
  width 75%
  background-color #e1e1e1
h3
  padding: 1rem
  margin-bottom 0
  background-color #f6f6f6
  border-radius 3px 3px 0 0
  font-size 1.4rem
  font-weight normal
.more
  background-color #fff
  line-height 2rem
  padding 1rem
.more a
  color #666
</style>