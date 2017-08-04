<!--
  完成
  libx@inke.cn 20170609

-->
<template>
  <div class="complete">
    <div class="dui">√</div>
    <h3>设置成功</h3>
    <span>您的新登录密码已设置成功</span>

    <router-link :to="{path:'/login'}" class="btn">点击此处，立刻返回之前的网页</router-link>
    <p>{{timeout}}秒后，自动返回</p>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {

  },
  
  components: {

  },

  data () {
    return  {
        timeout: 3
    }
  },

  watch: {

  },

  computed: {

  },

  methods: {
      ...mapActions({
              setCurrentStep: 'CURRENT_STRP'
      }),
      jump(){
          this.$router.push({path: '/login'} )
      },
      countDown( key ){


          setTimeout(() => {
              var num = this[key] - 1;
              this[key] = num;
              if( num >0 ){
                  this.countDown(key);
              } else{
                  this.$router.push({path: '/login'} )
              }
          }, 1000);



      }
  },

  filters: {

  },

  created () {

  },

  mounted () {
      this.$emit('increment');
      this.countDown('timeout');
      this.setCurrentStep(3)
  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>

  .complete{
    display: flex;
    flex-direction:column ;
    align-items: center;
    font-size: 14px;


    .dui{
      height: 68px;
      width: 68px;
      border: 2px solid #51BF91;
      border-radius: 100%;
      text-align: center;
      line-height: 68px;
      color: #51BF91;
      font-size: 24px;
    }

    h3{
      padding: 14px 0;
      font-size: 22px;

    }

    span{
      font-size: 14px;
      padding-bottom: 20px;
    }

    .btn{
      width: 260px;
      height: 40px;
      border-radius: 3px;
      background: #51bd90;
      text-align: center;
      line-height: 40px;
      color: #fff;

      &:hover{
        background: #47cb89;
      }

    }
    p{
      padding: 10px;
    }
  }


</style>