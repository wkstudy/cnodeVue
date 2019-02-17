<template>
<div class="main">
   <header>
        <a href="javascript:void(0)"
            @click='pageToIndex()'>主页</a>
        <span>/ 发布话题</span>
    </header>
    <form>
      <fieldset class="p-tabs">
        <span>选择板块:  </span>
        <select @change='handleChange()' ref='select'>
          <option v-for='(list, index) in modules' :value='vals[index]'>{{list}}</option>
        </select>
        <strong ref='strong'></strong>
      </fieldset>
      <fieldset>
        <label for="title">
          <input type="text" id="title" ref='title' placeholder="请输入标题(10字以上)">
        </label>
      </fieldset>
      <fieldset>
        <textarea id="content" ref='content'></textarea>
      </fieldset>
      <fieldset>
        <label for="accesstoken">
          <input type="hidden" id="accesstoken" :value='akn'>
        </label>
      </fieldset>
      <fieldset>
        <label for="submit">
          <input type="button" id='submit' value="提交" @click='post()'>
        </label>
      </fieldset>
    </form>     
</div>
</template>
<script>
import CookieUtil from '../../assets/js/cookie.js';
export default {
  name: 'CnPublish',
  data () {
    return {
      modules: ['请选择','分享', '问答', '招聘', '客户端测试'],
      vals: ['', 'share', 'ask', 'job', 'dev'],
      tips: ['', '', '提问时，请遵循 《提问的智慧》中提及的要点，以便您更接收到高质量回复。', '为避免被管理员删帖，发帖时请好好阅读《招聘帖规范》', ''],
      akn: ''
    }
  },
  created () {
    var _this = this;
    if (_this.$route.query.id) {

      // 说明是编辑主题而不是创建主题，需要获取该主题内容，并添加到页面上 
      _this.$axios.get('/api/v1/topic/' + _this.$route.query.id)
        .then(function (response) {
          if (response.data.success) {

            _this.$refs.select.value = response.data.data.tab;
            _this.$refs.title.value = response.data.data.title;
            _this.$refs.content.value = response.data.data.content.replace(/<[\/\!]*[^<>]*>/ig,""); // 去除html标签
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    var _this = this;

    //  初始化 strong 中的值
    _this.$refs.strong.innerHTML = _this.tips[_this.$refs.select.selectedIndex]

    //  设置accesstoken的值
    if (CookieUtil.get('accesstoken')) {
      _this.akn = CookieUtil.get('accesstoken')
    }
  },
  methods: {
    pageToIndex () {
      this.$router.push({
        path: '/'
      })
    },
    handleChange () {
      var _this = this;
      _this.$refs.strong.innerHTML = _this.tips[_this.$refs.select.selectedIndex] 
    },
    post () {

      var _this = this,
          url = '';

      if(_this.toValid()) {

        if (_this.$route.query.id) {
          
          //  编辑主题
          url = 'api/v1/topics/update';
        } else {

          //  创建主题
          url = 'api/v1/topics';
        }

        _this.$axios.post(url, {
          accesstoken: _this.akn,
          title: _this.$refs.title.value,
          tab: _this.$refs.select.value,
          content: _this.$refs.content.value,
          topic_id: _this.$route.query.id
        })
        .then(function (response) {
          if (response.data.success) {
            _this.$router.push({
              path: '/topic',
              query: {
                id: response.data.topic_id
              }
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }  
    },
    toValid () {
      var _this = this;

      if (!_this.$refs.select.value) {
        alert("必须选择一个模块");
        return false;
      }

      // 标题 或内容 为空 
      if (_this.$refs.title.value.length < 10 || _this.$refs.content.value.length == 0) {
        return false;
      }
      if (!this.akn) {
        return false;
      }

      return true
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
  font-size 1.4rem
header
  padding 1rem
  background-color #f6f6f6
  border-radius 3px 3px 0 0
header a
  color #80bd01
header span
  color #999
form 
  padding 1rem
fieldset
  border none
.p-tabs
  line-height 2rem
.p-tabs span
  color #333
.p-tabs select
  color #555
  cursor pointer
  width 20rem
  border 1px solid #ccc
  line-height 3rem
  padding .4rem .6rem
#title,
#content
  width 85%
#title
  line-height 2rem
  border 1px solid #ccc
  border-radius .4rem
  padding-left 1rem
#content
  resize none
  height 44rem
  color #333
#submit
  color #fff
  background-color #05c
  border-radius 3px
  cursor pointer
  padding .3rem 1rem
  line-height 2rem
  border none
</style>