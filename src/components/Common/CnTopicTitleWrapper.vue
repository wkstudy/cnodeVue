<template>
  <ul>
    <li v-for='tl in titleList'>
      <img :src='tl.author.avatar_url' :alt="tl.author.loginname">
      <span>{{tl.reply_count}} / {{tl.visit_count}}</span>
      <span>{{tl.tab|cancelCategory(tl.top)}}</span>
      <span>{{tl.title|cancelTitle}}</span>
      <span>{{cancelTime(tl.last_reply_at)}}</span>
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
      }
    },
    data () {
      return {
        nowTime: new Date()
      }
    },
    filters: {
      cancelCategory (tab, top) {
        var value = '';
        if (top) {
          return '置顶';
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
            case 'good':
              value = '精华';
              break;
            default:
              value = '??';
              break;
          }

          return value;
        }
      },
      cancelTitle (value) {
        return value.length > 40 ? value.substring(0, 40) + '...' : value
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
          return m + '月前';
        } else if (d > 0) {
          return d + '天前';
        } else if (h > 0) {
          return h + '小时前';
        } else {
          return min + '分钟前';
        }
      }
    }
  }
</script>
<style lang='stylus'scoped>
img
  width 3rem
  height 3rem
</style>