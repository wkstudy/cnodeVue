<template>
  <div class="main">
    <div>
      <header>
        <div>
          <span 
            v-show="detail.top || detail.good"
            class="label" 
          >{{label}}</span>
          <span class="title">{{detail.title}}</span>
        </div>
        <ul>
          <li>
            发布于<span>{{cancelTime(detail.create_at)}}</span>
          </li>
          <li>
            作者 <span v-if='detail.author'>{{detail.author.loginname}}</span>
          </li>
          <li>
            <span>{{detail['visit_count']}}</span>次浏览
          </li>
          <li>
            最后一次编辑是<span>{{cancelTime(detail.last_reply_at)}}</span>
          </li>
          <li>
            来自<span>{{cancelTab}}</span>
          </li>
        </ul>
        <span 
          :class="['clt', collect ? 'collected' : 'not-collect']"
          @click = 'cancelCollect(collect)'
        >{{collectComputed}}</span>
      </header>
      <div id="detail-cnt" v-html='detail.content'>
      </div>
    </div>
  </div>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
export default {
  name: 'CnDetail',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      nowTime: new Date(),
      collect: false
    }
  },
  watch: {
    detail () {
      if (this.detail) {
        this.collect = this.detail.is_collect
      }
    }
  },
  computed: {
    label () {
      if (this.detail.top) {
        return '置顶';
      } else if (this.detail.good) {
        return '精华';
      }
    },
    cancelTab () {
      var value = '';
      switch (this.detail.tab) {
        case 'share':
          value = '分享';
          break;
        case 'ask':
          value = '问答';
          break;
        case 'good':
          value = '精华';
          break;
        case 'job':
          value = '招聘';
          break;
        default:
          console.log(value)
          break;
      }
      return value;
    },
    collectComputed () {
      if (this.collect) {
        return "取消收藏";
      } else {
        return '收藏'
      }
    }
  },
  methods: {
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
    cancelTime (old) {
      var now = this.nowTime;
      old = new Date(old);
      return this.dValue(old, now)
    },
    getValFromCookie (key) {
      if (CookieUtil.get(key)) {
        return CookieUtil.get(key);
      } else {
        
        //  如果没有登录的时候 需要跳转登录页面
        this.$router.push({path: '/login'});
      }
    },
    cancelCollect (collect) {
      var _this = this,
          url = '',
          id = _this.$route.query.id, 
          akn = this.getValFromCookie('accesstoken');

      if (_this.collect) {
        url = '/api/v1/topic_collect/de_collect';
      } else {
        url = '/api/v1/topic_collect/collect';
      }

      //  发送相关请求
      _this.$axios.post(url, {
          topic_id: id,
          accesstoken: akn
        })
        .then(function (response) {
          if (response.data.success) {
            _this.collect = !_this.collect;
          }
        })
        .catch(function (error) {
          console.log(eror)
        })
      
    }
  }
}
</script>
<style lang='stylus' scoped>
.main
  padding 1rem
  background-color #fff

header
  border-bottom 1px solid #e5e5e5
  position relative
  padding 1rem
.label
  background-color #80bd01
  padding .2rem .4rem
  color #fff
  font-size 1.2rem
  border-radius 3px
.title
  font-size 2.2rem
  font-weight 700
  marign .8rem 0
  color #333
header ul
  margin-top 1.2rem
  padding-left 1rem
header ul li
  display inline-block
header li:before
  content '·'
  font-weight bold
header ul li + li
  margin-left .4rem
.clt
  position absolute
  right 2%
  bottom 6%
  font-size 1.4rem
  line-height 2rem
  padding .3rem 1rem
  cursor pointer
  border-radius 3px
.collected
  background-color #e5e5e5
.not-collect
  background-color #80bd01

</style>
<style lang='stylus'>
#detail-cnt
  width 70%
  padding 1rem
  font-size 1.5rem
  line-height 2rem
#detail-cnt img 
  margin-top 1rem
#detail-cnt ul li
  list-style-type disc
#detail-cnt a // 在长单词或URL地址内部进行换行
  word-wrap break-word
</style>