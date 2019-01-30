<template>
  <div class="tab-card">
    <div class="tab-card-title border-bottom-1px">
      <div class="create-time">{{data.createTime | datetimeFormat}}</div>
      <div v-if="status[data.acceptStatus]" :class="status[data.acceptStatus].color" class="order-status right">{{status[data.acceptStatus].name}}</div>
      <div v-if="data.collectionMoney>0" class="collect right">代</div>
    </div>
    <div class="consignee-info border-bottom-1px">
      <div class="city">
        {{data.departureCityName || data.consignerAddress | textOverflow}} <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> {{data.destinationCityName || data.consigneeAddress | textOverflow}}
      </div>
      <!-- <div v-else class="city">
        <span class="cityAdress">{{data.consignerAddress}}</span> <i class="iconfont icon-line cube-ml-5 cube-mr-5"/> <span class="cityAdress">{{data.consigneeAddress}}</span>
      </div> -->
      <div class="cargos">
        <div class="cargo-infos">{{cargoName}}</div>
        <div v-if="data.weight" class="cargo-infos">{{data.weight | weight}}吨</div>
        <div v-if="data.volume" class="cargo-infos">{{data.volume | volume}}方</div>
        <div v-if="data.cargoNum" class="cargo-infos">{{data.cargoNum}}件</div>
      </div>
      <div class="company">
        {{data.shipperCompanyName}} {{data.consignerContact}}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="settlement">{{data.settlementTypeDesc}}</div>
        <div class="fee">
          {{data.totalFee | moneyFormat}}<span>/元</span>
        </div>
      </div>
      <div v-if="status[data.acceptStatus].name == '待接收'" class="right">
        <cube-button :outline="true" :inline="true" style="color:#999; border-color:#999" @click.stop="refuse">拒绝</cube-button>
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
        if (cargoNm) {
          name = cargoNm.length > 10 ? `${cargoNm.substr(0, 10)}...` : cargoNm
          if (arr.length > 1) {
            name += ' 等'
          }
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
.tab-card-title
  padding 10px 15px
  .create-time
    font-size 14px
    line-height 20px
    color #666
    display inline-block
  .right
    font-size 12px
    line-height 20px
    display inline-block
    text-align center
    color #fff
    border-radius 2px
    margin-left 5px
  .collect
    background #fcaf3b
    padding 0 3px
  .order-status
    width 45px
.consignee-info
  padding 14px 15px
  .city
    color #333
    font-size 18px
    font-weight bold
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    span
      display inline-block
      max-width 150px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  .cargos
    margin-top 6px
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
  overflow hidden
  padding 8px 15px
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
    margin-right 2px
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
