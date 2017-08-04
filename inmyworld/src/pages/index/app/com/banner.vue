 <template>
 <div class="bannerposi">
   <div class="bannerposibox">
     <div id="banner">
        <img v-for="(item, index) in bannerData" :key="index"  :src="item.pic " />
    </div>
    </div>
    
 </div>
</template>


<script>
  import Icon from 'iview-ui/icon'

  import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import S from 'service'
  import * as apis from './apis'
  S.$extend(apis)

  import $ from 'jquery';
  import nivoSlider from 'utils/jquery.nivo.slider.pack.js'
  window.$ = $;
  nivoSlider($);
  export default {
    minxins: [],
    props: ['data', 'query'],
    components:{
      Icon
    },
    data(){
      return {}
    },
    computed: {
      ...mapState({
          bannerData(state){
              let bannerData = state.demo.bannerData; 
              if( bannerData == null && !!this.query ){
                this.queryData();
                return null;
              }
              return bannerData;
          }
      }),
    },
    methods: {
      ...mapActions({
          setBannerDate: 'BANNER_DATA'
      }),
      queryData(){
          this.$S.HOME_DATA().then( ({data}) => {
              this.setBannerDate( data.sliderlist )
          })
      }
    },
    mounted(){
      // 页面切换时间
      if( this.bannerData && this.bannerData.length > 0){
        $('#banner').nivoSlider({
          pauseTime: 5000,
          prevText: '',
          nextText: '',
          pauseOnHover: true
        });
      }
    },
    updated(){
      // 页面第一次加载时
      if( this.bannerData && this.bannerData.length > 0){
        $('#banner').nivoSlider({
          pauseTime: 5000,
          prevText: '',
          nextText: '',
          pauseOnHover: true
        });
      }
    }
  }
</script>


<style lang="less">
  
.bannerposi{
  position: relative;
  width: 0px;
  margin: 0 auto;
  height: 416px;

  .bannerposibox{
    position: relative;
    height:  416px;
    width: 2000px;
    left: -1000px;
  }

}

  #banner{
    position: relative;
    img{
      height: 416px;
      object-fit: cover;
    }
    .nivo-controlNav{
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: 0;
      
      .nivo-control{
        display: inline-block;
        height: 10px;
        width: 10px;
        margin: 20px 8px;
        border: 2px solid rgba(255,255,255,0.6);
        border-radius: 100%;
        text-indent: 9999px;
      }
      .active{
         background-color:rgba(255,255,255,0.9);
      }
    }
  }

  /* The Nivo Slider styles */
.nivoSlider {
  position:relative;
}
.nivoSlider img {
  position:absolute;
  top:0px;
  left:0px;
}
/* If an image is wrapped in a link */
.nivoSlider a.nivo-imageLink {
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  border:0;
  padding:0;
  margin:0;
  z-index:6;
  display:none;
}
/* The slices and boxes in the Slider */
.nivo-slice {
  display:block;
  position:absolute;
  z-index:5;
  height:100%;
}
.nivo-box {
  display:block;
  position:absolute;
  z-index:5;
}
/* Caption styles */
.nivo-caption {
  position:absolute;
  left:0px;
  bottom:0px;
  background:#000;
  color:#fff;
  opacity:0.8; /* Overridden by captionOpacity setting */
  width:100%;
  z-index:8;
}
.nivo-caption p {
  padding:5px;
  margin:0;
}
.nivo-caption a {
  display:inline !important;
}
.nivo-html-caption {
    display:none;
}
/* Direction nav styles (e.g. Next & Prev) */
.nivo-directionNav a {
  position: absolute;
  background: red;
  top: 45%;
  z-index: 9;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  font-size: 18px;
  color: rgba(255,255,255, 0.5);
  height: 36px;
  width: 36px;
  background: rgba(0,0,0,0.2);
  border-radius: 100%;
  &:hover{
    color: #fff;
    background: rgba(0,0,0,0.4);
  }
}
.nivo-prevNav {
  left:360px;
  &::before{
    font-family: Ionicons;
    content: "\f3d2";
    position: relative;
  }
}
.nivo-nextNav {
  right:360px;

  &::before{
    content: "\f3d3";
    font-family: Ionicons;
    position: relative;
  }

}
/* Control nav styles (e.g. 1,2,3...) */
.nivo-controlNav a {
  position:relative;
  z-index:9;
  cursor:pointer;
}
.nivo-controlNav a.active {
  font-weight:bold;
}
</style>

<!--
  banner
  开发人名字 樊姣姣 时间 20170606 

-->
<!-- <template>
  <div id="banner"  @mouseenter="autoplay = false" @mouseleave="autoplay = true">
    <Carousel class="c-banner"  :autoplay-speed="5000"   :autoplay="autoplay" v-model="value2">
      <Carousel-item v-for="(item, index) in bannerData" :key="index"  >
        <div class="demo-carousel" :style="{backgroundImage: 'url(' + item.pic +')'}" ></div>
      </Carousel-item>
    </Carousel>
  </div>
</template> -->


<!--
<script>

import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import Carousel from 'iview-ui/carousel'

import S from 'service'
import * as apis from './apis'
S.$extend(apis)


export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],
  props: ['data', 'query'],
  components: {
    [Carousel.name]: Carousel,
    [Carousel.Item.name]: Carousel.Item
  },

  data () {
    return {
      value2: 0,
      autoplay: true
    }
  },

  watch: {

  },

  computed: {
      ...mapState({
          bannerData(state){
              let bannerData = state.demo.bannerData;
              console.log('bannerData', bannerData)
              if( bannerData == null && !!this.query ){
                this.queryData();
                return null;
              }
              return bannerData;
          }
      }),
  },

  methods: {
      ...mapActions({
          setBannerDate: 'BANNER_DATA'
      }),
      queryData(){
        console.log(this)
          this.$S.HOME_DATA().then( ({data}) => {
            // console.log('bannerData data', data)
              this.setBannerDate( data.sliderlist )
              console.log('bannerData data', this.bannerData)
          })
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


<style lang="less">


  #banner{
    height:  416px;
  }

  .c-banner{
    border-radius: 5px;
    overflow: hidden;
  }
.c-banner .ivu-carousel-dots-inside{
  bottom: 18px;
}
.c-banner .ivu-carousel-dots li{
   margin: 0 10px;
}
.c-banner .ivu-carousel-dots li button{
  width: 10px;
  height: 10px;
  border-radius:100%;
  border: 1px solid #fff;
  opacity: 1;
  background: none;
  
}
  .c-banner .ivu-carousel-dots li.ivu-carousel-active button{
    background: #fff;
  }



  .demo-carousel{
    height: 416px;
    /*background-color: #2a2c35 ;*/
    background-position: center;
    background-repeat: no-repeat;
  }


</style> -->