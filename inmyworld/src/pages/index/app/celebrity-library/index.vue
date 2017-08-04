<!--
  组件功能
  开发人名字樊姣姣 时间2017.6.14

-->
<template>
  <div v-title="'映天下 | 网红库'"  class="m-min-body" >
    <banner query="true"></banner>
    <index-title  name="独家签约网红" linkText="专业搜索" :checkLogin="true" :path="`${HOST}cptuser/invite/index`"  ></index-title>
    <signing :data="signhosts"></signing>
    <div class="more"><a v-on:click="clickFunc"><span >{{loadingMore}}</span></a></div>

    <div v-if="backTop" class="Back-To-TOP">
      <div :class="['backcon',{smallscreen:smallscreen}]"> <a  href="javascript:scroll(0,0)"><img :src="require('assets/images/index/iconsprite_btbar.png')"></a></div></div>
  </div>

</template>

<script>
import banner from '../com/banner'
import indexTitle from '../com/index-title'
import signing from '../com/signing'
import S from 'service'
import * as apis from './apis'

import Tooltip from 'iview-ui/tooltip';
import { userPromise } from 'user'
import Config from 'src/config'
const HOST = Config.APIHOST;

S.$extend(apis)

export default {
  name: 'PCelebrityLibrary',

  mixins: [],

  props: {
  },
  
  components: {
    banner, indexTitle, signing
  },

  data () {
    return {
      classPrefix: 'c-signing',
      signhosts:[],
      scroll:'',
      loading: false,
      page: 1,
      rows: 20,
      noContent: 1,
      loadingMore: '点击加载更多...',
        HOST,
        path: '',
        backTop: false,
        smallscreen: false
      }
  },

  watch: {

  },

  computed: {
    getCodeParams(){
        return {
          rows: this.rows,
          p: this.page
        }
    }
  },

  methods: {

      clickFunc: function(){
          if(this.noContent ==2 ){
              this.noContent = 1;
              this.celebrity();
          }
      },
    celebrity(){
          this.loading = true;
          this.$S.signing( this.getCodeParams ).then((data)=>{
              this.page = this.page + 1;
              this.signhosts= this.signhosts.concat( data.data );
              if( data.data.length < this.rows ){
                 this.loadingMore = '没有更多了'
                 this.noContent = 0;  // 没有数据可以加载了
              }
              this.loading = false;
          })
    },
    menu(){
      var newtop = document.body.scrollTop || document.documentElement.scrollTop;
      var sH = document.body.scrollHeight;
      var iH = window.innerHeight;

      if( newtop > iH * 1.5 ){
          this.backTop = true;
      }else{
          this.backTop = false;
      }

      // 请求数据的条件
      if( this.top < newtop && this.top + iH + 150 > sH   && !this.loading && this.noContent == 1 ){
        this.celebrity();
      }
      if(  this.page % 5 == 0 ){
          this.noContent = 2; // 不可以加载数据
      }
      this.top = newtop;
    },

  },

  filters: {

  },

  created () {

  },
  mounted () {
    this.$store.commit('LOGIN_JUMP', '/celebrity-library');
    this.celebrity();
      var iw = window.innerWidth;
        console.log('iw',iw)

      if( iw <  1260){
          this.smallscreen = true;
      }
    window.addEventListener('scroll', this.menu);
  },
  destroyed(){
    window.removeEventListener('scroll', this.menu);
  },
  render (h) {
  }
}

</script>

<style lang="less" scoped>
  .m-min-body{min-height: 1200px;}
  .more{
    height: 121px;
    width: 1200px;
    margin: 0 auto;
    border: 60px solid #fff;
    background: #dddddd;
    text-align: center;
    a{
      padding:0 60px;
      background: #fff;
      position: relative;
      top: -6px;
    }
    span{
      padding: 12px 15px;
      border-radius: 5px;
      background: #51BD90;
      color: #fff;
    }
  }
.Back-To-TOP {
  width: 100%;
  height: 0px;
  position: fixed;
  margin: 0 auto;
  bottom: 0px;
  z-index: 99999;
  display: table;
}
.backcon{
  width:1200px;
  margin: 0 auto;
}
.smallscreen{
  width: 100%;
  a{
    margin: 0 10px 10px 0 !important;
  }
}

.Back-To-TOP a {
  display: block;
  width: 50px;
  height: 50px;
  color: #FFF;
  display:table-cell;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  float: right;
  margin-right: -60px;
  margin-bottom: 10px;
}
.Back-To-TOP img {
  width: 24px;
  height: 13px;
  vertical-align: middle;
}

.Back-To-TOP a:hover {
 color: #51BD90;
}

</style>