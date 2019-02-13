<template>
  <section class="replies" v-show='detail.reply_count != 0'>
    <div>{{detail.reply_count}} 回复</div>
    <ul>
      <li v-for='(reply, index) in detail.replies'>
        <div class="reply-title clr">
          <a href="javascript:void(0)">
            <img :src='reply.author.avatar_url' 
                  :alt="reply.author.loginname"
                  @click='pageToUser(reply.author.loginname)'>
          </a>
          <section class="user-info">
            <span>{{reply.author.loginname}}</span>
            <span>{{index + 1}}楼</span>
            <span>{{cancelTime(reply.create_at)}}</span>
          </section>
          <section class="user-common">
            <span
              class="iconfont icon-dianzan" 
              :class="[reply.ups.length == 0 ? 'zero':'',reply.is_uped ? 'dianzan-y' : '']"
              @click='uped(reply.id,index)'
            >{{reply.ups.length}}</span>
            <span class="iconfont icon-icon_reply" @click='handleReply()'></span>
          </section>
        </div>
        <div class="reply-cnt" v-html='reply.content'></div>
        <transition name='reply'>
          <cn-add-reply 
            v-show='show' 
            :name=" '@' + reply.author.loginname" 
            :replyid='reply.reply_id'
          ></cn-add-reply>
        </transition>
      </li>
    </ul>
  </section>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
import CnAddReply from './CnAddReply.vue';
export default {
  name: 'CnReply',
  props: {
    detail: {
      type: Object
    }
  },
  components: {
    CnAddReply
  },
  data () {
    return {
      nowTime: new Date(),
      show: false
    }
  },
  mounted () {
    console.log(this.detail)
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
    pageToUser (name) {
      this.$router.push({
        path: '/user',
        query: {
          loginname: name
        }
      });
    },
    uped (id, index) {
      console.log(id)
      var url = '/api/v1/reply/' + id + '/ups',
          _this = this;

      if (CookieUtil.get('accesstoken')) {
        _this.$axios.post(url, {
          accesstoken: CookieUtil.get('accesstoken')
        })
          .then(function (response) {
            console.log(response)
            if (response.data.success) {
              if (response.data.action == 'up') {
                console.log(1)
                _this.detail.replies[index].is_uped = true;
                _this.detail.replies[index].ups.length++;
              } else {
                _this.detail.replies[index].is_uped = false;
                _this.detail.replies[index].ups.length--;
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    handleReply () {
        this.show = !this.show;
    }
  }
}
</script>
<style lang='stylus' scoped>
.replies
  margin-top 1rem
  background-color #fff
.replies > div:nth-child(1)
  padding 1rem
  background-color #f6f6f6
  border-radius 3px 3px 0 0
.replies ul
  padding 1rem
.replies li
  padding-top 1rem
  padding-right 1rem
  border-top 1px solid #f0f0f0
.reply-title
  font-size 1.4rem
.reply-title a
  float left
.reply-title a img
  width 3rem
  height 3rem
.reply-title section
  display inline-block
.reply-title .user-info
  margin-left 1rem
.reply-title .user-common
  float right
.iconfont
  cursor pointer
.zero
  display none 
li:hover .zero
  display inline-block
.dianzan-y
  font-weight bold
  font-style italic
.reply-cnt
  font-size 1.5rem
  padding-left 1rem  
.reply-enter,
.reply-leave-to
  height 0
  opacity 0
.reply-enter-active,
.reply-leave-active
  transition all 1s
</style>