<template>
  <div>
    <cn-header></cn-header>
    <transition
      appear
      appear-class='appear'
      appear-active-class='appear-active'
    >
      <router-view></router-view>
    </transition>
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
.appear
  opacity 0
.appear-active
  transition opacity 3s
</style>