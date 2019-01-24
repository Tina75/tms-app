<!--  -->
<template>
  <div class="page">
    <cube-scroll
      ref="scroll"
      :data="BillOrderList">
      <ul>
        <li v-for="(info) in BillOrderList" :key="info.id" class="list-item">
          <div class="list-item__time">
            <span class="cube-ml-15">{{info.createTime||info.createTimeLong | datetimeFormat}}</span>
            <div class="list-item__flag">
              <span v-if="info.collectionMoney>0" class="item orange">代</span>
              <span v-if="info.cashBack>0" class="item red">返</span>
              <span v-if="info.abnormalLabel==2" class="item blue">异</span>
            </div>
          </div>
          <div class="list-item__body">
            <p class="list-item__city">{{info.startName}} <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> {{info.endName}}</p>
            <div>
              <span v-if="info.weight" class="list-item__count">{{info.weight}}吨</span>
              <span v-if="info.volume" class="list-item__count">{{info.volume}}方</span>
              <span v-if="info.quantity" class="list-item__count">{{info.quantity}}件</span>
            </div>
            <p v-if="info.consignerName" class="cube-mb-5">{{info.consignerName}}</p>
            <p v-if="info.carrierName" class="cube-mb-5">{{info.carrierName}}</p>
            <p v-if="info.id && info.customerOrderNo" class="list-item__number">客户订单号：{{info.customerOrderNo}}</p>
            <p v-if="hasSendCar(info)" class="list-item__number cube-font-12">
              <span class="send-type">{{info.assignCarType==1?'外转':'自送'}}</span>
              <span class="cube-font-14">&nbsp;{{info.driverName}}&nbsp;{{info.assistantDriverName}}&nbsp;{{info.carNo}}</span>
            </p>
          </div>
          <div class="list-item__money">
            <p v-if="info.totalFee"  class="cube-c-black cube-font-12 cube-ml-15">应付费用({{info.settlementType|settlementTypeFormat}})</p>
            <div v-if="info.totalFee"  class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{info.totalFee |moneyFormat}}</span>/元</div>
            <cube-button  class="list-item__btngroup" :outline="true"  :inline="true" primary @click.stop="removeItem(info.id)">移出</cube-button>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'delivery-order-list',
  metaInfo: { title: '订单列表' },
  components: {},
  data () {
    return {
      waybillId: -1
    }
  },
  computed: {
    ...mapGetters('delivery', ['BillOrderList', 'CurrentBillOrderIds'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.waybillId = to.params.id
      setAppRightBtn([{ text: '添加', iconType: 'add', action: () => { vm.$router.push({ name: 'delivery-add-order', params: { id: to.params.id } }) } }])
      // vm.getWaybillDetail(vm.waybillId)
      vm.getOrderListByWaybillId(vm.waybillId)
    })
  },
  beforeRouteLeave(to, from, next) {
    setAppRightBtn([{ text: '', action: () => { } }])
    next()
  },

  methods: {
    ...mapActions('delivery', ['getWaybillDetail', 'getOrderListByWaybillId', 'updatetBillOrders', 'removeBillOrder']),
    hasSendCar(info) {
      // 外转且有承运商名称  or 自送且有车牌号
      return (info.assignCarType === 1 && info.carrierName) || (info.assignCarType === 2 && info.carNo)
    },
    removeItem(orderId) {
      this.updatetBillOrders(this.waybillId).then(() => {
        this.removeBillOrder(orderId)
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
.list
  &-item
    background white
    margin-top 15px
    padding 10px 0
    font-size 14px
    color #666666
    position relative
    p
      line-height 20px
    &__time
      height 20px
      line-height 20px
      position relative
    &__time:after
      content ''
      display block
      border-bottom 1px solid #F3F5F9
      margin-top 6px
    &__money
      min-height 50px
    &__money:before
      content ''
      display block
      border-bottom 1px solid #F3F5F9
      margin-bottom 8px
      padding-top  10px
    &__body
      padding-left 15px

    &__city
      color #333
      font-size 18px
      margin-top 20px
      font-weight bold
    &__count
      background #efefef
      display inline-block
      margin 7px 8px 7px 0
      border-radius 3px
      padding 3px 5px 2px 5px
      font-size 12px
    &__number
      line-height 25px
      .send-type
        border 1px solid #efefef
        border-radius 2px
        padding 1px 5px
        margin-right 5px
    &__btngroup
      position absolute
      right 15px
      bottom 15px
      font-size 14px
      min-width 50px
      .btn
        margin-left 5px
    &__flag
      color white
      height 18px
      font-size 12px
      line-height 20px
      position absolute
      right 15px
      top 0
      .item
        border-radius 2px
        display inline-block
        margin-left 5px
        padding 0 3px
      .orange
        background #FCAF3B
      .red
        background #FF8463
      .blue
        background #418DF9
</style>
