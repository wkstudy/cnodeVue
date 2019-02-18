<template>
  <ul>
    <li :class="[curPage == 1 ? 'forbidden': '']"
        @click='pageToSide(1, $event)'
    >&laquo;</li>
    <li :class="[curPage == 1 ? 'forbidden': '']"
        @click='pageToNear(-1, $event)'
    >&lsaquo;</li>
    <li>{{curPage}}</li>
    <li :class="[curPage == totalpage ? 'forbidden': '']"
        @click='pageToNear(1, $event)'
    >&rsaquo;</li>
    <li :class="[curPage == totalpage ? 'forbidden': '']"
        @click='pageToSide(totalpage, $event)'
    >&raquo;</li>
  </ul>
</template>
<script>
export default {
  name: 'CnPage',
  props: {
    totalpage: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      curPage: 0
    }
  },
  created () {
    var _this = this;
    if (_this.$route.query.page) {
      _this.curPage = _this.$route.query.page
    } else {
      _this.curPage = 1;
    }
  },
  watch: {
    $route () {
      var _this = this;

      if (_this.$route.query) {
        if (_this.$route.query.page) {
          _this.curPage = _this.$route.query.page;
        } else {
          _this.curPage = 1;
        }
      } else {
        _this.curPage = 1;
      }
    }
  },
  methods: {
    pageToSide(num ,event) {
      var _this = this,
          aru = _this.$route.query;

      // 如果此时不应该触发点击事件，则直接返回
      if (event.currentTarget.classList.contains('forbidden')) {
        return ;
      } 

      // 判断导航中有没有参数
      if (!aru) {
        _this.$router.push({
          query: {
            page: num
          }
        })
      } else if (aru.tab) {
         _this.$router.push({
          query: {
            page: num,
            tab: aru.tab
          }
        })
      } else {
        _this.$router.push({
          query: {
            page: num
          }
        })
      }
    },
    pageToNear (num, event) {
      var _this = this,
          aru = _this.$route.query;


      if (event.currentTarget.classList.contains('forbidden')) {
        return ;
      } 

      // 判断导航中有没有参数
      if (!aru) {
        _this.$router.push({
          query: {
            page: _this.curPage + num
          }
        })
      } else if (aru.tab) {
         _this.$router.push({
          query: {
            page: _this.curPage + num,
            tab: aru.tab
          }
        })
      } else {
        _this.$router.push({
          query: {
            page: _this.curPage + num
          }
        })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
ul
  background-color #fff
  margin-top 0
  font-size 0
  padding-top 1.2rem
  padding-bottom .4rem
li 
  cursor pointer
  font-size 1.4rem
  display inline-block
  padding 4px 12px
  line-height 2rem
  text-decoration none
  border 1px solid #ddd
.forbidden
  cursor not-allowed
</style>