<!--
  账户中心
  开发人名字 时间

-->
<template>
  <div id="account">
    <div class="tabs">
      <router-link :to="{name:'/personal/account/setting'}">修改个人中心</router-link>
      <router-link :to="{name:'/personal/account/settingpassword'}">修改密码</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'PAccount',
  
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

#account{
  background: #fff;
  min-height: 600px;
  border-radius: 4px;
  padding: 26px;
}

.tabs{

  height: 38px;
  line-height: 22px;
  font-size: 16px;

  a{
    float: left;
    padding: 8px 0;
    margin-right: 32px; 
    height: 38px;
  }

  a:hover{
    // color: #282828;
  }
  .router-link-active{
    border-bottom: 2px solid #51bd90;
    color: #51bd90;
  }
}



</style>
