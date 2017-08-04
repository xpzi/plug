<!--
  精选案例
  开发人名字樊姣姣 时间20170606
item.menu_tab_name
-->
      <!-- :label="item.menu_tab_name" -->
<template>
  <div class="tab-box">
    <div class="tab-border"></div>
  <Tabs value="case-name0" class="h-good-case base-1200">
    <Tab-pane  
      v-for="(item, index) in data"
      :label="item.menu_tab_name"
      class="h-promote" 
      :key="index"
      :name="'case-name'+index"
    >
      <div class="phone_bg" :style="'background: url('+require('assets/images/index/index-good-case.png')+')'">
        <img :src="item.pics" class="h-live-img" />
      </div>
      <div class="h-eye-patch">
        <h4 class="title">
          <b>{{item.product_btitle}}</b>{{item.product_stitle}}
        </h4>
        <router-link class="baseinfo"  :to="{ name: '/celebrity-library/detail', query: { uid: item.uid }}">
          <img :src="item.head_pic" width="64" height="64" />
          <span>
            <b>{{ item.nick }}</b>
            粉丝 {{ item.fans }}
          </span>
        </router-link>
      </div>
      <p class="h-effect">
        <b>推广效果</b>
        <span>&#8226;&nbsp;品牌营销诉求</span>{{item.brand_appeal_contents}}
        <span>&#8226;&nbsp;传播营销策略</span>{{item.spread_oppeal_contents}}
      </p>
      <ul class="h-dadt">
        <li><span><b>{{ formatting(item.viewer_num) }}</b></span>直播观看人数</li>
        <li><span><b>{{ formatting(item.hour_length)}}h</b></span>直播时长</li>
        <li><span><b>{{ formatting(item.comment_num) }}</b></span>直播评论人数</li>
        <li><span><b>{{ formatting(item.people_num) }}</b></span>直播点亮人数</li>
      </ul>
      <p class="h-effect"><b>适合此玩法的产品</b>{{item.cate_range}}</p>
    </Tab-pane>
  </Tabs>
  </div>
</template>
<!---->
<script>
import Tabs from 'iview-ui/tabs'
import {numberFans} from 'utils/common'
export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: ['data'],
  
  components: {
    [Tabs.name]: Tabs,
    [Tabs.Pane.name]: Tabs.Pane
  },
  data () {
    return {

    }
  },

  watch: {

  },

  computed: {

  },

  methods: {
    formatting( num , unit = '.'){

      num = Number(num);
      var yu = num%10000,  chu = num / 10000;

      if( chu <  1){

          if( unit == '.'){
              return num;
          }

          if( yu == 0  ){
              return num + unit;
          }

          return num +unit+'';
      } else {
          switch(unit){
              case '.': unit = 'w'; break;
              case 'w': unit ='y'; break;
          }
          return this.formatting( Math.floor(num/10000), unit )
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

  .tab-border{
    position: absolute;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #dedede;
    border-radius: 8px;
    height: 676px;
    width: 1200px;
    z-index: 0;
    box-shadow: 0 4px 8px #ddd;
  }

// .h-eye-patch{
//    float: left; 
//    width: 798px;
//    font-size: 14px;
//    color: #505050;
//    margin-top: 50px;
// }
// .h-eye-patch span{ 
//   width: 543px;
//   border-right: 1px #E7E7E7 solid; 
//   display: block;
//   float:left;
//   margin-top: 12px;
// }
// .h-eye-patch b{ display: block;
//   font-size: 20px;
//   color: #282828; 
//   padding: 0 0 8px 0;
// }
// .h-eye-patch img{ 
//   width: 64px;
//   height: 64px;
//   display: block; 
//   float: left; 
//   border-radius: 100px; 
//   margin: 0 16px 0 36px;
// }

.h-eye-patch{
  float: left;
  width: 798px;
  margin-top: 50px;
  // height: 100px;

  .title{
    float: left;
    margin-top: 12px;
    font-size: 14px;
    color: #505050;
    b{
      font-size: 20px;
      color: #282828; 
      padding: 0 0 8px 0;
      display: block;
      font-weight: bold;
    }
  }

  .baseinfo{
    float: right;
    position: relative;
    z-index: 999999;
    padding-right: 10px;
    &:before{
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 8px;
      height: 50px;
      width: 1px;
      background: #e7e7e7;
    }

    img{
      width: 64px;
      height: 64px;
      display: block; 
      float: left; 
      border-radius: 100px; 
      margin: 0 16px 0 36px;
    }
    span{
      float:right;
      font-size: 14px;
      line-height: 20px;
      color: #505050;

      b{
        display: block;
        min-width: 120px;
        max-width: 200px;
        font-size: 20px;
        line-height: 28px;
        color: #282828;
        padding: 4px 0;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      }
    }
    // span{
    //   font-size: 14px;
    //   color: #505050;
    //   b{
    //     font-size: 20px;
    //     color: #282828; 
    //     padding: 0 0 8px 0;
    //     display: block;
    //   }
    // }

  }


  
}




.h-effect{ 
  width: 749px; 
  display: block;
  font-size: 13px;
  color: #787878; 
  float: left; 
  line-height: 18px;
}
.h-effect b{ 
  display: block;
  font-size: 20px;
  line-height:28px;
  color: #282828; 
  padding-top: 29px;
  padding-bottom: 8px;
  font-weight: bold;
}
.h-effect span{ 
  display: block;
  font-size: 16px;
  color: #282828; 
  line-height: 22px; 
  padding-top: 16px; 
  padding-bottom: 4px;
  font-weight: bold;
}
.h-dadt{ 
  width: 798px;
  float: left; 
  padding-bottom: 37px;
  span{
    font-weight: 600;
  }
}
.h-dadt li{
  width: 120px; 
  height: 120px;
  margin: 40px 44px 0 44px; 
  display: inline; 
  float:left;
  text-align: center; 
  line-height:40px;
  font-size: 13px;
  color: #505050;
}
.h-dadt li span{ 
  width: 120px; 
  height: 120px;
  background: #FFFFFF;
  border: 1px solid #51BF91;
  border-radius: 100px;
  display: block;
  text-align: center;
}
.h-dadt li b{ 
  width: 110px; 
  height: 110px; 
  margin: 4px; 
  border: 1px #51BF91 dashed; 
  display: block; 
  line-height: 110px;  
  border-radius: 100px; 
  font-size: 28px; 
  color: #51BF91;}
.h-dadt li:nth-child(1){ 
  margin-left:0;
}
</style>

<style lang="less">
.h-good-case {

  .ivu-tabs-bar {
    border-bottom: 0;
    margin-top: 0px;
    margin-bottom: 22px;
  }
  .ivu-tabs-nav-scroll{
    text-align: center;
  }
  .ivu-tabs-nav {

    display: inline-block;
    text-align: center;
    float: none;
    // font-size: 32px;
    font-weight: bold;

    .ivu-tabs-ink-bar{
      border-left: 42px solid #ffffff; 
      border-right: 42px solid #ffffff; 
    }
  }

}

.ivu-tabs-nav .ivu-tabs-tab{
  padding: 8px 16px 8px  0 ; margin: 0;
  font-size: 16px;
  box-sizing: content-box;
  span{
    padding: 0 50px;
  }
}

  .phone_bg{
      height: 642px;
      width: 330px;
      float: left;
    position: relative;
    margin: 25px 31px 15px 41px;

    .h-live-img{
      width: 260px;
      height: 462px;
      display: block;
      position: absolute;
      top: 80px;
      left: 35px;
      object-fit: fill;
    }
  }
</style>