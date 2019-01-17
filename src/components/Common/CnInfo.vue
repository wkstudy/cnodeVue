<template>
  <div>
    <cn-topic-title-wrapper :titleList='title'></cn-topic-title-wrapper>
  </div>
</template>
<script>
import CnTopicTitleWrapper from './CnTopicTitleWrapper.vue';
export default {
  name: 'CnInfo',
  data () {
    return {
      title: []
    }
  },
  created () {
    this.getDataAll('')
  },
  watch: {
    $route (to) {
      if (to.query.tab) {
        this.getDataAll('/?tab=' + to.query.tab)
      } else {
        this.getDataAll('');
      }
    }
  },
  methods: {
    getDataAll (query) {
      var _this = this;
      _this.$axios.get('/api/v1/topics' + query)
        .then(function (response) {
          console.log(response)
          if (response.data.success) {
            _this.title = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  },
  components: {
    CnTopicTitleWrapper
  }
}
</script>
<style>
</style>