<template>
  <div id="main" class="clr">
    <cn-panel></cn-panel>
    <cn-side-bar></cn-side-bar>
  </div>
</template>
<script>
import CnPanel from './CnPanel.vue';
import CnSideBar from './CnSideBar.vue';

export default {
  name: 'CnCnt',
  components: {
    CnPanel,
    CnSideBar
  }
}
</script>
<style lang = 'stylus' scoped>
#main
  background-color #fff
  width 90%
  min-width 96rem
  min-height 40rem
  margin 1.5rem auto
</style>