<template>
  <div class="tab-card">
    <div class="tab-card-title">
      <div class="create-time">{{data.createTime | datetimeFormat}}</div>
      <div v-if="data.collectionMoney>0" class="order-status right">代</div>
    </div>
    <div class="consignee-info">
      <div class="city">
        {{data.startName}} <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> {{data.endName}}
      </div>
      <div class="cargos">
        <div class="cargo-infos">{{data.weight || 0}}吨</div>
        <div class="cargo-infos">{{data.volume || 0}}方</div>
        <div class="cargo-infos">{{data.quantity || 0}}件</div>
      </div>
      <div class="company">
        {{data.consignerAddress}} {{data.consignerName}}
      </div>
      <div class="company">
        客户订单号：{{data.customerOrderNo}}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="leftBox">
          <div class="settlement">总费用（{{data.settlementType | settlement}}）</div>
          <div class="fee">
            {{data.totalFee | moneyFormat}}<span>/元</span>
          </div>
        </div>
        <div class="receiptBox">
          <div class="settlement">回单</div>
          <div class="fee" style="color: #333">
            {{data.receiptCount}}<span>份</span>
          </div>
        </div>
      </div>
      <div class="right">
        <cube-button v-if="data.receiptOrder.receiptStatus === 0 && data.status === 40" :outline="true" :inline="true" primary @click.stop="handleClick('receipt')">回收</cube-button>
        <cube-button v-if="data.receiptOrder.receiptStatus === 1" :outline="true" :inline="true" :primary="!(data.receiptOrder.receiptStatus > 0)" @click.stop="handleClick('backFactory')">返厂</cube-button>
        <cube-button v-if="data.receiptOrder.receiptStatus > 0 && !data.receiptOrder.receiptUrl.length" :outline="true" :inline="true" primary style="margin-left: 8px" @click.stop="handleClick('uploadPic')">上传回单</cube-button>
        <cube-button v-if="data.receiptOrder.receiptStatus > 0 && data.receiptOrder.receiptUrl.length" :outline="true" :inline="true" primary style="margin-left: 8px" @click.stop="handleClick('updatePic')">修改回单</cube-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getMoney, settlement } from '@/views/upstream/libs'
export default {
  name: 'tab-card',
  filters: {
    money: getMoney,
    settlement
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick (type) {
      this.$emit('card-action', type, this.data)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-card
  background #fff
  margin-top 15px
  padding 0 15px
.tab-card-title
  padding 10px 0
  .create-time
    font-size 14px
    line-height 20px
    color #666
    display inline-block
  .order-status
    color #ffffff
    background #fcaf3b
    padding 2px
.consignee-info
  padding-bottom 15px
  .city
    color #333
    font-size 18px
    font-weight 600
  .cargos
    margin-top 4px
    .cargo-infos
      display inline-block
      padding 0 5px
      color #333
      font-size 12px
      line-height 17px
      background #efefef
      margin-right 5px
  .address
    font-size 14px
    margin-top 7px
  .company
    margin-top 4px
    color #666
    font-size 14px
    line-height 20px
.footer
  border-top 1px sold #ccc
  overflow hidden
  padding 8px 0
  .left
    min-width 50%
    display flex
    .leftBox
      flex 1
    .receiptBox
      min-width 50px
      margin-left 10px
    .settlement
      font-size 12px
    .fee
      color #FA8C16
      font-size 20px
      line-height 28px
      font-weight 600
    span
      font-size 14px
      font-weight 300
  .right
    margin-top 4px
    .btn
      display block
      width 54px
      line-height 30px
      float right
      text-align center
      border-radius 4px
      color #999
      border 1px solid #999
      font-size 14px
    .btn-active
      color #00A4BD
      border-color #00A4BD
.right
  float right
.left
  float left
.yellow
  background #FA8C16
.grey
  background #6c798e
.green
  background #00c185
.iconfont
  margin 0 10px
</style>
