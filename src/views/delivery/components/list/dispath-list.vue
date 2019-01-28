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
          </div>
        </div>
        <div class="list-item__body">
          <p class="list-item__city">
            {{info.startName?info.startName:info.consignerAddress |textOverflow}}
            <i class="iconfont icon-line cube-ml-5 cube-mr-5"/>
            {{info.endName?info.endName:info.consigneeAddress |textOverflow}}
          </p>
          <div>
            <span v-if="info.weight" class="list-item__count">{{info.weight}}吨</span>
            <span v-if="info.volume" class="list-item__count">{{info.volume}}方</span>
            <span v-if="info.quantity" class="list-item__count">{{info.quantity}}件</span>
          </div>
          <p v-if="info.consignerName" class="cube-mb-5">{{info.consignerName}}</p>
          <p v-if="info.carrierName" class="cube-mb-5">{{info.carrierName}}</p>
          <p v-if="info.id && info.customerOrderNo" class="list-item__number">客户订单号：{{info.customerOrderNo}}</p>
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
      background #f3f5f9
      display inline-block
      margin 7px 8px 7px 0
      padding 3px 5px 2px 5px
      font-size 12px
      color #333
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
