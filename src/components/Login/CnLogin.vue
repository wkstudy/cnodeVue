<template>
  <div class="main">
    <div class="box-login">
      <div>
        <label for="login">
          <input type="text" id="login" placeholder="请输入你的AccessToken" v-model='val' @keyup.enter='getPwd'>
        </label>
      </div>
      <div>
        <button @click='getPwd'>提交</button>
      </div>
    </div>
  </div>
  
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
export default {
  name: 'CnLogin',
  data () {
    return {
      val: '',
      flag: false, // 是否成功获取到accesstoken
      name: ''     // 通过accesstoken得到的loginname
    }
  },
  methods: {
    getPwd () {
      var _this = this;

      // 获取到值
      if (_this.val.length != 0) {
        
        //  获取accesstoken
        _this.getAccessToken(_this.val);
      }
    },
    getAccessToken (ak) {
      var _this = this;
      _this.$axios.post('/api/v1/accesstoken', {
        accesstoken: ak
      })
        .then(function (response) {
          if (response.data.success) {
            
            //  存cookie、accesstoken
            _this.stroageInfo('loginname', response.data.loginname);
            _this.stroageInfo('accesstoken', ak);


            //  如果存cookie成功，则跳转页面
            if (CookieUtil.get('loginname')) {
              _this.$router.push({path: '/'});
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 将登录信息存储到cookie中
    stroageInfo (name, value) {
      var exp = new Date();

      exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);  // 30 天
      // CookieUtil.set(name, value, exp, '/', '192.168.0.127');
      CookieUtil.set(name, value, exp, '/', 'localhost');

    }
  }
}
</script>
<style lang='stylus' scoped>
.main
  width 80%
  background-color #fff
  margin 1rem 10%
  min-height 50rem
  padding-top 10rem
.box-login
  text-align center
  width 30rem
  height 10rem
  margin-left calc(50% - 15rem)
  border 1px solid black
  line-height 10rem
.box-login div
  height 4rem
input
  height 2rem
  line-height 2rem 
  padding 3px 1rem
</style>