<template>
  <div id="app">
    {{message}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        message: 'hello world'
      }
    }
  }
</script>
<style lang='stylus' scoped>
#app
  background-color red
</style>