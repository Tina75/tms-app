<template>
  <cube-scroll
    :ref="refName"
    :data="list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul >
      <li v-for="item in list" :key="item.id" class="list-item">
        <div class="list-item__time">
          <span class="cube-ml-15">{{item.createTime | datetimeFormat}}</span>
          <div class="list-item__flag">
            <span v-if="item.collectionMoney>0" class="item orange">代</span>
            <span v-if="item.cashBack>0" class="item red">返</span>
            <span v-if="item.abnormalLabel==2" class="item blue">异</span>
            <span class="item" :style="{'background':getColorType(item.status)}">{{item.status | orderType}}</span>
          </div>
        </div>
        <div class="list-item__body">
          <p class="list-item__city">{{item.startName}} → {{item.endName}}</p>
          <div>
            <span v-if="item.cargoNames" class="list-item__count">{{item.cargoNames}}</span>
            <span v-if="item.weight" class="list-item__count">{{item.weight}}吨</span>
            <span v-if="item.volume" class="list-item__count">{{item.volume}}方</span>
            <span v-if="item.quantity" class="list-item__count">{{item.quantity}}件</span>
          </div>
          <div class="cube-mt-5 cube-mb-10">
            <span v-if="item.consignerName" >{{item.consignerName}}</span>
            <span v-if="item.consignerContact" class="cube-ml-10">{{item.consignerContact}}</span>
          </div>
        </div>
        <div class="list-item__money">
          <p class="cube-c-black cube-font-12 cube-ml-15">{{item.settlementType|settlementTypeFormat}}</p>
          <div class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{item.pickupFee||item.totalFee |moneyFormat}}</span>/元</div>
          <!--
            子状态为 待调度,列表展示 “删除”“编辑”按钮，详情页展示“删除”“编辑”“分享”按钮
            子状态为 其它,列表展示“改单”按钮，详情展示“改单”“分享”按钮
          -->
          <div v-if="item.status=='10'" class="list-item__btngroup">
            <cube-button v-if="deleteBtnVisable(item)" class="btn" :outline="true"  :inline="true" @click="handleClickDelete">删除</cube-button>
            <cube-button v-if="editOrderBtnVisable(item)" class="btn" :outline="true"  :inline="true" primary @click="handleClickEditOrder">编辑</cube-button>
            <cube-button v-if="editBillBtnVisable(item)" class="btn" :outline="true" :inline="true" :primary="true" @click="handleClickEditBill">改单</cube-button>
          </div>

        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
export default {
  name: 'order-base-list',
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

  mounted() {
  },

  methods: {
    onPullingDown() {
      this.$emit('refresh')
    },
    onPullingUp() {
      this.$emit('loadmore')
    },
    getColorType(status) {
      let color = ''
      switch (Number(status)) {
        case 10:
          color = '#FCAF3B'
          break
        case 20:
          color = '#418DF9'
          break
        case 30:
          color = '#FF8463'
          break
        case 40:
          color = '#00C185'
          break
        case 50:
          color = '#6C798E'
          break
        default:
          color = '#666666'
          break
      }
      return color
    },
    handleClickDelete(id) {
      this.$createDialog({
        type: 'confirm',
        title: '确认删除订单？',
        content: '删除后可以在电脑端订单回收站恢复',
        onConfirm: () => {
          this.$emit('delete', id)
        }
      }).show()
    },
    handleClickEditOrder(id) {
      this.$emit('editOrder', id)
    },
    handleClickEditBill(id) {
      this.$emit('editBill', id)
    },
    deleteBtnVisable(item) {
      let arr = []
      const list = ['1000', '1001', '2000', '2001'] // 见文档
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      console.log('xxxx' + arr.join(''))
      return list.includes(arr.join(''))
    },
    editOrderBtnVisable(item) {
      let arr = []
      const list = ['1000', '2000']
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      return list.includes(arr.join(''))
    },
    editBillBtnVisable(item) {
      let arr = []
      const list = ['1001', '1010', '2001', '2010', '3010', '3011', '4010', '4011', '5010', '5011']
      arr.push(item.status)
      arr.push(item.pickupStatus)
      arr.push(item.disassembleStatus)
      return list.includes(arr.join(''))
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
    &__time
      height 20px
      line-height 20px
      position relative
    &__time:after
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-top 6px
    &__money
      min-height 46px
    &__money:before
      content ''
      display block
      border-bottom 1px solid #E4E7EC
      margin-bottom 10px
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
