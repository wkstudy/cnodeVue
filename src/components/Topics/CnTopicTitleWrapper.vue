<template>
  <ul>
    <li v-for='tl in titleList'>
      <img 
        :src='tl.author.avatar_url' 
        :alt="tl.author.loginname"
      >
      <span class="wrapper-reply">{{tl.reply_count}}</span>
      <span class="wrapper-all"> &nbsp;/&nbsp;{{tl.visit_count}}</span>
      <span  
        :class="['wrapper-category', category=='all' && (!tl.top && !tl.good) ? 'wrapper-category-ordinary' : '']" 
        v-show="category == 'all'|| (category == 'share' && (tl.top || tl.good)) || category == 'good'">{{tl.tab|cancelCategory(tl.top,tl.good)}}</span>
      <a 
        :class="category == 'all'|| (category == 'share' && (tl.top || tl.good)) ||category == 'good' ? 'wrapper-title-r' : 'wrapper-title-l'"
        @click='changePage(tl.id)'
        href="javascript:void(0);" 
      >{{tl.title|cancelTitle}}</a>
      <span class='wrapper-time'>{{cancelTime(tl.last_reply_at)}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'CnTopicTitleWrapper',
  props: {
    titleList: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nowTime: new Date()
    }
  },
  filters: {
    cancelCategory (tab, top, good) {

      /*
        * top 为true 代表 置顶
        * good 为true 代表 精华（虽然api中tab有为good的参数，但实际中没看到）
        * 其他种类由tab的种类判断
      */
      var value = '';
      if (top) {
        return '置顶';
      } else if (good) {
        return '精华';
      } else {
        switch (tab) {
          case 'share':
            value = '分享';
            break;
          case 'ask':
            value = '问答';
            break;
          case 'job':
            value = '招聘';
            break;
          default:
            console.log(value);
            break;
        }

        return value;
      }
    },
    cancelTitle (value) {

      // 字数 >60 添加省略号
      return value.length > 60 ? value.substring(0, 60) + '...' : value
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
    }
  }
}
</script>
<style lang='stylus'scoped>
ul
  padding-left 0
li
  position relative
  padding 1rem
  font-size 1.4rem
  background-color #fff
  color #333
  line-height 2.5rem
  height 2.5rem
  border-top 1px solid #f0f0f0
li:hover
  background-color #f5f5f5
li:nth-child(1)
  border none
img
  width 3rem
  height 3rem
  position absolute
li span,
li a
  position absolute
  top 22%
li a
  color #333
li a:visited
  color #888
li a:hover
  text-decoration underline
.wrapper-reply
  color: #9e78c0
  left 6rem
.wrapper-all
  left 8rem
.wrapper-category
  left 14rem
  background-color #80bd01
  color #fff
  font-size 1.2rem
  padding .1rem .4rem
.wrapper-category-ordinary
  background-color #e5e5e5
  color #999
.wrapper-title-r
  left 18rem
.wrapper-title-l
  left 14rem
.wrapper-time
  right 2%
</style>