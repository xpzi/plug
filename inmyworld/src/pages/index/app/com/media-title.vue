<!--
  网红签约
  开发人名字 时间

-->
<template>
  <div class="base-1200">
    {{medianame}}<span></span>
  </div>

</template>

<script>

export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {
    medianame: ''
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
div{
  display:block;
  text-align:center;
  font-size: 30px;
  color: #282828;
  line-height: 30px; 
  padding-top:90px;
  font-weight: bold;
  span{
    width:60px; 
    height:4px; 
    background: #CCCCCC;
    border-radius:100px; 
    display:block; 
    margin:20px auto 0;
  }
}

</style>