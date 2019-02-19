<template>
  <div id="other-topics">
    <h2>作者其他话题</h2>
    <ul>
      <li v-for='tp in otherTopics' @click='pageToTopic(tp.id)'>
        {{tp.title}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CnOtherTopics',
  props: {
    otherTopics: {
      type: Array
    }
  },
  methods: {
    pageToTopic (t_id) {
      this.$router.push({
        query: {
          id: t_id
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
#other-topics
  background-color #fff
  margin-top 1rem
  font-size 1.4rem
h2
  margin 0
  color #51585c
  border-radius 3px 3px 0 0
  padding 1rem
  background-color #f6f6f6
  font-size 1.4rem
ul
  margin 0
  padding 1rem
ul li
  line-height 2rem
  color #778087
  margin-bottom .5rem
  cursor pointer
</style>