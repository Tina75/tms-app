
<template>
  <div v-if="detail" class="pickup-order-detail">
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
    ...mapGetters('order/often', [ 'detail' ]),
    ...mapGetters('order/create', [ 'oftenPermission' ])
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_ORDER_RESET', 'SET_ONE_MORE_ID' ]),
    ...mapMutations('order/often', [ 'SET_DETAIL' ]),
    ...mapActions('order/often', [ 'getOftenDetail', 'deleteOftenOrder' ]),

    orderOneMore () {
      this.SET_ORDER_RESET(true)
      this.SET_ONE_MORE_ID(this.detail.id)
      this.$router.back()
    },

    setRightButton () {
      setAppTitleBtn({
        text: '删除',
        iconType: 'delete',
        action: () => {
          this.$createDialog({
            type: 'confirm',
            title: '',
            content: '确认需要删除此常发订单？',
            icon: 'cubeic-alert',
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
