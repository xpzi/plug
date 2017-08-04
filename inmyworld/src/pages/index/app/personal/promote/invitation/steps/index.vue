<!--
  网红邀约 之 步骤明细
  libx@inke.cn 2017-06-13
-->

<script>
import stepBar from '@/app/personal/com/step-bar'

export default {
  name: 'PPromoteCelebritySteps',

  mixins: [],

  props: {

  },
  
  components: {
    stepBar
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

  beforeCreate () {
    
  },

  created () {

  },

  mounted () {

  },

  render (h) {
      // <div>网红邀约 之 步骤明细</div>
      // <router-link to={'confirm'}>确认</router-link>
      // <router-link to={'fill-requisition'}>填写</router-link>
      // <router-link to={'under-review'}>审核中</router-link>
      // <br/>
      // <br/>
      // <br/>
    return <div>
      <step-bar type="invitation"></step-bar>
      <router-view></router-view>
    </div>
  }
}

</script>


<style lang="less" scoped>



</style>