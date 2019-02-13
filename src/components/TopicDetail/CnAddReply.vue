<template>
  <section class="add-reply">
    <h2>添加回复</h2>
    <textarea name="add-r" id="add-r" cols="140" rows="10" :value='name' ref='replyCnt'></textarea>
    <br>
    <button @click='reply()'>回复</button>
  </section>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
export default {
  name: 'CnAddReply',
  props: {
    name: {
      type: String
    },
    replyid: {
      type: String
    }
  },
  methods: {
    reply () {
      var _this = this,
          cnt = _this.$refs.replyCnt.value,
          id = _this.replyid;

      if (CookieUtil.get('accesstoken')) {
        _this.postReply(CookieUtil.get('accesstoken'), cnt, id)
      }
    },
    postReply (akn, cnt, id) {
      var _this = this,
         topicId = _this.$route.query.id,
         url = '/api/v1/topic/' + topicId + '/replies',
         postObj = {};

      _this.$axios.post(url, {
          accesstoken: akn,
          content: cnt,
          reply_id: id
      })
        .then(function (response) {
          if (response.data.success) {
            _this.$refs.replyCnt.value = '';

            //  将此回复框隐藏
            _this.$parent.show = !_this.$parent.show;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>
<style lang='stylus' scoped>
.add-reply
  background-color #fff
  margin-top 1rem
  height auto
h2
  padding 1rem
  background-color #f6f6f6
  border-radius 3px 3px 0 0
  line-height 2rem
  color #333
  font-size 1.4rem
textarea
  resize none
  margin 1rem
button
  cursor pointer
  background-color #08c
  color #fff
  font-size 1.4rem
  border none
  padding .3rem 1rem
  line-height 2rem
  letter-spacing: 2px
  margin-left 1rem
  margin-bottom 1rem
</style>