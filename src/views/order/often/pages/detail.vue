
<template>
  <div class="pickup-order-detail">
    <cube-scroll-nav @change="changeHandler">
      <cube-scroll-nav-panel
        v-for="(item, index) in pageData"
        :key="index"
        :label="item.name">
        <ul>
          <component :is="item.component"/>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div class="handle-btns">
      <a>再来一单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderBaseInfo from '../components/OrderBaseInfo'
import ReceiveAndSend from '../components/ReceiveAndSend'
import OrderCargoList from '../components/OrderCargoList'
import CostDetail from '../components/CostDetail'

export default {
  name: 'order-often-detail',
  metaInfo: {
    title: '常发订单详情'
  },
  components: { OrderBaseInfo, OrderCargoList, CostDetail, ReceiveAndSend },
  data () {
    return {
      pageData: [
        {
          name: '基本信息',
          component: 'OrderBaseInfo'
        },
        {
          name: '收发货人',
          component: 'ReceiveAndSend'
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
  .pickup-order-detail
    height: 100%
    background-color: #EFEFEF;
    display: flex
    flex-direction column
    .cube-scroll-nav
      flex: 1
    .handle-btns
      height: 45px
      display: flex
      a
        flex: 1
        background: #27A3BD;
        text-align: center
        height: 45px
        line-height: 45px
        font-size: 17px
        color: #ffffff
        &.light-btn
          background: #32C4D3;
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
    >>> .cube-scroll-content
      width 100%
      .cube-scroll-nav-bar-items
        display: flex
        .cube-scroll-nav-bar-item
          flex 1
          padding-top: 15px;
          padding-bottom: 15px;
    >>> .cube-scroll-nav-panel
      .cube-sticky-ele
        height 0
        visibility: hidden
</style>
