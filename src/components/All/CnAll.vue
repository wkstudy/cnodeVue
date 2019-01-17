<template>
  <div>
    all
  </div>
</template>
<script>
  export default {
    name: 'CnAll',
    created () {
      this.getDataAll()
    },
    methods: {
      getDataAll () {
        this.$axios.get('/api/v1/topics')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>
<style>
</style>