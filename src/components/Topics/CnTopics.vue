<template>
  <div id="main" class="clr">
    <div id="cnt">
      <cn-navigation></cn-navigation>
      <cn-info></cn-info>
    </div>
    <cn-side-bar></cn-side-bar>
  </div>
</template>
<script>
import CnNavigation from './CnNavigation.vue';
import CnInfo from './CnInfo.vue';
import CnSideBar from '../Common/CnSideBar.vue';
export default {
  name: 'CnTopics',
  components: {
    CnNavigation,
    CnInfo,
    CnSideBar
  }
}
</script>
<style lang='stylus' scoped>
#main
  width 90%
  min-width 96rem
  margin 1.5rem auto
#cnt
  float left
  width 75%
</style>