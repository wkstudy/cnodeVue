<template>
  <header>
    <img src="../../assets/imgs/brand.svg" alt="CNode" @click='handleIcon'>
    <label for="header-search">
      <input type="text" id="header-search">
    </label>
    <nav>
      <li v-for = "title in titles"
      >{{title}}</li>
    </nav>
  </header>
</template>
<script>
  export default {
    name: 'CnHeader',
    data () {
      return {
        titles:['首页', '新手入门', 'API', '关于', '注册', '登录']
      }
    },
    methods: {
      handleIcon () {
        this.$router.push({path: '/'})
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