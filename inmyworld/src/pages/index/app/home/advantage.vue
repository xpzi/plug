<!--
  我们的优势
  开发人名字樊姣姣 时间2017.6.9

-->
<template>
  <div class="advantage-content">
    <ul>
      <li>
        <img :src="require('assets/images/index/advantage.jpg')">
        <b>覆盖全国90%直播人群</b>100000000+粉丝
      </li>
      <li>
        <img :src="require('assets/images/index/advantage2.jpg')">
        <b>海量资源任你选</b>10000+网红
      </li>
      <li>
        <img :src="require('assets/images/index/advantage3.jpg')">
        <b>大数据透明化</b>透明网红信息
      </li>
      <li>
        <img :src="require('assets/images/index/advantage4.jpg')">
        <b>真实效果数据追踪</b>推广效果，72小时内即可验收
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {

  },
  
  components: {

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
@advantage-img:100px;


.advantage-content{
  width:1198px; 
  height:320px;
  background: #FFFFFF;
  border: 1px solid #DADADA;
  border-radius: 8px;  
  margin:44px auto 100px;
    img{
      width: @advantage-img;
      height: @advantage-img;
      display: block;
      margin: 61px auto 0;
    }
    li{
      width:298px;
      height:320px;
      border-left: 1px solid #DADADA; 
      float:left;
      text-align:center;
      font-size: 14px;
      color: #787878;
      letter-spacing: 0;
      line-height: 24px;
      &:nth-of-type(1){
        border-left: 0;
      }
    }
    b{ 
      display: block;
      font-size: 16px;
      color: #282828;
      letter-spacing: 0;
      line-height: 24px;
      padding-bottom: 8px;
      padding-top: 47px;

    }
}
    




</style>