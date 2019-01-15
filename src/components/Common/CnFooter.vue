<template>
  <footer>
    <nav>
      <li>
        <a href="#">RSS</a>
        <span>|</span>
        <a href="#">源码地址</a>
      </li>
      <li>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</li>
      <li>
        <span>服务器赞助商为 </span>
        <img src="http://static.cnodejs.org/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9" alt="UCLOUD">
        <span> ，存储赞助商为</span>
        <img src="http://static.cnodejs.org/Fg0jtDIcTqVC049oVu5-sn6Om4NX" alt="QINIU">
        <span>由</span>
        <img src="http://static.cnodejs.org/FpMZk31PDyxkC8yStmMQL4XroaGD" alt="alinode">
        <span>提供应用性能服务</span>
      </li>
      <li>新手搭建 Node.js 服务器，推荐使用无需备案的 <i>DigitalOcean(https://www.digitalocean.com/)</i></li>
    </nav>
  </footer>
</template>
<script>
  export default {
    name: 'CnFooter'
  }
</script>
<style lang='stylus' scoped>
footer
  background-color #fff
nav
  margin .7rem 10%
nav a
  color #666
  text-decoration none
nav span,
nav li
  color #ababab
  line-height 2rem
nav li img
  vertical-align middle
img[alt='QINIU']
  width 12rem
img[alt='alinode']
  width 16rem
i
  color #08c
</style>