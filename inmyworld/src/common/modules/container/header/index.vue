<!--
  公用头部
  libx@inke 20170603

-->

<template>
  <div :class="loginPage ? 'loginPage' : `${classPrefix}-wraper`" :style="headerStyle">
    <Modal ref="dialog" info="您确定要退出登录吗？"  :confirm="confirm"  :cancel="cancel"></Modal>
    <div :class="['base-1200', `${classPrefix}-content`]">
      <router-link :to="{path: '/home'}" :class="`${classPrefix}-logo`">
          <img :class="`${classPrefix}-logo-img`" :src="require('assets/images/header/logo.png')" />
      </router-link>
      <div :class="[`${classPrefix}-links-wrapper`]">
          <template v-if="!isLogin">
            <router-link
              v-for="(item, index) in loginViews"
              :key="item.path"
              :class="[
                `${classPrefix}-links-item`, 
                {
                  [`${classPrefix}-links-active`]: firstPathName(item.path), 
                  ['registerview']: item.path === '/login/register' 
                }
              ]" :to="{ path: item.path }" > {{ item.text }} </router-link>
          </template>
          <template v-else>
            <i-dropdown @on-click="personal"  :class="[`${classPrefix}-links-item`]">
              <!-- <a  class="ivu-dropdown-link-item" :href="HOST +'cptuser/index/index'">
                欢迎&nbsp{{ userInfo.phone }}&nbsp;&nbsp;
                <i-icon type="arrow-down-b"></i-icon>
              </a> -->
              <router-link :class="['ivu-dropdown-link-item', {[`${classPrefix}-links-active`]: firstPathName('/personal')}]"  :to="{name:'/personal/overview'}">
                {{ userInfo.phone }}&nbsp;&nbsp;
                <i-icon type="arrow-down-b"></i-icon>
              </router-link>
              <i-dropdown-menu slot="list">
                <!-- <i-dropdown-item name="cptuser/index/index">个人中心</i-dropdown-item> -->
                <!-- <i-dropdown-item name="cptuser/userset/updateProfile">账户设置</i-dropdown-item> -->
                <i-dropdown-item name="/personal/overview/overall">个人中心</i-dropdown-item>
                <i-dropdown-item name="/personal/account/setting">账户设置</i-dropdown-item>
                <i-dropdown-item name="logout">退出</i-dropdown-item>
              </i-dropdown-menu>
            </i-dropdown>
          </template>
          <router-link
            v-for="(item, index ) in layOutLinks" :key="item.path"
            :class="[
              `${classPrefix}-links-item`,
              {
                [`${classPrefix}-links-active`]: firstPathName(item.path), 
                ['registerview']: item.path === '/login/register' 
              }
            ]" :to="{ path: item.path }" > 
            {{ item.text }} 
          </router-link>

      </div>
    </div>
  </div>
</template>

<script>
import IDropdown from 'iview-ui/dropdown'
import IIcon from 'iview-ui/icon'
import Modal from '../dialog.vue'

import Config from 'src/config'
import store from './store'

import S from 'service'
import * as apis from './apis'
S.$extend(apis)

const HOST = Config.APIHOST;
let pathName = location.pathname
let rootPath = '/'

const routePaths = {
  home: rootPath + 'home',
  login: rootPath + 'login',
  register: rootPath + 'login/register',
  mediaPromotion: rootPath + 'media-promotion',
  celebrityLibrary: rootPath + 'celebrity-library',
  personal: rootPath + 'personal',
  account: rootPath + 'personal/account'
}



export default {
  name: 'MHeader',
  props: {
  },
  components: {
    IDropdown,
    IDropdownMenu: IDropdown.Menu,
    IDropdownItem: IDropdown.Item,
    IIcon,
    Modal
  },
  data () {
    return {
      classPrefix: 'm-header',
      HOST,
      loginPage: false,
      links: [
              {
                path: routePaths.home,
                text: '首页'
              },
              {
                path: routePaths.mediaPromotion,
                text: '自媒体营销推广'
              },
              {
                path: routePaths.celebrityLibrary,
                text: '网红库'
              }
      ],
      loginViews:[
        {
          path: routePaths.register,
          text: '注册'
        },
        {
          path: routePaths.login,
          text: '登录'
        }
      ]

    }
  },
  computed: {
    User () {
      return this.$store.state.User 
    },
    isLogin(){
      // console.log('this.$store.state.User.isLogin ', this.$store.state.User.isLogin )
      return this.$store.state.User.isLogin 
    },
    userInfo(){
      return this.$store.state.User.info  
    },
    layOutLinks(){
      return this.links.reverse();
    },
    headerStyle(){
      let hs = this.$store.state.MHeader.style;
      return this.$common.objectFilter( hs,  (item, _key) => item != null);
    }
  },
  methods: {

    personal( name , vuename){
      if( name === 'logout'){
         this.confirmLogout();
      }else{
        // window.open(HOST + name);
        this.$router.push({ path: name })
      }
    },
    firstPathName(path){
      let routePath = this.$route.path;
      if(path === '/login'  || path === '/login/register'   ){
        if( routePath.indexOf('login')  >= 0){
           this.loginPage = true;
        }
      }else if( routePath.indexOf('login')  < 0 ){
        this.loginPage = false;
      }
      return routePath.indexOf(path) >= 0;
        // if( path === '/login' &&  routePath === '/login/register'){
        //   return false;
        // }
        // return  this.getFirstPathName(routePath) === this.getFirstPathName(path);
    },
    getFirstPathName(path){
      return typeof path === 'string' ? path.split('/') && path.split('/')[1] : '';
    },

    logoutHandler () {
      const { User, $common ,$store, $user, $router } = this;
      // 使用接口从后台退出
      this.$S.EXTINFO() 
      .then( (data) => {
          if( data.code == 100 ){
               // 更新 store 中的用户信息
            $store.commit(User.MUTATION_TYPES.UPDATE_USER_INFO)

            // 更改 user中的 userPromise 状态
            $user._setUserPromiseState({ isLogin: false })

            // 退出后跳转到登录页
            $router.push(routePaths.login)
          }else{
            // this.$Message.error('退出失败!')
          }
      }).catch( err => {
        console.log(  err );
      })
    },
    confirmLogout(){
        this.$refs.dialog.show();
    },
    confirm(){
      this.logoutHandler();
    },
    cancel(){
    }
  },

  beforeCreate () {
    if (this.$store) {
      this.$store.registerModule('MHeader', store)
    }
  },

  created () {
  } 
}
</script>

<style lang="less" scoped>
@import '~common/less/variable';
@component-prefix: ~'m-header';
@container-height: 64px;

.@{component-prefix} {

  @left-padding: 120px;
  @text-color: #989a9c;

  &-wraper {
      position: fixed;
    width: 100%;
    height: @container-height;
    background-color: #22242A;
    color: @text-color;
      z-index: 99999999;
      top:0;
  }
  
  &-content {
    height: @container-height;
    line-height: @container-height;
  }

  &-logo {
    @height: 40px;
    float: left;
    width: 128px;
    position: relative;

    &-img {
      margin-top: (@container-height - @height) / 2;
    }
  }

  &-links-wraper {
    
  }

  &-links {

    &-item {
      line-height: @container-height;
      height: @container-height;
      float: right;
      font-size: 14px;
      letter-spacing: 0;
      margin-left: 48px;
      color: #989a9c;

      &.ivu-dropdown {
        .ivu-dropdown-item {
          &:hover {
            color: @var-theme-color;
          }
        }

        .ivu-dropdown-link-item {
          color: #989a9c;
        }
        
        .m-header-links-active {
          color: @var-theme-color;
        }
      }

      &.m-header-links-active {
        color: #fff;
          font-weight: bold;
      }

    }

    
    .m-header-links-active {
      &.ivu-dropdown {
        .ivu-dropdown-link-item {
          color: @var-theme-color;
        }
      }
    }
  }
}

.registerview{

  position: relative;
  margin: 0 10px;

  &:before{
    content: ' ';
    position: absolute;
    height: 12px;
    width: 2px;
    background: #989a9c;
    top: 26px;
    left: -6px;
  }
}

.loginPage{
  position: absolute;
  width: 100%;
  height: 64px;
  background-color: none;
  color: #ccc;
  top:0;
  z-index: 9999;
}

</style>

<style lang="less">
  .ivu-select-dropdown{
    margin-top: -14px;
  }
</style>