<template>
  <div>
    <cn-header></cn-header>
    <cn-cnt></cn-cnt>
    <cn-footer></cn-footer>
  </div>
</template>
<script>
import CnHeader from './components/Common/CnHeader.vue';
import CnFooter from './components/Common/CnFooter.vue';
import CnCnt from './components/Common/CnCnt.vue';

export default {
  name: 'App',
  components: {
    CnHeader,
    CnFooter,
    CnCnt
  }
}
</script>
<style lang='stylus' scoped>
</style>