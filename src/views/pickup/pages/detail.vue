<template>
  <div class="pickup-detail">
    <cube-scroll-nav @change="changeHandler">
      <div slot="prepend" class="status-block">
        <h2>已提货</h2>
        <p>2019-01-01 12:00</p>
      </div>
      <cube-scroll-nav-panel
        v-for="(item, index) in pageData"
        :key="index"
        :label="item.name">
        <ul>
          <component :is="item.component"/>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PickupInfo from '../components/PickupInfo'
import OrderCargoList from '../components/OrderCargoList'
import CostDetail from '../components/CostDetail'

export default {
  name: 'pickup-detail',
  metaInfo: {
    title: '提货管理详情'
  },
  components: { PickupInfo, OrderCargoList, CostDetail },
  data () {
    return {
      pageData: [
        {
          name: '提货单信息',
          component: 'PickupInfo'
        },
        {
          name: '货物明细',
          component: 'OrderCargoList'
        },
        {
          name: '应收费用',
          component: 'CostDetail'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['pickupDetail'])
  },
  methods: {
    // ...mapActions(['getNews', 'clearNews']),
    changeHandler (label) {
      console.log('changed to:', label)
    }
  }
}
</script>
<style lang="stylus" scoped>
.pickup-detail
  height: 100%
  background-color: #EFEFEF;
  .status-block
    height: 90px
    background-color: #252A2F
    padding: 25px 15px
    h2
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 5px
    p
      color: #ffffff
      font-size: 15px;
  >>> .cube-scroll-nav-panel
    .cube-sticky-ele
      height 0
      visibility: hidden
</style>
