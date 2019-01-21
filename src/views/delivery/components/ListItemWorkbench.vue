<template>

  <li class="list-item">
    <div class="list-item__time  border-bottom-1px ">
      <cube-checkbox v-model="info.checked" class="list-item__checkbox">
        <span class="cube-ml-15">{{info.createTime||info.createTimeLong | datetimeFormat}}</span>
        <div class="list-item__flag">
          <span v-if="info.collectionMoney>0" class="item orange">代</span>
          <span v-if="info.cashBack>0" class="item red">返</span>
          <span v-if="info.abnormalLabel==2" class="item blue">异</span>
        </div>
      </cube-checkbox>
    </div>
    <div class="list-item__body">
      <p class="list-item__city">{{info.startName}} <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> {{info.endName}}</p>
      <div>
        <span v-if="info.weight" class="list-item__count">{{info.weight}}吨</span>
        <span v-if="info.volume" class="list-item__count">{{info.volume}}方</span>
        <span v-if="info.quantity" class="list-item__count">{{info.quantity}}件</span>
      </div>
      <p v-if="info.consignerName" class="cube-mt-5">{{info.consignerName}}</p>
      <!-- <p v-if="info.carrierName" class="cube-mt-5">{{info.carrierName}}</p> -->
      <p v-if="info.id && info.customerOrderNo" class="list-item__number">客户单号：{{info.customerOrderNo}}</p>
      <p v-if="(info.assignCarType === 1 && info.carrierName) || (info.assignCarType === 2 && info.carNo)" class="list-item__number cube-font-12">
        <span class="send-type">{{info.assignCarType==1?'外转':'自送'}}</span>{{info.driverName}}  {{info.assistantDriverName}}  {{info.carNo}}
      </p>
    </div>
    <div class="list-item__money border-top-1px">
      <p class="cube-c-black cube-font-12 cube-ml-15">应付费用({{info.settlementType|settlementTypeFormat}})</p>
      <div class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{info.pickupFee||info.totalFee |moneyFormat}}</span>/元</div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'workbench-list-item',
  props: {
    info: { type: Object, required: true, default: function () { return { checked: false } } }
  },

  mounted() {
    this.$set(this.info, 'checked', this.info.checked)
  },
  methods: {
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
    &__checkbox
      height 20px
    &__time
      position relative
      padding-bottom 10px
    &__money
      padding-top 10px
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
      margin 5px 8px 5px 0
      border-radius 3px
      padding 3px 5px 2px 5px
      font-size 12px
    &__number
      line-height 25px
      margin-bottom 10px
      .send-type
        border 1px solid #efefef
        border-radius 2px
        padding 1px 5px
        margin-right 5px
    &__flag
      color white
      height 18px
      font-size 12px
      line-height 20px
      position absolute
      right 0px
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
