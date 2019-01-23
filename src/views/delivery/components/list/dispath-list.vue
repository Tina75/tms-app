<template>
  <cube-scroll
    ref="dispatch"
    :data="DispatchList"
    :options="options"
    @pulling-down="refresh"
    @pulling-up="loadmore">
    <ul >
      <li v-for="info in DispatchList" :key="info.id" class="list-item" @click.stop="onItemClick(info.id)">
        <div class="list-item__time  border-bottom-1px">
          <span class="cube-ml-15">{{info.createTime| datetimeFormat}}</span>
          <div class="list-item__flag">
            <span v-if="info.disassembleStatus===1" class="item" style="background:#418DF9">子</span>
            <span v-if="info.collectionMoney>0" class="item" style="background:#FCA950">代</span>
            <!-- <span v-if="item.cashBack>0" class="item green" style="background:#40D1A4">返</span> -->
            <!-- <span v-if="item.abnormalLabel==2" class="item red" style="background:#F35851">异</span> -->
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
          <!-- <p v-if="hasSendCar(info)" class="list-item__number cube-font-12 cube-mt-5">
            <span class="send-type">{{info.assignCarType==1?'外转':'自送'}}</span>
            <span class="cube-font-14">&nbsp;{{info.driverName}}&nbsp;{{info.assistantDriverName}}&nbsp;{{info.carNo}}</span>
          </p> -->
        </div>
        <div class="list-item__money border-top-1px">
          <p v-if="info.totalFee"  class="cube-c-black cube-font-12 cube-ml-15">应收费用({{info.settlementType|settlementTypeFormatForOrder}})</p>
          <div v-if="info.totalFee"  class="cube-c-yellow  cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{info.totalFee |moneyFormat}}</span>/元</div>
          <!-- 状态 10：待提货 20：待调度 30：在途 40：已到货 50：已回单；100被删除到回收站 -->
          <cube-button
            v-if="!info.waybillId"
            class="list-item__btngroup"
            outline
            inline
            primary
            @click.stop="onDispatch(info)">调度</cube-button>
          <!-- <div v-else class="list-item__btngroup">
            <div v-if="info.status==2">
              <cube-button class="btn" :outline="true" :inline="true" @click.stop="$emit('delete-item', info.waybillId)">删除</cube-button>
              <cube-button v-if="!hasSendCar(info)" class="btn" :outline="true"  :inline="true" primary @click.stop="sendCar(info.waybillId)">派车</cube-button>
              <cube-button v-else class="btn" :outline="true"  :inline="true" primary @click.stop="setOff(info.waybillId)">发运</cube-button>
            </div>
            <div v-if="info.status==3">
              <cube-button class="btn" :outline="true"  :inline="true" @click.stop="location(info.waybillId)">位置</cube-button>
              <cube-button  class="btn" :outline="true"  :inline="true" primary @click.stop="arrival(info.waybillId)">到货</cube-button>
            </div>
          </div> -->
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'dispatch-list',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('delivery', ['DispatchList']),
    options() {
      return {
        pullDownRefresh: { pullDownRefresh: 60, stopTime: 1000, txt: '刷新成功' },
        pullUpLoad: true,
        scrollbar: false
      }
    }
  },

  created () {
    this.refresh()
  },

  methods: {
    ...mapActions('delivery', ['getDispatch', 'clearDispatch', 'getTabCount']),
    refresh() {
      this.clearDispatch()
      this.getDispatch()
      this.getTabCount()
    },
    loadmore() {
      this.getDispatch()
    },
    onDispatch(info) {
      this.$router.push({ name: 'delivery-workbench', params: { info } })
    },
    onItemClick(id) {
      this.$router.push({ name: 'order-detail', params: { id } })
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
      padding-bottom 10px
      line-height 20px
      position relative

    &__money
      min-height 45px
      padding-top 7px
      margin-top 10px

    &__body
      padding-left 15px

    &__city
      color #333
      font-size 18px
      margin-top 10px
      font-weight bold
      white-space  nowrap
      overflow hidden
      text-overflow ellipsis
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
      bottom 0
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
