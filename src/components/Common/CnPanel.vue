<template>
  <div id="cnt">
    <cn-navigation></cn-navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import CnNavigation from './CnNavigation.vue';
export default {
  name: 'CnPanel',
  components: {
    CnNavigation
  }
}
</script>
<style lang='stylus' scoped>
#cnt
  float left
  width 75%
</style>