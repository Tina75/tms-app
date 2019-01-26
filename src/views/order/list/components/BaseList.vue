<template>
  <cube-scroll
    :ref="refName"
    :data="list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul >
      <li v-for="item in list" :key="item.id" class="list-item" @click.stop="onItemClick(item.id)">
        <div class="list-item__time border-bottom-1px">
          <span class="cube-ml-15">{{item.createTime | datetimeFormat}}</span>
          <div class="list-item__flag">
            <span v-if="item.disassembleStatus===1" class="item blue" style="background:#418DF9">子</span>
            <span v-if="item.collectionMoney>0" class="item orange" style="background:#FCA950">代</span>
            <span v-if="item.cashBack>0" class="item green" style="background:#40D1A4">返</span>
            <span v-if="item.abnormalLabel==2" class="item red" style="background:#F35851">异</span>
            <span class="item" :style="{'background':getColorType(item.status)}">{{item.status | orderType}}</span>
          </div>
        </div>
        <div class="list-item__body">
          <p class="list-item__city">
            {{item.startName?item.startName:item.consignerAddress|textOverflow}}
            <i class="iconfont icon-line cube-ml-5 cube-mr-5"/>
            {{item.endName?item.endName:item.consigneeAddress|textOverflow}}
          </p>

          <div>
            <span v-if="item.cargoNames" class="list-item__count">
              {{item.cargoNames[0]|textOverflow(10)}}
              <span v-if="item.cargoNames[0]&&item.cargoNames[0].length<10&& item.cargoNames.length>1">等</span>
            </span>
            <span v-if="item.weight" class="list-item__count">{{item.weight}}吨</span>
            <span v-if="item.volume" class="list-item__count">{{item.volume}}方</span>
            <span v-if="item.quantity" class="list-item__count">{{item.quantity}}件</span>
          </div>
          <div class="cube-mt-5 cube-mb-10">
            <span v-if="item.consignerName" >{{item.consignerName}}</span>
            <span v-if="item.consignerContact" class="cube-ml-10">{{item.consignerContact}}</span>
          </div>
        </div>
        <div class="list-item__money border-top-1px">
          <p  class="cube-c-black cube-font-12 cube-ml-15">{{item.settlementType|settlementTypeFormatForOrder}}</p>
          <div  class="cube-c-yellow cube-mt-5 cube-ml-15"><span class="cube-font-20" style="font-weight:bold">{{item.totalFee |moneyFormat}}</span>/元</div>
          <!--
            子状态为 待调度,列表展示 “删除”“编辑”按钮，详情页展示“删除”“编辑”“分享”按钮
            子状态为 其它,列表展示“改单”按钮，详情展示“改单”“分享”按钮
          -->
          <div class="list-item__btngroup">
            <cube-button v-if="deleteBtnVisable(item)" class="btn" :outline="true"  :inline="true" @click.stop="handleClickDelete(item.id)">删除</cube-button>
            <cube-button v-if="editOrderBtnVisable(item)" class="btn" :outline="true"  :inline="true" primary @click.stop="handleClickEditOrder(item.id)">编辑</cube-button>
            <!-- <cube-button v-if="editBillBtnVisable(item)" class="btn" :outline="true" :inline="true" :primary="true" @click.stop="handleClickEditBill">改单</cube-button> -->
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
        pullDownRefresh: { pullDownRefresh: 60, stopTime: 600, txt: '刷新成功' },
        pullUpLoad: true,
        scrollbar: { fade: true }
      }
    }
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
      this.$emit('edit-order', id)
    },
    handleClickEditBill(id) {
      this.$emit('editBill', id)
    },
    deleteBtnVisable(item) {
      let arr = []
      let hasDispatched = ''
      if (item.status === 10) {
        hasDispatched = item.pickupStatus
      } else if (item.status === 20) {
        hasDispatched = item.dispatchStatus
      }
      // 是否调度
      // status + pickupStatus + dispachStatus + disassembleStatus
      const list = ['1000', '1001', '2000', '2001', '5010'] // 见文档
      arr.push(item.status)
      arr.push(hasDispatched)
      arr.push(item.disassembleStatus)
      console.log('xxxx' + arr.join(''))
      return list.includes(arr.join(''))
    },
    editOrderBtnVisable(item) {
      let arr = []
      let hasDispatched = ''
      if (item.status === 10) {
        hasDispatched = item.pickupStatus
      } else if (item.status === 20) {
        hasDispatched = item.dispatchStatus
      }
      const list = ['1000', '2000']
      arr.push(item.status)
      arr.push(hasDispatched)
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
    &__time
      height 30px
      line-height 22px
      position relative

    &__money
      min-height 46px
      padding-top 10px

    &__body
      padding-left 15px

    &__city
      color #333
      font-size 18px
      margin-top 10px
      font-weight bold
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      .address
        font-weight bold
        display inline-block
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        max-width 150px
    &__count
      background #f3f5f9
      display inline-block
      margin 5px 8px 5px 0
      padding 3px 5px 2px 5px
      font-size 12px
      color #333
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
      // .orange
      //   background #FCA950
      // .red
      //   background #F35851
      // .blue
      //   background #418DF9
      // .green
      //   background #40D1A4
</style>
