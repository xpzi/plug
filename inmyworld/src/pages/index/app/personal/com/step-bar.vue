<!--
  邀约, 定制, 订单详情, 通用step bar
  开发人名字 时间

-->
<script>
import ISteps from 'iview-ui/steps'

const steps = [
  { text: '确认所选网红账号' },
  { text: '填写需求并提交' },
  { text: '需求已提交正在审核中' },
  { text: '审核通过与网红确认中' },
  { text: '网红已确认请支付订单' },
  { text: '费用已支付等待网红订单' },
  { text: '网红已接单等待网红上传效果数据' },
  { text: '确认所选网红账号' },
  { text: '确认所选网红账号' },
  { text: '确认所选网红账号' },
  { text: '确认所选网红账号' }
]

export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],

  props: {

  },
  
  components: {
    ISteps,
    IStep: ISteps.Step
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
    return <i-steps></i-steps>
  }
}

</script>


<style lang="less" scoped>



</style>