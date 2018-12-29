<template>
  <div class="detail-page-wrapper">
    <cube-scroll>
      <ul class="detail-part">
        <li class="cell">
          <ContactList :data="contact" />
        </li>

        <li class="cell">
          <div class="cell-title">回单数</div>
          <div class="cell-content cell-content-right">{{ baseInfo.expectReceiptNum || 0 }}</div>
        </li>
        <li class="cell">
          <div class="cell-title">代收货款</div>
          <div class="cell-content cell-content-right cell-content-bold">{{ baseInfo.collectionMoney | moneyFormat }}元</div>
        </li>
        <li class="cell">
          <div class="cell-title">发货时间</div>
          <div class="cell-content cell-content-right">{{ baseInfo.deliveryTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
        </li>
        <li class="cell">
          <div class="cell-title">到货时间</div>
          <div class="cell-content cell-content-right">{{ baseInfo.arriveTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
        </li>
        <li class="cell">
          <div class="cell-title">客户单号</div>
          <div class="cell-content cell-content-right">{{ baseInfo.customerOrderNo || '-' }}</div>
        </li>
      </ul>

      <ul class="detail-part">
        <li class="detail-header">
          <div class="detail-header-item">
            <p class="detail-header-item-data">
              <span>{{ cargoTotal.quantity || '-' }}</span>件
            </p>
            <p class="detail-header-item-title">货物总数</p>
          </div>
          <div class="detail-header-item">
            <p class="detail-header-item-data">
              <span>{{ cargoTotal.volume || '-' }}</span>方
            </p>
            <p class="detail-header-item-title">货物总体积</p>
          </div>
          <div class="detail-header-item">
            <p class="detail-header-item-data">
              <span>{{ cargoTotal.weight || '-' }}</span>吨
            </p>
            <p class="detail-header-item-title">货物总重量</p>
          </div>
        </li>

        <li
          v-for="(item, index) in cargoList"
          :key="index"
          class="cell cargo-info-cell">
          <p class="cargo-info">
            <span class="cargo-info-name">{{ item.cargoName | cargoNameFilter }}</span>
            <span
              v-if="item.weight || item.volume || item.quantity"
              class="cargo-info-detail">
              {{ item | cargoDetail }}
            </span>
          </p>

          <div
            v-if="item.remark1"
            class="cargo-remark">
            <span class="cargo-remark-tip">备注1：</span>
            <p class="cargo-remark-content">{{ item.remark1 }}</p>
          </div>
          <div
            v-if="item.remark2"
            class="cargo-remark">
            <span class="cargo-remark-tip">备注2：</span>
            <p class="cargo-remark-content">{{ item.remark2 }}</p>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import ContactList from '../components/ContactList'
import { mapActions } from 'vuex'
import { getFields } from '../js/detail'

export default {
  name: 'cargo-detail',
  metaInfo: { title: '货物详情' },
  components: { ContactList },
  data () {
    return {
      cargoTotal: {},
      cargoList: [],
      contact: {},
      baseInfo: {}
    }
  },
  filters: {
    cargoNameFilter (name) {
      if (name.length <= 10) return name
      return name.substr(0, 10) + '...'
    },
    cargoDetail (cargo) {
      const { weight, volume, quantity } = cargo
      let temp = []
      if (quantity) temp.push(quantity + '件')
      if (volume) temp.push(volume + '方')
      if (weight) temp.push(weight + '吨')
      return temp.join(' / ')
    }
  },
  methods: {
    ...mapActions([ 'getCargoDetail' ]),

    async fetchData () {
      const data = await this.getCargoDetail(this.$route.params.orderId)
      this.baseInfo = this.setBaseInfo(data)
      this.contact = this.setContactInfo(data)
      this.cargoTotal = this.setCargoTotal(data)
      this.cargoList = data.cargoList
    },

    setBaseInfo (data) {
      return getFields(
        [
          'collectionMoney', // 代收货款
          'deliveryTime', // 发货时间
          'arriveTime', // 到货时间
          'customerOrderNo', // 客户单号
          'expectReceiptNum' // 回单数
        ],
        data
      )
    },

    setCargoTotal (data) {
      return getFields(
        [
          'weight',
          'volume',
          'quantity'
        ],
        data
      )
    },

    setContactInfo (data) {
      return getFields(
        [
          'consignerPhone', // 收货人电话
          'consignerAddress', // 收货人地址
          'consignerContact', // 收货人
          'consigneePhone', // 发货人电话
          'consigneeAddress', // 发货人地址
          'consigneeContact', // 发货人
          'customerOrderNo' // 客户订单号
        ],
        data
      )
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.fetchData()
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/detail.styl';

  .detail-part
    margin-bottom 10px
    background #ffffff

  .detail-header
    display flex
    height 85px
    border-bottom 1px solid #e6e6e6

    &-item
      flex none
      display flex
      width 33.333333%
      flex-direction column
      justify-content center
      align-items center

      &-data
        font-size 12px
        line-height 30px
        color #009EB5
        margin-bottom 5px

        span
          font-size 22px
          font-weight bold

      &-title
        font-size 13px
        line-height 18px
        color #999999

  .cargo-info-cell
    display block
    padding-top 10px
    padding-bottom 10px

    .cargo-info
      min-height 20px
      font-size 14px
      line-height 20px
      color #666666

      &-name
        display inline-block
        // max-width 190px
        font-size 15px
        font-weight bold
        // white-space nowrap
        // overflow hidden
        // text-overflow ellipsis
        // vertical-align text-bottom

        &:before
          content "·"
          display inline-block
          margin-right 10px
          font-size 50px
          color #009EB5
          vertical-align text-top

      .cargo-info-detail
        vertical-align baseline

        &:before
          content "|"
          display inline-block
          font-size 14px
          margin-left 10px
          margin-right 5px
          color #b1b1b1

    .cargo-remark
      display flex
      margin-right 5px
      margin-top 10px
      padding 6px
      border-radius 2px
      line-height 17px
      font-size 12px
      background #F2F2F2

      &-tip
        flex none
        width 45px

      &-content
        flex auto
        color #878484
</style>
