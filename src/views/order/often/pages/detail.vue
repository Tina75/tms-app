
<template>
  <div v-if="detail" class="often-order-detail">
    <cube-scroll-nav ref="$scroll">
      <cube-scroll-nav-panel
        v-for="(item, index) in pageData"
        :key="index"
        :label="item.name">
        <ul>
          <component :is="item.component" />
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div v-if="oftenPermission.indexOf(100401) > -1" class="handle-btns">
      <a @click.prevent="orderOneMore">再来一单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import OrderBaseInfo from '../components/OrderBaseInfo'
import ReceiveAndSend from '../components/ReceiveAndSend'
import OrderCargoList from '../components/OrderCargoList'
import CostDetail from '../components/CostDetail'
import { setAppTitleBtn } from '@/libs/bridgeUtil'
import { MODULE_NAME } from '../../js/constant'

export default {
  name: 'order-often-detail',
  metaInfo: { title: '常发订单详情' },
  components: { OrderBaseInfo, OrderCargoList, CostDetail, ReceiveAndSend },
  data () {
    return {
      pageData: [
        { name: '基本信息', component: 'OrderBaseInfo' },
        { name: '收发货人', component: 'ReceiveAndSend' },
        { name: '货物明细', component: 'OrderCargoList' },
        { name: '应付费用', component: 'CostDetail' }
      ],
      orderId: ''
    }
  },
  computed: {
    ...mapGetters(MODULE_NAME.ORDER_OFTEN, [ 'detail' ]),
    ...mapGetters(MODULE_NAME.ORDER_CREATE, [ 'oftenPermission' ])
  },
  methods: {
    ...mapMutations(MODULE_NAME.ORDER_CREATE, [ 'SET_ORDER_RESET', 'SET_ONE_MORE_ID' ]),
    ...mapMutations(MODULE_NAME.ORDER_OFTEN, [ 'SET_DETAIL' ]),
    ...mapActions(MODULE_NAME.ORDER_OFTEN, [ 'getOftenDetail', 'deleteOftenOrder' ]),

    orderOneMore () {
      this.SET_ORDER_RESET(true)
      this.SET_ONE_MORE_ID(this.detail.id)
      this.$router.back()
    },

    setRightButton () {
      if (this.oftenPermission.indexOf(100402) === -1) return
      setAppTitleBtn({
        text: '删除',
        iconType: 'delete',
        action: () => {
          this.$createDialog({
            type: 'confirm',
            title: '提醒',
            content: '确认需要删除此常发订单？',
            // icon: 'cubeic-alert',
            onConfirm: async () => {
              await this.deleteOftenOrder(this.orderId)
              window.toast('删除成功')
              this.$router.back()
            }
          }).show()
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.orderId = vm.$route.params.orderId
      try {
        window.loading(true)
        await vm.getOftenDetail(vm.orderId)
        vm.setRightButton()
        vm.$nextTick(() => { vm.$refs.$scroll.refresh() })
      } catch (err) {
        //
      } finally {
        window.loading(false)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.SET_DETAIL(null)
    next()
  }
}
</script>
<style lang="stylus" scoped>
  .often-order-detail
    height: 100%
    background-color: #EFEFEF

    .cube-scroll-nav
      height calc(100% - 45px)
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
        font-weight: bold
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
