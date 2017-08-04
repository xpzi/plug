<!--
  通用容器
  libx@inke.cn 20170602

-->
<template>
  <div class="m-container-body">
    <m-header></m-header>
    <slot name="main-container"></slot>
    <m-footer></m-footer>
  </div>
</template>


<script>
import mHeader from './header'

// 这几个不重要的组件 就不用着急渲染出来, 异步去吧
const mFooter = resolve => setTimeout(n => require(['./footer'], resolve))

// 这几个为什么要加载所有页面上面？  已配置在  路由上面了
// const mAbout = resolve => require(['./about'], resolve)
// const mHelp = resolve => require(['./help'], resolve)
// const mAgreement = resolve => require(['./agreement'], resolve)


export default {
  name: 'MContainer',

  components: {
    mHeader, mFooter //, mAbout, mHelp, mAgreement
  },

  data () {
    return {
      
    }
  },


/* 不可删 ， 删除前问一下 */
  // render (h) {  
  //   // const $route = this.$route
  //   // const target = $route.query.target
  //   // const targetMap = {
  //   //   help: <m-help></m-help>,
  //   //   about: <m-about></m-about>,
  //   //   agreement:<m-agreement></m-agreement>
  //   // }
  //   // {targetMap[target] || this.$slots['main-container']}

  //   return <div class="m-container-body">
  //     <div class="topheight"></div>
  //     <m-header ></m-header>
  //     <slot name="main-container"></solt>
  //     <m-footer></m-footer>
  //     <div class="footerheight"></div>
  //   </div>
  // }
}

</script>


<style lang="less" scoped>
@import '~common/less/variable';

.m-container-body {
  min-width: @var-container-width;
  overflow: hidden;
  min-height: 100%;
  padding: 64px 0 200px; 
  position: relative;
}
</style>