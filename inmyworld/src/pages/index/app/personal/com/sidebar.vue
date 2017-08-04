<!--
  个人中心侧边栏
  libx@inke 20170603

-->
<script>
import { personalRouteSpace as routeSpace } from '@/router/routes/config'

const classPrefix = 'p-personal-sidebar'

const sideBarRoutes = [
  {
    moduleName: '总览',
    children: [{
      path: routeSpace + '/overview/overall',
      text: '整体情况'
    }]
  },
  {
    moduleName: '我要推广',
    children: [{
      path: routeSpace + '/promote/invitation',
      text: '网红邀约'
    }, {
      path: routeSpace + '/promote/customize',
      text: '需求定制'
    }]
  },
  {
    moduleName: '订单管理',
    children: [{
      path: routeSpace + '/order/my',
      text: '我的订单'
    }]
  },
  {
    moduleName: '财务管理',
    children: [{
      path: routeSpace + '/financial/balance',
      text: '账户余额'
    }, {
      path: routeSpace + '/financial/flow',
      text: '财务流水'
    }]
  },
  {
    moduleName: '账户中心',
    children: [{
      path: routeSpace + '/account/setting',
      text: '账户设置'
    }]
  }

]

export default {
  name: 'ComSidebar',

  mixins: [],

  props: {

  },
  
  components: {

  },

  data () {
    return {
      sideBarRoutes,
      routeSpace
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
    const { routeSpace } = this

    return <div class={`${classPrefix}-container`}>
      {
        sideBarRoutes.map((item) => {
          return (
            <div class={`${classPrefix}-row`}>
              <h6 class={`${classPrefix}-title`}>{item.moduleName}</h6>
              <ul class={`${classPrefix}-list`}>
                {
                  item.children.map((sub) => {
                    return <li class={`${classPrefix}-item`}>
                      <router-link class={`${classPrefix}-item-link`} to={{ path: sub.path }}>{ sub.text }</router-link>
                    </li>    
                  })
                }
              </ul>
          </div>
          )
        })
      }
    </div>
  }
}

</script>


<style lang="less" scoped>
@import '~common/less/variable';
@component-prefix: ~'p-personal-sidebar';

.@{component-prefix} {

  &-container {

  }

  &-row {
    margin-bottom: 25px;
  }

  &-title {
    font-size: 14px;
    line-height: 14px;
    color: #282828;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &-list {

  }

  &-item {

    &-link {
      line-height: 22px;
      font-size: 13px;
      color: #505050;
      
      &.router-link-active {
        color: @var-theme-color;
      }
    }

  }

}


</style>