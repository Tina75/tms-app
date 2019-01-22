<template>
  <div class="pickup-assign">
    <div class="edit-form">
      <dispatch-city
        v-if="isEditMode"
        :start-code.sync="start"
        :end-code.sync="end"
        class="city"/>
      <div class="form-item" @click="showPickerStyle">
        <label >派车方式</label>
        <span class="form-item-value">{{assignCarTypes[assignCarType-1].content}}</span>
        <i class="iconfont icon-ico_right"/>
      </div>

      <send-self/>
    </div>
    <div class="confirm-btns">
      <a @click="submitAssign">确定</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NP from 'number-precision'
import DispatchCity from '../components/dispach-city'
import SendSelf from '../components/send-car/send-self.vue'

export default {
  name: 'delivery-send-car',
  metaInfo: {
    title: '派车'
  },
  components: { DispatchCity, SendSelf },

  data () {
    return {
      validity: {},
      valid: true,
      start: -1,
      end: -1,
      isEditMode: false, // 是否为编辑模式
      allDriverList: [],

      assignCarType: 2, // 派车类型
      assignCarTypes: [{ value: 1, content: '外转' }, { value: 2, content: '自送' }]
    }
  },

  computed: {
    ...mapGetters('pickup', ['backupDriverList']),
    ...mapGetters('delivery', ['WaybillDetail'])
  },
  methods: {
    ...mapActions('delivery', ['getWaybillDetail', 'doSendCar', 'getSend', 'doEditWaybill']),
    ...mapActions('pickup', ['getCarrierNameList', 'getSelfCarList', 'getSelfDriverList']),
    ...mapActions('order/create', ['sendDirectly']),
    validateHandler(result) {
      console.log('result')

      this.validity = result.validity
      this.valid = result.valid
      if (result.valid !== false) {
        if (this.model.assignCarType === 2) {
          this.model.totalFee =
            NP.plus(
              this.model.freightFee,
              this.model.loadFee,
              this.model.unloadFee,
              this.model.tollFee,
              this.model.accommodation,
              this.model.insuranceFee,
              this.model.otherFee) - this.model.infoFee
        }
      }
      // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    async submitAssign () {
      let isValid = await this.$refs['assign-form'].validate()
      if (isValid) {
        console.log(this.model.assignCarType, this.model.selfDriverName)

        const data = {
          start: this.start,
          end: this.end,
          carrierName: this.model.carrierName,
          driverName: this.model.assignCarType === 1 ? this.model.driverName : this.model.selfDriverName.split('-')[0],
          driverPhone: this.model.assignCarType === 1 ? this.model.driverPhone : this.model.selfDriverName.split('-')[1],
          carNo: this.model.assignCarType === 1 ? this.model.carNo : this.model.carNo.split('-')[0],
          carType: this.model.assignCarType === 1 ? this.model.carType : this.model.carNo.split('-')[1],
          carLength: this.model.assignCarType === 1 ? this.model.carLength : this.model.carNo.split('-')[2],
          mileage: NP.times(this.model.mileage, 1000),
          freightFee: NP.times(this.model.freightFee, 100),
          tollFee: NP.times(this.model.tollFee, 100),
          accommodation: NP.times(this.model.accommodation, 100),
          loadFee: NP.times(this.model.loadFee, 100),
          unloadFee: NP.times(this.model.unloadFee, 100),
          otherFee: NP.times(this.model.otherFee, 100),
          infoFee: NP.times(this.model.infoFee, 100),
          insuranceFee: NP.times(this.model.insuranceFee, 100),
          settlementType: this.model.assignCarType === 1 ? this.model.settlementType : '',
          settlementPayInfo: this.model.assignCarType === 1 ? [
            {
              payType: 1,
              fuelCardAmount: NP.times(this.model.fuelCardAmount1, 100),
              cashAmount: NP.times(this.model.cashAmount1, 100)
            },
            {
              payType: 2,
              fuelCardAmount: NP.times(this.model.fuelCardAmount2, 100),
              cashAmount: NP.times(this.model.cashAmount2, 100)
            },
            {
              payType: 3,
              fuelCardAmount: NP.times(this.model.fuelCardAmount3, 100),
              cashAmount: NP.times(this.model.cashAmount3, 100)
            },
            {
              payType: 4,
              fuelCardAmount: NP.times(this.model.fuelCardAmount4, 100),
              cashAmount: NP.times(this.model.cashAmount4, 100)
            }] : [],
          cashBack: NP.times(this.model.cashBack, 100),
          waybillId: this.$route.params.id,
          carrierWaybillNo: this.model.carrierWaybillNo,
          assignCarType: this.model.assignCarType,
          assistantDriverName: this.model.assignCarType === 1 ? '' : this.model.selfAssistantDriverName.split('-')[0],
          assistantDriverPhone: this.model.assignCarType === 1 ? '' : this.model.selfAssistantDriverName.split('-')[1],
          allocationStrategy: this.model.allocationStrategy,
          remark: this.model.remark
        }
        if (this.$route.query.type) { // 亮仔
          await this.sendDirectly(data)
        } else {
          if (this.isEditMode) { await this.doEditWaybill(data) } else { await this.doSendCar(data) }
          this.getSend()
        }

        this.$router.back()
      }
    },
    showPickerStyle() {
      this.$createActionSheet({
        title: '选择派车类型',
        pickerStyle: true,
        data: this.assignCarTypes,
        onSelect: (item, index) => {
          this.assignCarType = item.value
        }
      }).show()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!to.query.type) {
        vm.getWaybillDetail(to.params.id).then(({ waybill }) => {
          vm.start = waybill.start
          vm.end = waybill.end
          if (!waybill.carNo) return
          vm.isEditMode = true

          vm.model.assignCarType = waybill.assignCarType
          vm.model.carrierName = waybill.carrierName
          vm.model.carNo = waybill.carNo
          vm.model.driverName = waybill.driverName
          vm.model.driverPhone = waybill.driverPhone
          vm.model.carLength = waybill.carLength
          vm.model.carType = waybill.carType
          vm.model.carrierWaybillNo = waybill.carrierWaybillNo

          vm.model.mileage = waybill.mileage ? NP.divide(waybill.mileage, 1000) : ''
          vm.model.freightFee = waybill.freightFee ? NP.divide(waybill.freightFee, 100) : ''
          vm.model.insuranceFee = waybill.insuranceFee ? NP.divide(waybill.insuranceFee, 100) : ''
          vm.model.loadFee = waybill.loadFee ? NP.divide(waybill.loadFee, 100) : ''
          vm.model.unloadFee = waybill.unloadFee ? NP.divide(waybill.unloadFee, 100) : ''
          vm.model.tollFee = waybill.tollFee ? NP.divide(waybill.tollFee, 100) : ''
          vm.model.otherFee = waybill.otherFee ? NP.divide(waybill.otherFee, 100) : ''
          vm.model.infoFee = waybill.infoFe ? NP.divide(waybill.infoFee, 100) : ''
          vm.model.totalFee = waybill.totalFee ? NP.divide(waybill.totalFee, 100) : ''
          vm.model.accommodation = waybill.accommodation ? NP.divide(waybill.accommodation, 100) : ''
          vm.model.settlementType = waybill.settlementType
          waybill.settlementPayInfo.forEach((item, index) => {
            vm.model[`cashAmount${index + 1}`] = item ? NP.divide(item.cashAmount, 100) : ''
            vm.model[`fuelCardAmount${index + 1}`] = item ? NP.divide(item.fuelCardAmount, 100) : ''
          })

          vm.model.remark = waybill.remark

          vm.model.cashBack = waybill.cashBack ? NP.divide(waybill.cashBack, 100) : ''
        })
      }
      vm.getCarrierNameList().then(list => {
        vm.fields.carrierName.props.options = list
      })
      vm.getSelfCarList().then(list => {
        vm.fields.carNoOnlySel.props.options = list
      })
      vm.getSelfDriverList().then(list => {
        vm.fields.selfDriverName.props.options = list
        vm.fields.selfAssistantDriverName.props.options = list
        vm.allDriverList = [...list]
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../../assets/font/iconfont.css"
  .form-item
    background white
    height 50px
    line-height 54px
    display flex
    padding 0 10px
    justify-content space-between
    &-value
      display inline-block
      text-align right
      flex-grow 2
      padding-right 10px
  .icon
    vertical-align middle
  .iconfont
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  .icon-ico_right
    &:before
      content: "\e6d6";
      color: #C5C8CE;
  .pickup-assign
    height: 100%
    display: flex
    flex-direction column
    .edit-form
      overflow-scrolling touch
      padding-top: 15px;
      flex 1
      overflow auto
      .city
        margin-top -15px
        margin-bottom 15px
      >>> .cube-form
        background-color: #F3F3F3;
        .cube-form-group
          background-color: #fff;
          margin-bottom: 15px;
        .cube-form-item
          min-height: 50px
          align-items start
          margin-left: 15px;
          padding-left: 0;
          &:after
            border-color: #cccccc;
          &.freight-input
            .cube-validator-content
              display: flex
              .cube-input
                flex: 1
              .iconfont
                width: 30px;
                margin: 15px 10px;
                padding: 0 10px
                line-height: 20px;
                border-left: 1px solid #ddd;
        .cube-form-label
          padding-top: 12px;
          width: 140px;
          span
            margin-top: 5px
            font-size: 15px
        .cube-form-item_required .cube-form-label
          span
            margin-top: 0
          &:before
            display: none
          &:after
            content: "*"
            display: block
            margin-top: 5px
            margin-left: 5px
            margin-right: 5px
            color: #e64340;
        .cube-form-field
          display: flex
          justify-content:flex-end
          .total-money
            font-size: 20px;
            color: #FA8C16
            line-height: 50px
          .cube-validator-content
            display: flex
            justify-content:flex-end
          input
            font-size: 15px;
            text-align: right
          &.cube-validator
            display: block
            .cube-validator-content
              width: 100%;
            .cube-validator-msg
              text-align: right
              position relative
              &:before
                display: none
              .cube-validator-msg-def
                position: absolute
                top: -15px
                color: #e64340;
                font-size: 12px;
                z-index 101
                right: 0
        .cube-select
          padding-right: 0;
          display: flex
          align-items center
          span
            font-size: 15px;
            display: inline-block
            margin-top: 5px;
          .cube-select-icon
            @extend .icon
            @extend .iconfont
            @extend .icon-ico_right
            position initial
            vertical-align: middle
            border: none
            margin-left: 10px;
            margin-top: 3px
            transform none
        .cube-textarea-wrapper
          height: auto
          margin-bottom: 5px
          textarea
            min-height: 50px
            width: 270px;
    .confirm-btns
      height: 45px
      display: flex
      a
        flex: 1
        background: #27A3BD;
        text-align: center
        height: 45px
        line-height: 45px
        font-size: 17px
        color: #ffffff
        &.light-btn
          background: #32C4D3;
</style>
