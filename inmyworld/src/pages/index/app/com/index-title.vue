<!--
  网红签约
  开发人名字 时间

-->
<template>
  <div class="base-1200">
    <div class="p">
      <span class="h3">{{name}}</span>
      <a v-if=" linkText "  @click="jump()" >{{linkText}} <span><Icon size="12px" type="ios-arrow-right"></Icon></span></a>
    </div>
  </div>

</template>

<script>
import Icon from 'iview-ui/icon'

export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {
    name: '',
    linkText: '',
    path: '',
      checkLogin: '',
      position: '',
      nextPath:''
  },
  
  components: {
    Icon
  },

  data () {
    return {
      islogin: this.$store.state.User.isLogin
    }
  },

  watch: {

  },

  computed: {

  },

  methods: {
      jump(){
          if( this.checkLogin && !this.islogin ){
              this.$router.push({name: '/login/login', params:{nextPath: this.path}})
          }else{
              if( this.path){
                if( this.path.substring(0, 4) == 'http'){
                    window.location.href = this.path;
                } else{
                    this.$router.push({path: this.path})
                }
              }
          }
      }

  },

  filters: {

  },

  created () {

  },

  mounted () {
  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>


.base-1200{
    
  .p{
    height: 104px;
    line-height: 44px;
    padding-top: 60px;
   
    
    .h3{
      font-size: 24px;
      font-weight: bold;
      color: #282828;
    }

    a{
      font-size: 16px;
      float:  right;
      color: #999;
      span{
        padding-left: 6px;
        font-weight: 600;
      }
      &:hover{
        color: #666; 
      }
      // i{
      //   display: inline-block;
      //   height: 0;
      //   width: 0;
      //   border:6px  solid transparent;
      //   border-left: 6px solid #999;
      //   position: relative;
      //   top: 0px;
      //   margin-left: 0px;
      //   &:after {
      //     content: ' ';
      //     display: inline-block;
      //     height: 0;width: 0;
      //     border: 6px solid transparent;
      //     border-left: 6px solid #fff;
      //     position: absolute;
      //     left: -8px;
      //     top: -6px;
      //   }
      // }
    }
  }

}

</style>