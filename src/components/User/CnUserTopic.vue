<template>
  <ul>
    <li v-for="title in titleList ">
      <img 
        :src='title.author.avatar_url' 
        :alt="title.author.loginname"
        @click='pageToUser(title.author.loginname)'
      >
      <a href="javascript:void(0)">{{title.title}}</a>
      <span>{{cancelTime(title.last_reply_at)}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'CnUserTopic',
  props: {
    titleList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      nowTime: new Date()
    }
  },
  methods: {
    cancelTime (old) {
      old = new Date(old);
      var now = this.nowTime;
      return this.dValue(old, now)
    },
    dValue (old, now) {
      var dateDiff  = now.getTime() - old.getTime(),
          y = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)), // 假定每年365天
          m = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30)), // 假定每月30天
          d = Math.floor(dateDiff / (1000 * 60 * 60 * 24)),
          h = Math.floor(dateDiff / (1000 * 60 * 60)),
          min = Math.floor(dateDiff / (1000 * 60));
      if (y > 0) {
        return y + '年前';
      } else if (m > 0) {
        return m + '个月前';
      } else if (d > 0) {
        return d + '天前';
      } else if (h > 0) {
        return h + '小时前';
      } else {
        return min + '分钟前';
      }
    },
    changePage (userId) {
      this.$router.push({
        path: '/topic',
        query: {
          id: userId
        }
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
<style lang='stylus' scoped>
ul
  background #fff
  padding-left 0
  margin-top 0
  margin-bottom 0
li  
  box-sizing border-box
  padding-right 1rem
  border-bottom 1px solid #f0f0f0
  position relative
li img
  width 3rem
  height 3rem
  padding 1rem
li span
  position absolute
  right 5%
  top calc(50% - 1rem)
li a
  position absolute
  line-height 3rem
  top calc(50% - 1.2rem)
  color #08c
  left 8%
  font-size 1.6rem
li a:hover
  text-decoration underline
</style>