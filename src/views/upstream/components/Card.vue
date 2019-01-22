<template>
  <div class="tab-card">
    <div class="tab-card-title">
      <div class="create-time">{{data.createTime | datetimeFormat}}</div>
      <div v-if="status[data.acceptStatus]" :class="status[data.acceptStatus].color" class="order-status right">{{status[data.acceptStatus].name}}</div>
    </div>
    <div class="consignee-info">
      <div class="city">
        {{data.departureCityName}} <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> {{data.destinationCityName}}
      </div>
      <div class="cargos">
        <div class="cargo-infos">{{cargoName}}</div>
        <div v-if="data.weight" class="cargo-infos">{{data.weight | weight}}吨</div>
        <div v-if="data.volume" class="cargo-infos">{{data.volume | volume}}方</div>
        <div v-if="data.quantity" class="cargo-infos">{{data.quantity}}件</div>
      </div>
      <div class="company">
        {{data.shipperCompanyName}} {{data.consignerContact}}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="settlement">{{data.settlementTypeDesc}}</div>
        <div class="fee">
          {{data.totalFee | money}}<span>/元</span>
        </div>
      </div>
      <div v-if="status[data.acceptStatus].name == '待接收'" class="right">
        <cube-button :outline="true" :inline="true" @click.stop="refuse">拒绝</cube-button>
        <cube-button :outline="true" :inline="true" primary style="margin-left: 8px" @click.stop="recept">接收</cube-button>
      </div>
    </div>
  </div>
</template>
<script>
import ORDER_STATUS from '../constant/ORDER_STATUS'
import { getMoney, getVolume, getWeight } from '../libs'
export default {
  name: 'tab-card',
  filters: {
    money: getMoney,
    volume: getVolume,
    weight: getWeight
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
    },
    cargoName () {
      let name = '-'
      const arr = this.data.cargoInfoDTO
      if (arr.length) {
        const cargoNm = arr[0].name
        name = cargoNm.length > 10 ? `${cargoNm.substr(0, 10)}...` : cargoNm
        if (arr.length > 1) {
          name += '等'
        }
      }
      return name
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
  padding 10px 0
  border-bottom 1px solid #F3F5F9
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
  padding 15px 0
  .city
    color #333
    font-size 18px
    font-weight bold
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
button
  width 54px
</style>
