<!--  -->
<template>
  <div class="page">
    xxxx

    <cube-scroll
      ref="scroll"
      :data="WaybillOrderList"
      :options="options">
      <div class="list-item__time">
        <span class="cube-ml-15">{{WaybillOrderList.createTime||WaybillOrderList.createTimeLong | datetimeFormat}}</span>
        <div class="list-item__flag">
          <span v-if="WaybillOrderList.collectionMoney>0" class="item orange">代</span>
          <span v-if="WaybillOrderList.cashBack>0" class="item red">返</span>
          <span v-if="WaybillOrderList.abnormalLabel==2" class="item blue">异</span>
        </div>
      </div>
      <div class="list-item__body">
        <p class="list-item__city">{{WaybillOrderList.startName}} → {{WaybillOrderList.endName}}</p>
        <div>
          <span class="list-item__count">{{WaybillOrderList.weight}}吨</span>
          <span class="list-item__count">{{WaybillOrderList.volume}}方</span>
          <span class="list-item__count">{{WaybillOrderList.quantity}}件</span>
        </div>
        <p v-if="WaybillOrderList.consignerName" class="cube-mt-5">{{WaybillOrderList.consignerName}}</p>
        <p v-if="WaybillOrderList.carrierName" class="cube-mt-5">{{WaybillOrderList.carrierName}}</p>
        <p v-if="WaybillOrderList.id" class="list-item__number">客户单号：{{WaybillOrderList.customerOrderNo}}</p>
        <p v-else class="list-item__number cube-font-12">
          <span class="send-type">{{WaybillOrderList.assignCarType==1?'外转':'自送'}}</span>{{WaybillOrderList.driverName}}  {{WaybillOrderList.assistantDriverName}}  {{WaybillOrderList.carNo}}
        </p>
      </div>
      <div class="list-item__money">
        <p class="cube-c-black cube-font-12 cube-ml-15">应收费用({{WaybillOrderList.settlementType|settlementTypeFormat}})</p>
        <div class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{WaybillOrderList.pickupFee||WaybillOrderList.totalFee |moneyFormat}}</span>/元</div>
        <cube-button v-if="!WaybillOrderList.waybillId" class="list-item__btngroup" :outline="true"  :inline="true" primary @click="dispatch(WaybillOrderList.id)">调度</cube-button>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'
export default {
  name: 'delivery-order-list',
  metaInfo: { title: '订单列表' },
  components: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['WaybillOrderList']),
    options() {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getWaybillDetail(to.params.id)
    })
  },

  mounted () {},

  methods: {
    ...mapActions(['getWaybillDetail'])
  }
}

</script>
<style lang='stylus' scoped>
</style>
