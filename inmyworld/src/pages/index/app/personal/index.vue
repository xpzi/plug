<!--
  个人中心
  libx@inke.cn 2017-06-09

-->

<script>
import sidebar from './com/sidebar'

const classPrefix = 'p-personal'

export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {

  },
  
  components: {
    sidebar
  },

  data () {
    // console.log('personal vue data, ', this.$store.state.User.info.phone)
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
    return <div class={`${classPrefix}-container base-1200`}>
      <router-view class={`${classPrefix}-content`} ></router-view>
      <div class={`${classPrefix}-sidebar`}>
        <sidebar></sidebar>
      </div>
    </div>
  }
}

</script>


<style lang="less" scoped>
@component-prefix: ~'p-personal';

.@{component-prefix} {
  &-container {
    padding-top: 14px;
  }

  &-sidebar {
    margin-right: 1080px;
  }

  &-content {
    width: 1080px;
    float: right;
    // background-color: #fff;
    // padding: 30px 0 22px 22px;
    box-sizing: border-box;
  }
}


</style>