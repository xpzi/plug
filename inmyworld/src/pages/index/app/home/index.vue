<!--
  组件功能
  开发人名字樊姣姣 时间

-->
<template>
  <div id="home" v-title="'映天下 | 首页'">
    <div class="banner">
      <banner :data="sliderlist"></banner>
    </div>
    <index-title position="center" name="独家签约网红" linkText="更多" path="celebrity-library"></index-title>
    <div class="signing">
      <signing :length="8" :data="medialist"></signing>  
    </div>
    <index-title  name="精选案例"></index-title>
    <div class="good-case">
      <good-case :data="active"></good-case>
    </div>
    <index-titlet medianame="我们的优势" style="border-top:1px #EAEAEA solid; margin-top: 84px; padding-top: 48px;"></index-titlet>
    <advantage></advantage>
    <contact-us></contact-us>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import banner from '../com/banner'
import indexTitle from '../com/index-title'
import signing from '../com/signing'
import goodCase from './good-case'
import indexTitlet from '../com/index-titlet'
import advantage from './advantage'
import contactUs from '../com/contact-us'

import S from 'service'
import * as apis from './apis'
S.$extend(apis)

export default {
  name: 'PHome',

  mixins: [],
 
  props: {

  },
  
  components: {
    banner, indexTitle, signing, goodCase, indexTitlet, advantage, contactUs
  },

  data () {
    return {
        active: null,
        case: null,
        medialist: null,
        sliderlist: null
    }
  },

  watch: {

  },

  computed: {
  },

  methods: {

      ...mapActions({
          setBannerDate: 'BANNER_DATA'
      }),

      postData(){
          this.$S.HOME_DATA().then( ({data}) => {
              this.active = data.active;
              this.case = data.case;
              this.medialist = data.medialist;
              this.setBannerDate( data.sliderlist )
          })
      }
  },

  filters: {

  },

  created () {
    this.$store.commit('LOGIN_JUMP', '/home');
    this.postData();
  },

  mounted () {

  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>

#home{
  background: #fff;

  
  .signing{
    height: 604px;

  }

  .good-case{
    height: 742px;

    position: relative;
  }

  .banner{
    height: 416px;
    // background: #efeaff;
  }
}

</style>