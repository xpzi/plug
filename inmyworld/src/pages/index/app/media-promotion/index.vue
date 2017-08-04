<!--
  组件功能
  开发人名字樊姣姣 时间2017.06.13

-->
<template>
  <div v-title="'映天下 | 自媒体推广'" :class="[`${classPrefix}-wrapper`]">
    <banner :query="true"></banner>
    <media-name medianame="更高效真实的直播推广"></media-name>
    <div class="dujia">
      <div>
        <span class="dujia-dhj">大数据透明化</span>
        <span class="dujia-zs">真实效果分析</span>
        <span class="dujia-ty">统一规范的邀约价格</span>
        <span class="dujia-yj">一键发布智能投放</span>
        <span class="dujia-dgg">多广告位选择</span>
        <span class="dujia-sr">私人定制</span>
        <span class="dujia-dqd">多渠道销售</span>
      </div>
      <img :src="require('assets/images/marketing/marketing1.jpg')">
    </div>

    <media-name medianame="我们的服务"></media-name>
    <div :class="[`${classPrefix}-service`]">
      <div>
        <p>
          <b>独家签约网红</b>
          <span>我们拥有10000+网红资源，活跃用户遍布全国34个省份，国外用户遍及127个国家，涉及金融、汽车、IT数码、美妆、电商、模特、教育、摄影等20多个行业。</span>
          <span>公司对10000+网红信息进行数据分析，包括网红的粉丝数、平均观看人数、观众人数峰值、直播更新频率、网红直播风格属性、网红直播观众互动数据等众多关键指标，深度透明化展示给广告主。</span>
        </p>
        <img :src="require('assets/images/marketing/marketing2.jpg')" :class="[`${classPrefix}-service-img`]">
      </div>
      <div>
        <img :src="require('assets/images/marketing/marketing3.jpg')" :class="[`${classPrefix}-service-img`]">
        <p>
          <b>直播推广</b>
          <span>为您提供直播专属的品牌宣传推广、站内优质广告位，互动性高、稳定可靠，更直观、更快速、更主流的宣传模式，深度品牌和商品的曝光，为你开启最全面优质的视频直播营销新模式。</span>
        </p>
      </div>
      <div>
        <p>
          <b>多资源位选择</b>
          <span>为您提供主播直播间及平台多资源位支持。</span>
          <span>直播间内资源：直播间悬浮窗、定制宣传页、定制礼物、多直播间红包玩法、直播间私信玩法等。</span>
          <span>平台硬广资源：映客直播APP开屏位、banner位、热门位、短视频头条位、短视频话题栏、主页视频头条位等。</span>
        </p>
        <img :src="require('assets/images/marketing/marketing4.jpg')" :class="[`${classPrefix}-service-img`]">
      </div>
      <div>
        <img :src="require('assets/images/marketing/marketing5.jpg')" :class="[`${classPrefix}-service-img`]">
        <p>
          <b>私人定制</b>
          <span>按照您的定制需求，提供专业化数据分析，精准匹配优质网红资源，提供个性化服务。</span>
          <span>您只需提交您的定制需求，我们为你匹配最优质的主播和资源，提供您最专业的个性服务，为您的营销保驾护航。</span>
        </p>
      </div>
      <div>
        <p>
          <b>短视频推广</b>
          <span>为您定制短视频专属营销方案，提供短视频头条营销和主页视频头条营销策略。
短视频传播速度更快，覆盖面更广，影响力更强，将直接命中更多潜在用户。</span>
        </p>
        <img :src="require('assets/images/marketing/marketing6.jpg')" :class="[`${classPrefix}-service-img`]">
      </div>
      <div>
        <img :src="require('assets/images/marketing/marketing7.jpg')" :class="[`${classPrefix}-service-img`]">
        <p>
          <b>线下活动</b>
          <span>我们拥有最专业的策划团队和最优质的网红资源，为您的线下商业活动提供最优质的服务。</span>
        </p>
      </div>
    </div>
    <media-name medianame="服务流程"></media-name>
    <div :class="[`${classPrefix}-process`, 'base-1200']">
      <p>
        <span>广告主告知我们自身需求，<br/>在线选择主播和服务项目</span>
        <span>针对广告主订单信息，<br/>平台联系主播，<br/>详细介绍需求</span>
        <span>主播确认接受邀约</span>
        <span>广告主验收直播信息，<br/>对服务进行满意度评价</span>
        <span>平台审核广告主需求，<br/>客服提供详细流程<br/>和注意事项介绍</span>
        <span>主播确认需求达成协议后，<br/>广告主支付邀约费</span>
        <span>主播按照约定时间、<br/>内容进行直播推广，<br/>并上传直播视频信息</span>
      </p>
      <a @click="_host">我要推广</a>
    </div>


  </div>

</template>

<script>
import banner from '../com/banner'
import mediaName from '../com/media-title'
import Config from 'src/config'
import { userPromise } from 'user'

const HOST = Config.APIHOST;
export default {
  name: 'PMediaPromotion',
  
  mixins: [],

  props: {

  },
  
  components: {
    banner, mediaName
  },

  data () {
    return {
      classPrefix: 'a-media',
      HOST,
      isLogin: this.$store.state.User.isLogin

    } 
  },

  watch: {

  },

  computed: {

  },

  methods: {
      _host(){
        if(  this.isLogin ){
          window.location.href =  `${HOST}cptuser/invite/index`// 登录
        }else{
          // console.log(this);
          this.$router.push({name:'/login/login', params:{nextPath: `${HOST}cptuser/invite/index`}})
        }
      }
  },

  filters: {

  },

  created () {

  },

  mounted () {
       this.$store.commit('LOGIN_JUMP', '/media-promotion');
  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>
@component-prefix: ~'a-media';

.@{component-prefix} {
  &-wrapper {
    background-color: white;
  }

  
  &-process-img {
    width: 926px;
    display: block;
    margin: 70px auto 0;
  } 

  &-service {
    width: 1100px;
    margin: 0 auto;
    display: table;

    div {
      width: 1100px;
      display: table;
    }

    div:nth-child(2n) img {
      float: left;
    }

    &-img {
      width: 320px;
      height: 320px;
      float: right;
    }

    p {
      width: 600px;
      display: table-cell;
      vertical-align: middle;
      font-size: 16px;
      color: #999999;
      letter-spacing: 0;
      line-height: 24px;

      b {
        display: block;
        font-size: 24px;
        color: #282828;
        letter-spacing: 0;
        line-height: 24px;
      }

      span {
        padding-top: 16px;
        display: block;
      }
    }

  }

  &-process {
    padding-bottom: 107px;

   p {
    display: block;
    background: url('~assets/images/marketing/marketing8.jpg') no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    line-height: 22px;
    margin: 50px auto 101px auto;
      span {
        width: 183px;
        height: 66px;
        float: left;
        margin: 23px 0 0 116px;
        &:nth-child(4) { 
          margin-left: 123px; 
          width:180px;
        }
        &:nth-child(5) { 
          margin:93px 0 24px 263px;
        }
        &:nth-child(6){ 
          margin-top: 93px; 
        }
        &:nth-child(7){ 
          margin-top: 93px; 
          margin-left:120px;
        }
      } 
   }

   a {
    width: 500px;
    height: 44px;
    background: #51BF91;
    border-radius: 4px;
    display: block;
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 44px;
    margin: 0 auto;

   }

  }

}


.dujia{
  padding-top: 70px;
  height: 500px;
  /*background: #efefef;*/
  width: 100%;
  div{ width: 1200px; margin:0 auto; height: 0; position: relative;
    span{ position: absolute; color: #6d7380;  }
    .dujia-dhj{ top: 271px ; left: 189px;}
    .dujia-zs{ top: 133px ; left: 368px;}
    .dujia-ty{ top: 368px ; left: 322px;}
    .dujia-yj{ top: 287px ; left: 521px;}
    .dujia-dgg{ top: 190px ; left: 723px;}
    .dujia-sr{ top: 346px ; left: 719px;}
    .dujia-dqd{ top: 293px ; left: 880px;}

  }
  img{
    margin: 0 auto;
    width: 922px;
    display: block;
  }


}

.ytx_main3 div p{ width:183px; height:66px; float:left; padding:17px 0 0 116px;}
.ytx_main3 div p:nth-child(4){ padding-left:123px; width:180px;}
.ytx_main3 div p:nth-child(5){ padding:97px 0 0 263px;}
.ytx_main3 div p:nth-child(6),.ytx_main3 div p:nth-child(7){ padding-top:97px;}
.ytx_main3 div p:nth-child(7){ padding-left:120px;}
</style>