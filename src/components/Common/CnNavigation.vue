<template>
  <nav>
    <router-link to='/CnInfo'>全部</router-link>
    <router-link :to = "{path: '', query: {tab: 'good'}}">精华</router-link>
    <router-link :to = "{path: '', query: {tab: 'share'}}">分享</router-link>
    <router-link :to = "{path: '', query: {tab: 'ask'}}">问答</router-link>
    <router-link :to = "{path: '', query: {tab: 'job'}}">招聘</router-link>
    <router-link :to = "{path: '', query: {tab: 'dev'}}">客户端测试</router-link>
  </nav>
</template>
<script>
  export default {
    name: 'CnNavigation'
  }
</script>
<style lang='stylus' scoped>
nav
  background-color #f6f6f6
  color #80bd01
  font-size 1.4rem
  padding-top 1rem
  padding-bottom 1rem
  padding-left 1.6rem
nav a + a 
  margin-left 2rem
</style>