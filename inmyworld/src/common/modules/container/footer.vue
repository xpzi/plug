<!--
  公用底部
  libx@inke 20170603

-->
<script>
const links = [
  {
    target: '/static/about',
    text: '关于我们'
  },
  {
    target: '/static/help',
    text: '帮助中心'
  }
]

const classPrefix = 'm-footer'

export default {

  name: 'MFooter',

  render (h) {
    const $route = this.$route
    const path = $route.path
    const target = this.$route.query.target

    return <div class={`${classPrefix}-wraper`}>
      <div class={[`${classPrefix}-links`]}>
        {
          links.map((obj) => {
            return <router-link 
              class={{ 
                [`${classPrefix}-links-item`]: true, 
                [`${classPrefix}-links-active`]: target === obj.target 
              }}
              // to={{ path, query: { target: obj.target } }}
              to = { {path: obj.target} }
            >{obj.text}</router-link>
          })
        }
      </div>
      <p class="m-footer-copyright">
        Copyright&nbsp;©&nbsp;2017&nbsp;&nbsp;京ICP备17028078号
      </p>
    </div>
  }
}

</script>


<style lang="less" scoped>
@import '~common/less/variable';

@component-prefix: ~'m-footer';

.@{component-prefix} {
  &-wraper {
    width: 100%;
    height: 200px;
    background-color: #fafafa;
    text-align: center;
    position: absolute;
    bottom: 0;
  }

  &-links {
    @links-padding: 38px;
    padding-top: 58px;
    
    &-item {
      font-size: 12px;
      color: #546064;
      padding: 0 @links-padding;

      &:first-of-type {
        border-right: 1px solid #CAD3D7;
      }
    }

    &-active {
      color: #51BD90;
    }
  }

  &-copyright {
    padding-top: 31px;
    font-size: 10px;
    color: #546064;
    line-height: 10px;
  }

}

.router-link-active{
  color: #51BD90;
}
</style>