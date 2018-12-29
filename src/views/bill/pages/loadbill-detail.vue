<template>
  <div class="detail-page-wrapper">
    <cube-scroll>
      <div class="detail-page">
        <DetailHeader
          :bill-info="billInfo"
          :status="status"
          :data="cargoTotal" />

        <div class="card">
          <p class="card-title">提货信息</p>

          <ul>
            <li class="cell">
              <Contact
                class="cell-contact"
                :data="cargoInfo" />
            </li>
            <li
              v-if="cargoInfo.weight || cargoInfo.volume || cargoInfo.quantity"
              class="cell">
              <span
                v-if="cargoInfo.weight"
                class="cargo-info-item">
                {{ cargoInfo.weight }}吨
              </span>
              <span
                v-if="cargoInfo.volume"
                class="cargo-info-item">
                {{ cargoInfo.volume }}方
              </span>
              <span
                v-if="cargoInfo.quantity"
                class="cargo-info-item">
                {{ cargoInfo.quantity }}件
              </span>
            </li>
          </ul>
          <router-link
            v-if="cargoAllInfo > 1"
            class="more-detail"
            :to="{ name: 'loabill-cargo-list', params: { billId: billInfo.billId } }">
            查看所有待提货信息({{ cargoAllInfo }})
            <Iconfont
              name="yzg-hebingxingzhuang3"
              size="10" />
          </router-link>
        </div>

        <ul class="card">
          <li class="cell cell-large">
            <div class="cell-title">货主名称</div>
            <div class="cell-content">{{ baseInfo.companyName }}</div>
          </li>
          <li class="cell cell-large">
            <div class="cell-title">提货费</div>
            <div class="cell-content">
              {{ baseInfo.totalFee | moneyFormat }}元
              {{ baseInfo.settlementType === settlementTypeTimes ? '（按单结）' : '(月结)' }}
            </div>
          </li>
          <li class="cell cell-large">
            <div class="cell-title">提货单号</div>
            <div class="cell-content">{{ baseInfo.loadbillNo }}</div>
          </li>
          <li class="cell cell-large">
            <div class="cell-title">创建时间</div>
            <div class="cell-content">{{ baseInfo.createTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
          </li>
          <li
            v-if="baseInfo.arriveTime"
            class="cell cell-large">
            <div class="cell-title">送达时间</div>
            <div class="cell-content">{{ baseInfo.arriveTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
          </li>
          <li
            v-if="baseInfo.remark"
            class="cell cell-large">
            <div class="cell-title">备注</div>
            <div class="cell-content cell-content-text">{{ baseInfo.remark }}</div>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <ButtonFooter :buttons="buttons" />
  </div>
</template>

<script>
import DetailHeader from '../components/DetailHeader'
import Contact from '../components/Contact'
import ButtonFooter from '../components/ButtonFooter'
import { mapGetters, mapActions } from 'vuex'
import { getFields, getBillStatus, setRightButton, clearRightButton } from '../js/detail'
import { SETTLEMENT_TYPE, ASSIGN_CAR_TYPE, BILL_TYPE, BILL_STATUS, BILL_ABNORMAL } from '../js/constant'

export default {
  name: 'pickup-detail',
  metaInfo: { title: '提货单详情' },
  components: { DetailHeader, Contact, ButtonFooter },
  data () {
    return {
      billInfo: { billType: BILL_TYPE.LOADBILL, billId: this.$route.params.billId },
      settlementTypeTimes: SETTLEMENT_TYPE.TIMES,
      assignCarTypeTransfer: ASSIGN_CAR_TYPE.TRANSFER
    }
  },
  computed: {
    ...mapGetters([ 'LoadbillDetail' ]),

    status () {
      if (!this.LoadbillDetail) return {}
      return getBillStatus(this.LoadbillDetail.loadbill.status)
    },

    buttons () {
      if (!this.LoadbillDetail) return []

      const disabled = this.LoadbillDetail.loadbill.abnormalLabel !== BILL_ABNORMAL.ABNORMAL_HAS
      /* eslint-disable */
      switch (this.LoadbillDetail.loadbill.status) {
        case 1:
          return [
            { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } },
            { label: '装货完成', func: () => { this.changeStatus('请确定是否已经装货完成，并开始运输') } }
          ]
        case 2:
          return [
            { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } },
            { label: '货已送达', func: () => { this.changeStatus('请确认所有货物都已送达卸货地') } }
          ]
        case 3:
          return [ { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } } ]
        case 4:
          return [ { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } } ]
        default:
          return []
      }
    },

    baseInfo () {
      if (!this.LoadbillDetail) return {}
      return getFields(
        [
          'loadbillNo', // 运单号
          'companyName', // 公司名
          'settlementType', // 支付方式 1-按单结 2-月结
          'totalFee', // 运输费
          'createTime', // 创建时间
          'arriveTime', // 送达时间
          'assignCarType', // 运送类型 1-外转 2-自送
          'remark' // 备注
        ],
        this.LoadbillDetail.loadbill
      )
    },

    cargoTotal () {
      if (!this.LoadbillDetail) return {}
      return getFields(
        ['weight', 'volume', 'quantity'],
        this.LoadbillDetail.cargo
      )
    },

    cargoInfo () {
      if (!this.LoadbillDetail) return {}
      return getFields(
        [
          ['consignerPhone', 'phone'], // 收货人电话
          ['consignerAddress', 'address'], // 收货人地址
          ['consignerContact', 'name'], // 收货人
          'quantity',
          'weight',
          'volume'
        ],
        this.LoadbillDetail.cargo.cargoOrderList[0]
      )
    },

    cargoAllInfo () {
      return this.LoadbillDetail ? this.LoadbillDetail.cargo.cargoOrderList.length : 0
    }
  },
  methods: {
    ...mapActions([
      'getLoadbillDetail',
      'clearLoadbillDetail',
      'postLocation',
      'changeBillStatus'
    ]),

    async changeStatus (toast) {
      let status
      const billStatus = this.LoadbillDetail.loadbill.status
      if (billStatus === 1) status = BILL_STATUS.HAS_PACKED
      else if (billStatus === 2) status = BILL_STATUS.HAS_ARRIVED
      else return

      if (!confirm(toast)) return

      this.postLocation()
      await this.changeBillStatus({
        billId: this.$route.params.billId,
        billType: BILL_TYPE.LOADBILL,
        status
      })
      this.getLoadbillDetail(this.$route.params.billId)
    },

    showAbnormal () {
      this.$router.push({
        name: 'odd-list',
        params: { id: this.billInfo.billId },
        query: { type: this.billInfo.billType }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearLoadbillDetail()
      vm.getLoadbillDetail(vm.$route.params.billId)
      setRightButton(vm)
    })
  },
  beforeRouteLeave (to, from, next) {
    clearRightButton()
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/detail.styl';

  .bill-info
    margin-top 17px

  .cell-contact
    margin-bottom 9px

  .cargo-info-item
    margin-right 17px
</style>
