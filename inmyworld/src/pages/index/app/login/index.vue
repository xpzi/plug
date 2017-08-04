<!--
  登录入口页
  libx@inke.cn 20170602
-->
<script>
import { mapState, mapMutations } from 'vuex'

import S from 'service'
import * as apis from './apis'

S.$extend(apis)

const headerBgImg = require('assets/images/index/login/bg.jpg')

const classPrefix = 'p-login-index'
const headerBgStyle = {
  'background': `url(${headerBgImg}) no-repeat 0 0 / 100% auto`
}
let $vm

export default {
  
  mixins: [],

  props: {

  },
  
  components: {
    
  },

  data () {
    return {

    };
  },

  watch: {

  },

  computed: {
    ...mapState({
      MHeader: 'MHeader'
    })
  },

  methods: {
    ...mapMutations({

    }),

    headerBgChange () {
      $vm.$store.commit($vm.MHeader.MUTATION_TYPES.UPDATE_HEADER_STYLE, headerBgStyle)
    }
  },

  filters: {

  },

  created () {
    $vm = this
  },

  mounted () {
    this.headerBgChange()
  },
  
  render (h) {
        // <router-link to={{path: '/login/forgetPass'}}>忘记密码</router-link>
        // <router-link to={{path: '/login'}} >登录</router-link>
        // <router-link to={{path: '/login/register'}} >注册</router-link>
    return (
      <div class={`${classPrefix}-wraper`}>
        <img class={`${classPrefix}-img`} src={headerBgImg}></img>
        <div class={`${classPrefix}-container-wraper`}>
          <div class={`${classPrefix}-container`}>
            <router-view></router-view>
          </div>
        </div>
      </div>
    )
  },

  // beforeRouteEnter (to, from, next) {
    
  // },

  beforeRouteLeave: (to, from, next) => {
    $vm.$store.commit($vm.MHeader.MUTATION_TYPES.UPDATE_HEADER_STYLE, {
      'background': ''
    })
    next()
  }
}

</script>


<style lang="less" scoped>
@import '~common/less/variable';

@component-prefix: ~'p-login-index';
@container-height: 600px;
@header-height: 64px;

.@{component-prefix} {

  &-wraper {
    // overflow: hidden;
    position: relative;
    // top: -64px;
    // margin-top: -64px;
    // width: 100%;
    // min-height: @container-height;
    // background: url('~assets/images/index/login/bg.png') no-repeat;
  }

  &-img {
    margin-top: -@header-height;
    min-height: 680px - @header-height;
  }

  &-container-wraper {
    position: absolute;
    top: -@header-height;
    left: 50%;
    height: 100%;
    width: @var-container-width;
    margin-left: -@var-container-width / 2;
    background-color: transparent;
  }

  &-container {
    position: absolute;
    right: 100px;
    top: 115px;
    width: 360px;
    padding: 45px 35px 35px;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;
  }
}
</style>