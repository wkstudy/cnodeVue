<template>
  <div id="user-info">
    <h2>{{title}}</h2>
    <div class="user">
      <img 
        :src="userinfo.avatar_url" 
        :alt="userinfo.loginname"
        @click="pageToUser(userinfo.loginname)">
      <span>{{userinfo.loginname}}</span>
    </div>
    <div class="score">积分： {{userinfo.score}}</div>
    <div class="sign">"这家伙很懒，什么个性签名都没留下。"</div>
  </div>
</template>
<script>
export default {
  name: 'CnUserBasicInfo',
  props: {
    userinfo: {
      type: Object
    }
  },
  computed: {
    title () {
      if (this.userinfo.loginname == 'wkstudy') {
        return '个人信息'
      } else {
        return '作者信息'
      }
    }
  },
  methods: {
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
<style lang='stylus' scoped>
#user-info
  background-color #fff
  padding-bottom 1rem
h2
  margin 0
  color #51585c
  border-radius 3px 3px 0 0
  padding 1rem
  background-color #f6f6f6
  font-size 1.4rem
.user
  position relative
  font-size 1.4rem
  padding 1rem
img
  cursor pointer
  width 4.8rem
  height 4.8rem
span
  position absolute
  left 7.8rem
  top 2.7rem
.score,
.sign
  padding-left 1.2rem
  font-size 1.4rem
.sign
  margin-top .5rem
  font-style italic
</style>