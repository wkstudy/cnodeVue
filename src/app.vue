<template>
  <div>
    <cn-header></cn-header>
    <router-view></router-view>
    <cn-footer></cn-footer>
  </div>
</template>
<script>
import CnHeader from './components/Common/CnHeader.vue';
import CnFooter from './components/Common/CnFooter.vue';

export default {
  name: 'App',
  components: {
    CnHeader,
    CnFooter
  }
}
</script>
<style lang='stylus' scoped>
</style>