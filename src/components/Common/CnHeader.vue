<template>
  <header>
    <img src="../../assets/imgs/brand.svg" alt="CNode" @click='handleIcon'>
    <label for="header-search">
      <input type="text" id="header-search">
    </label>
    <nav>
      <li v-for = "title in titles"
      >{{title}}</li>
      <li @click='loginHandle'>{{loginOrNot}}</li>
    </nav>
  </header>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
export default {
  name: 'CnHeader',
  data () {
    return {
      titles:['首页', '新手入门', 'API', '关于', '注册'],
      status: false,
    }
  },
  created () {
    if (CookieUtil.get("loginname")) {
      this.status = true;
    } else {
      this.status = false;
    }
  },
  computed: {
    loginOrNot () {
      if (this.status) {
        return '退出';
      } else {
        return '登录';
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.path == '/') {
        if (CookieUtil.get("loginname")) {
          this.status = true;
        } else {
          this.status = false;
        }
      }
    }
  },
  methods: {
    handleIcon () {
      this.$router.push({path: '/'})
    },
    loginHandle () {
      var _this = this;

      if (!_this.status) {
        _this.$router.push({path: '/login'});
      } else {

        // 如果要退出，则清除cookie
        CookieUtil.unset("loginname", '/', '192.168.0.127');
        CookieUtil.unset("accesstoken", '/', '192.168.0.127');
        // CookieUtil.unset("loginname", '/', 'localhost');
        // CookieUtil.unset("accesstoken", '/', 'localhost');

        _this.status = !_this.status;

        // 页面刷新 （点退出后，使得 sidebar组件中重新判断 cookie 值）
        _this.$router.go(0);
      }
    }
  }
}
</script>
<style lang = 'stylus' scoped>
header
  padding: .5rem 10%
  background-color #444
  font-size 1.4rem
  line-height 2.6rem
  color #ccc
header img
  width 12rem
  cursor pointer
header input
  background-color #888
  color #666
  border 0
  border-radius .5rem
  margin-left 1rem
  line-height 1.8rem
  padding .2rem .4rem
header nav
  width 70%
  text-align right
header nav,
header nav li
  display inline-block
header nav li
  width 8%
  cursor pointer
  text-align center
</style>