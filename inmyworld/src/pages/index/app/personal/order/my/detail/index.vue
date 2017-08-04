<!--
  订单详情
  libx@inke.cn 20170614
-->

<script>
import { personalRouteSpace } from '@/router/routes/config'

export default {
  // 写name可使组件查看更严谨
  name: 'POrderDetail',

  mixins: [],

  props: {

  },
  
  components: {

  },

  data () {
    return {
      isWaitAccept: false
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
    if (this.isWaitAccept) {
      this.$router.push(`${personalRouteSpace}/order/my/detail/wait-accept`)
    }
  },

  render (h) {
    return <div>

      阿斯顿发斯蒂芬asdf
      <br/>

      <br/>
      <router-view></router-view>
    </div>
  }
}

</script>


<style lang="less" scoped>



</style>