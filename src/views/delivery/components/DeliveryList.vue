<template>
  <cube-scroll
    :ref="refName"
    :data="list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul >
      <li v-for="info in list" :key="getUnicKey(info)" class="list-item">
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
          <p v-if="info.id && info.customerOrderNo" class="list-item__number">客户单号：{{info.customerOrderNo}}</p>
          <p v-if="(info.assignCarType === 1 && info.carrierName) || (info.assignCarType === 2 && info.carNo)" class="list-item__number cube-font-12">
            <span class="send-type">{{info.assignCarType==1?'外转':'自送'}}</span>
            <span class="cube-font-14">&nbsp;{{info.driverName}}&nbsp;{{info.assistantDriverName}}&nbsp;{{info.carNo}}</span>
          </p>
        </div>
        <div class="list-item__money">
          <p class="cube-c-black cube-font-12 cube-ml-15">应收费用({{info.settlementType|settlementTypeFormat}})</p>
          <div class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{info.pickupFee||info.totalFee |moneyFormat}}</span>/元</div>
          <!-- 状态 1 待派车、2 待发运、 3 在途、4 已到货 -->
          <!-- <div class="list-item__btngroup">
        <slot/>
      </div> -->
          <cube-button v-if="!info.waybillId" class="list-item__btngroup" :outline="true"  :inline="true" primary @click="$emit('on-dispatch',info)">调度</cube-button>
          <div v-else class="list-item__btngroup">
            <div v-if="info.status<3">
              <!-- <cube-button class="btn" :outline="true" :inline="true" @click="$emit('delete-item', info.waybillId)">删除</cube-button> -->
              <cube-button v-if="info.status==1" class="btn" :outline="true"  :inline="true" primary @click="sendCar(info.waybillId)">派车</cube-button>
              <cube-button v-if="info.status==2" class="btn" :outline="true"  :inline="true" primary @click="setOff(info.waybillId)">发运</cube-button>
            </div>
            <div v-if="info.status==3">
              <cube-button v-if="info.status==3" class="btn" :outline="true"  :inline="true" @click="location">位置</cube-button>
              <cube-button v-if="info.status==3" class="btn" :outline="true"  :inline="true" primary @click="arrival(info.waybillId)">到货</cube-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'delivery-list-c',
  props: {
    refName: { type: String, default: '' },
    list: { type: Array, required: true, default: function () { return [] } }
  },

  computed: {
    options() {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },

  methods: {
    ...mapActions('delivery', ['doSetOff', 'doArrival']),
    // // 调度
    // dispatch() {
    // },
    // 派车
    sendCar() {
      this.$router.push({ name: 'delivery-send-car' })
    },
    // 发运
    setOff(id) {
      this.showDialog('是否发运？', () => {
        this.doSetOff([id])
      })
    },
    // 到货
    arrival(id) {
      this.showDialog('是否确认到货？', () => {
        this.doArrival([id])
      })
    },

    location() {
      // TODO: 等小熊
      window.toast('等小熊')
    },

    showDialog(msg, fn) {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        // title: '我是标题',
        content: msg,
        confirmBtn: { text: '确定', active: true },
        cancelBtn: { text: '取消' },
        onConfirm: () => {
          if (typeof fn === 'function')fn()
        }
      }).show()
    },

    onPullingDown() {
      this.$emit('refresh')
    },
    onPullingUp() {
      this.$emit('loadmore')
    },
    getUnicKey(item) {
      if (!item) return ''
      return item.id ? item.id : item.waybillId
    },
    deleteBill(id) {
      this.$emit('delete-item', id)
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
