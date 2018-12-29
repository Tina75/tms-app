<template>
  <div class="detail-page-wrapper">
    <cube-scroll>
      <div class="detail-page">
        <DetailHeader
          :bill-info="billInfo"
          :status="status"
          :data="cargoTotal" />

        <div class="card">
          <ul>
            <li class="cell">
              <ContactList :data="cargoInfo" />
            </li>

            <li class="cell">
              <div class="cell-title">发货时间</div>
              <div class="cell-content cell-content-right">{{ cargoInfo.deliveryTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
            </li>
            <li class="cell">
              <div class="cell-title">到货时间</div>
              <div class="cell-content cell-content-right">{{ cargoInfo.arriveTime | datetime('YYYY-MM-DD HH:mm', '-') }}</div>
            </li>
            <li class="cell">
              <div class="cell-title">客户单号</div>
              <div class="cell-content cell-content-right">{{ cargoInfo.customerOrderNo || '-' }}</div>
            </li>
          </ul>
          <router-link
            class="more-detail"
            :to="{ name: 'waybill-cargo-list', params: { billId: billInfo.billId } }">
            查看所有货物信息({{ cargoAllInfo }})
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
          <template v-if="baseInfo.assignCarType === assignCarTypeTransfer">
            <li class="cell cell-large">
              <div class="cell-title">运输费</div>
              <div class="cell-content">
                {{ baseInfo.totalFee | moneyFormat }}元
                {{ baseInfo.settlementType === settlementTypeTimes ? '（按单结）' : '(月结)' }}
              </div>
            </li>
            <li
              v-if="baseInfo.settlementType === settlementTypeTimes"
              class="cell cell-large">
              <div class="cell-title">付款方式</div>
              <div class="cell-content cell-content-custom">
                <p
                  v-for="(item, index) in baseInfo.settlementPayInfo"
                  :key="index">
                  {{ item | paymentInfo }}
                  <span
                    v-if="item.cashAmount || item.fuelCardAmount"
                    class="cell-content-extra">
                    (现金{{ item.cashAmount | moneyFormat }}，油卡{{ item.fuelCardAmount | moneyFormat }})
                  </span>
                </p>
              </div>
            </li>
          </template>
          <li class="cell cell-large">
            <div class="cell-title">运单号</div>
            <div class="cell-content">{{ baseInfo.waybillNo }}</div>
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
            v-if="receipts && receipts.length"
            class="cell cell-large"
            @click="uploadReceipt">
            <div class="cell-title cell-title-photo">回单照片</div>
            <div class="cell-content cell-content-photo">
              <template v-for="(image, index) in receipts">
                <div
                  v-if="index < 3"
                  :key="index"
                  class="cell-content-photo-item"
                  :style="image | imageRender"
                >
                </div>
              </template>

              <Iconfont
                class="icon-narrow"
                name="yzg-gengduo-huidanzhao"
                size="16" />
            </div>
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
    <ButtonFooter
      v-if="buttons.length"
      :buttons="buttons" />
  </div>
</template>

<script>
import DetailHeader from '../components/DetailHeader'
import ContactList from '../components/ContactList'
import ButtonFooter from '../components/ButtonFooter'
import { mapGetters, mapActions } from 'vuex'
import { getFields, getBillStatus, setRightButton, clearRightButton } from '../js/detail'
import { SETTLEMENT_TYPE, ASSIGN_CAR_TYPE, PAY_TYPE, BILL_TYPE, BILL_STATUS, BILL_ABNORMAL } from '../js/constant'

export default {
  name: 'transport-detail',
  metaInfo: { title: '运输单详情' },
  components: { DetailHeader, ContactList, ButtonFooter },
  data () {
    return {
      billInfo: { billType: BILL_TYPE.WAYBILL, billId: this.$route.params.billId },
      settlementTypeTimes: SETTLEMENT_TYPE.TIMES,
      assignCarTypeTransfer: ASSIGN_CAR_TYPE.TRANSFER,
      payType: PAY_TYPE
    }
  },
  computed: {
    ...mapGetters([ 'WaybillDetail' ]),

    status () {
      if (!this.WaybillDetail) return {}
      return getBillStatus(this.WaybillDetail.waybill.status)
    },

    buttons () {
      if (!this.WaybillDetail) return []

      const disabled = this.WaybillDetail.waybill.abnormalLabel !== BILL_ABNORMAL.ABNORMAL_HAS
      /* eslint-disable */
      switch (this.WaybillDetail.waybill.status) {
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
          return [
            { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } },
            { label: '上传回单照片', func: () => { this.uploadReceipt() } }
          ]
        case 4:
          return [ { label: '查看运单异常', disabled, func: () => { this.showAbnormal() } } ]
        default:
          return []
      }
    },

    baseInfo () {
      if (!this.WaybillDetail) return {}
      return getFields(
        [
          'waybillNo', // 运单号
          'companyName', // 公司名
          'settlementType', // 支付方式 1-按单结 2-月结
          'settlementPayInfo', // 付款信息
          'totalFee', // 运输费
          'createTime', // 创建时间
          'arriveTime', // 送达时间
          'assignCarType', // 运送类型 1-外转 2-自送
          'remark' // 备注
        ],
        this.WaybillDetail.waybill
      )
    },

    cargoTotal () {
      if (!this.WaybillDetail) return {}
      return getFields(
        ['weight', 'volume', 'quantity'],
        this.WaybillDetail.cargo
      )
    },

    cargoInfo () {
      if (!this.WaybillDetail) return {}
      return getFields(
        [
          'consignerPhone', // 收货人电话
          'consignerAddress', // 收货人地址
          'consignerContact', // 收货人
          'consigneePhone', // 发货人电话
          'consigneeAddress', // 发货人地址
          'consigneeContact', // 发货人
          'customerOrderNo', // 客户订单号
          'deliveryTime', // 发货时间
          'arriveTime' // 送达时间
        ],
        this.WaybillDetail.cargo.cargoOrderList[0]
      )
    },

    cargoAllInfo () {
      return this.WaybillDetail
        ? this.WaybillDetail.cargo.cargoOrderList.length
        : 0
    },

    receipts () {
      if (!this.WaybillDetail || !this.WaybillDetail.waybill.receipt) return []
      return this.WaybillDetail.waybill.receipt
    }
  },
  filters: {
    imageRender (image) {
      return {
        background: `url(${process.env.VUE_APP_IMG_HOST}${image}?x-oss-process=image/resize,w_160,h_160) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }
    },

    paymentInfo (payment) {
      const prefix = PAY_TYPE[payment.payType]
      const money = payment.fuelCardAmount + payment.cashAmount
      const parsedMoney = money ? (parseFloat(money) / 100).toFixed(2) : money
      return `${prefix} ${parsedMoney}元`
    }
  },
  methods: {
    ...mapActions([
      'getWaybillDetail',
      'clearWaybillDetail',
      'postLocation',
      'changeBillStatus'
    ]),

    async changeStatus (toast) {
      let status
      const billStatus = this.WaybillDetail.waybill.status
      if (billStatus === 1) status = BILL_STATUS.HAS_PACKED
      else if (billStatus === 2) status = BILL_STATUS.HAS_ARRIVED
      else return

      if (!confirm(toast)) return

      this.postLocation()
      await this.changeBillStatus({
        billId: this.billInfo.billId,
        billType: BILL_TYPE.WAYBILL,
        status
      })
      this.getWaybillDetail(this.billInfo.billId)
    },

    uploadReceipt () {
      const cargos = this.WaybillDetail.cargo.cargoOrderList
      // 当仅存在一个订单并且无回单照片时直接进入上传回单页面
      // 否则进入订单列表页面
      if (cargos.length === 1 && !this.receipts.length) {
        this.$router.push({
          name: 'receipt-detail',
          params: { id: cargos[0].orderId },
          query: { billId: this.billInfo.billId }
        })
      } else {
        this.$router.push({
          name: 'receipt-list',
          params: { id: this.billInfo.billId }
        })
      }
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
      vm.clearWaybillDetail()
      vm.getWaybillDetail(vm.billInfo.billId)
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
@import '../assets/detail.styl'
.cell-content
  &-custom
    padding 15px 0
  p
    min-height 21px
    line-height 21px
    margin-bottom 6px
    &:last-child
      margin-bottom 0
  &-extra
    color #999999
  &-photo
    position relative
    display flex
    padding 9px
    &-item
      flex none
      width 63px
      height 63px
      margin-right 15px
      background #deafcb
.cell-title-photo
  line-height 78px
.icon-narrow
  position absolute
  right 10px
  margin-top 5px
  color #999999
</style>
