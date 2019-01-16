<template>
  <div class="tab-card">
    <div class="tab-card-title">
      <div class="create-time">{{data.createTime | datetimeFormat}}</div>
      <div v-if="status[data.acceptStatus]" :class="status[data.acceptStatus].color" class="order-status right">{{status[data.acceptStatus].name}}</div>
    </div>
    <div class="consignee-info">
      <div class="city">
        {{data.departureCityName}} - {{data.destinationCityName}}
      </div>
      <div class="cargos">
        <!-- <div class="cargo-infos">花棉袄</div> -->
        <div class="cargo-infos">{{data.weight || 0}}吨</div>
        <div class="cargo-infos">{{data.volume || 0}}方</div>
        <div class="cargo-infos">{{data.cargoCnt || 0}}件</div>
      </div>
      <div class="company">
        {{data.consignerAddress}} {{data.consignerContact}}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="settlement">{{data.settlementTypeDesc}}</div>
        <div class="fee">
          {{data.totalFee | money}}/元
        </div>
      </div>
      <div v-if="status[data.acceptStatus].name == '待接收'" class="right">
        <a class="btn btn-active" @click.stop="recept">接受</a>
        <a class="btn" style="margin-right: 8px" @click.stop="refuse">拒绝</a>
      </div>
    </div>
  </div>
</template>
<script>
import ORDER_STATUS from '../constant/ORDER_STATUS'
import { money } from '../libs'
export default {
  name: 'tab-card',
  metaInfo: {
    title: 'tab-card'
  },
  filters: {
    money
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    status () {
      const obj = {}
      ORDER_STATUS.forEach(el => {
        obj[el.value] = {
          name: el.name,
          color: el.color
        }
      })
      return obj
    }
  },
  methods: {
    recept () {
      this.$emit('card-action', 'recept', this.data.shipperOrderId)
      return false
    },
    refuse () {
      this.$emit('card-action', 'refuse', this.data.shipperOrderId)
      return false
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
  padding 10px 10px 10px 0
  .create-time
    font-size 14px
    line-height 20px
    color #666
    display inline-block
  .order-status
    font-size 12px
    line-height 16px
    margin-top 2px
    display inline-block
    width 45px
    text-align center
    color #fff
.consignee-info
  padding-bottom 15px
  .city
    color #333
    font-size 18px
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
    color #666
    font-size 14px
    line-height 20px
.footer
  border-top 1px sold #ccc
  overflow hidden
  padding 8px 0
  .left
    width 50%
    .settlement
      font-size 12px
    .fee
      color #FA8C16
      font-size 20px
      line-height 28px
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
</style>
