<template>
<div>
  <header>
    <a href="javascript:void(0)"
        @click='pageToIndex()'>主页</a>
    <span>/</span>
  </header>
  <section class="cnt">
    <div class="top">
      <img :src="datas.avatar_url" :alt="datas.loginname">
      <span>{{datas.loginname}}</span>
    </div>
    <div class="score">
      <span>{{datas.score}}积分</span>
    </div>
    <div class="collect">
      <a href="javascript:void(0)" 
         v-if='number != 0'
         @click='pageToCollect()'
       >
       {{number}}个话题收藏</a>
    </div>
    <div class="github">
      <span class="iconfont icon-github"></span>
      <a 
          href="javascript:void(0)"
          @click='pageToGithub(datas.githubUsername)'
      > @{{datas.githubUsername}}</a>
    </div>
    <div class="time">
      <span>注册时间{{cancelTime(datas.create_at)}}</span>
    </div>
  </section>
</div>
</template>
<script>
export default {
  name: 'CnUserInfo',
  props: {
    datas: {
      required: true,
      type: Object
    },
    number: {
      required: true,
      type: Number
    }
  },
  methods: {
    cancelTime (old) {
      old = new Date(old);
      var now = new Date();
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
    pageToIndex () {
      this.$router.push({
        path: '/'
      })
    },
    pageToGithub (name) {
      if (name) {
        window.open('https://github.com/' + name, '_blank');
      }
    },
    pageToCollect () {
      var _this = this;
      _this.$router.push({
        path: '/user/collect',
        query: {
          loginname: _this.datas.loginname
        }
      });
    }
  }
}
</script>
<style lang='stylus' scoped>
header
  background-color #f6f6f6
  border-radius: 3px 3px 0 0
  padding 1rem
  color #80bd01
  font-size 1.4rem
header a
  color #80bd01
.cnt
  padding-bottom 1rem
section
  padding-left 1rem
  background-color #fff
section div
  margin-bottom 1rem
.top
  line-height 4rem
  height 4rem
.top img
  width 4rem
  height 100%
.top span
  color #778087
  font-size 1.4rem
.score
  color #333
  font-size 1.4rem
  line-height 2rem
.collect a,
.github a
  color #778087
  font-size 1.4rem
.time
  color #ababab
  font-size 1.4rem
  margin-bottom 2rem
</style>