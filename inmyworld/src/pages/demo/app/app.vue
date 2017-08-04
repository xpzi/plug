
<script>

export default {
  name: 'app',

  methods: {
    APP_USER_INFO () {
      return this.$S.APP_USER_INFO({
        sid: '20m3503a2wgUMAoNi20LGkCnj5um0xVWNgXjRjd51vR7z1i1',
        uid: '262960'
      })
    },
    serviceRequest (e) {
      this.$store.dispatch('APP_CLICK', e)

      this.$Modal.confirm({
        title: '是否请求?',
        content: 'are you ready?',
        onOk: () => {
          this.APP_USER_INFO()   
          .then((data) => {
            this.$Message.success({
              content: data.username,
              duration: 3,
              closable: true
            })
            console.log('APP_USER_INFO', data)
          }, (err) => {
            this.$Message.error(err)
          })
        },
        onCancel: () => {
          this.$Message.info('点击了取消')
        }
      })
    }
  },

  mounted () {
    // this.APP_USER_INFO({target: 'service'})
  },

  render (h) {
    return <div class="app">
      <img src={require('assets/images/demo/logo.png')}/>
      <router-view on-hello-vue={(e) => { console.log(e) }}></router-view>
      <br/>
      <div class="box-outer">
        <div class="box" on-click={this.serviceRequest}>serviceRequest</div>
      </div>
      <br/>
    </div>
  }
}
</script>


<style lang="less">
@import '~common/less/variable.less';

@info-color: #00d8c9;

.app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @info-color;
  margin-top: 120 / 2px;

  font-size: 36 / 2px; /*px*/

  img {
    width: auto;
  }

  @bottom: bottom;
  @width: 1px;
  @color: #E4E4E4;

  .box-outer {
    border: 1px solid @var-theme-color;
  }
}
</style>

