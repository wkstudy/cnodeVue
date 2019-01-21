<template>
  <section class="add-reply">
    <h2>添加回复</h2>
    <textarea name="add-r" id="add-r" cols="140" rows="10"></textarea>
    <br>
    <button>回复</button>
  </section>
</template>
<script>
export default {
  name: 'CnAddReply'
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