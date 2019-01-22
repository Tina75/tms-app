<template>
  <div class="order-detail">
    <!-- <div v-if="!hasSendCar" class="cube-scroll-nav">
      <div slot="prepend" class="status-block">
        <h2>{{Waybill.status | billType}}</h2>
        <p>{{Waybill.createTime | datetimeFormat}}</p>
      </div>
      <waybill-info/>
    </div> -->
    <cube-scroll-nav >
      <div slot="prepend" class="status-block">
        <h2>{{Waybill.status | billType}}</h2>
        <p>{{Waybill.createTime | datetimeFormat}}</p>
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
    <div class="handle-btns">
      <!-- 2 待发运、 3 在途、4 已到货 -->
      <cube-button v-if="!hasSendCar" primary @click="sendCar(Waybill.waybillId)">派车</cube-button>
      <cube-button v-if="hasSendCar && Waybill.status==2" primary @click="setOff(Waybill.waybillId)">发运</cube-button>
      <cube-button v-if="Waybill.status==3" class="btn-light" @click="location(Waybill.waybillId)">查看位置</cube-button>
      <cube-button v-if="Waybill.status==3" @click="arrival(Waybill.waybillId)">到货</cube-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WaybillInfo from '../components/detail/WaybillInfo'
import OrderCargoList from '../components/detail/OrderCargoList'
import CostDetail from '../components/detail/CostDetail'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'delivery-detail',
  metaInfo: {
    title: '送货管理详情'
  },
  components: { WaybillInfo, OrderCargoList, CostDetail },
  data () {
    return {
      pageData: [{ name: '运单信息', component: 'WaybillInfo' }, { name: '货物明细', component: 'OrderCargoList' }, { name: '应付费用', component: 'CostDetail' }],
      hasSendCar: false
    }
  },
  computed: {
    ...mapGetters('delivery', ['Waybill'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getWaybillDetail(to.params.id).then(({ waybill }) => {
        vm.hasSendCar = (waybill.assignCarType === 1 && waybill.carrierName) || (waybill.assignCarType === 2 && waybill.carNo)
        vm.initTitleBtns(waybill)
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    setAppRightBtn([{ text: '', action: () => { } }])
    this.clearWaybillDetail()
    next()
  },
  watch: {
    'Waybill.status': function(val) {
      if (val === 2) { // 待送货
      }
    }
  },
  methods: {
    ...mapActions('delivery', ['getWaybillDetail', 'doSetOff', 'doArrival', 'clearWaybillDetail']),

    hasSendCarCheck() {
      const info = this.Waybill
      // 外转且有承运商名称  or 自送且有车牌号
      return (info.assignCarType === 1 && info.carrierName) || (info.assignCarType === 2 && info.carNo)
    },
    sendCar(id) {
      this.$router.push({ name: 'delivery-send-car', params: { id } })
    },
    location(id) {
      this.$router.push({ name: 'pickup-track', params: { id }, query: { type: 2 } })
    },
    setOff(id) {
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否发运？',
        onConfirm: () => {
          this.doSetOff(id).then(() => {
            this.getWaybillDetail(id)
          })
        }
      }).show()
    },
    async arrival(id) {
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否确认到货？',
        onConfirm: () => {
          this.doArrival(id).then(() => {
            this.getWaybillDetail(id)
          })
        }
      }).show()
    },
    initTitleBtns(waybill) {
      const btns = []
      if (waybill.status === 2) {
        btns.push({ text: '删除', iconType: 'delete', action: () => { this.deleteItem(waybill.waybillId) } })
        if (this.hasSendCar) btns.push({ text: '编辑', iconType: 'edit', action: () => { this.editWaybill(waybill.waybillId) } })
      }
      setAppRightBtn(btns)
    },
    // 删除
    deleteItem(id) {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-important',
        content: '是否确认删除？',
        onConfirm: () => {
          this.deleteBillById(id).then(() => {
            const index = this.SendList.findIndex(item => item.waybillId === id)
            this.SendList.splice(index, 1)
            this.clearWaybillDetail()
          })
        }
      }).show()
    },
    editWaybill(id) {
      this.$router.push({ name: 'delivery-send-car', params: { id } })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .order-detail
    height: 100%
    background-color: #EFEFEF;
    display: flex
    flex-direction column
    .cube-scroll-nav
      flex: 1
    .handle-btns
      display: flex
      >>> .cube-btn
        font-size 17px
        font-weight 500
        padding 15px
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
      .btn-light
          background #27C4D3
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
        // border-bottom 1px solid #ebebeb
        .cube-scroll-nav-bar-item
          flex 1
          padding-top: 15px;
          padding-bottom: 15px;
    >>> .cube-scroll-nav-panel
      .cube-sticky-ele
        height 0
        visibility: hidden
    >>> .cube-btn
          border-radius 0
</style>
