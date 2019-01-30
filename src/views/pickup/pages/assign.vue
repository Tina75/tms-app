<template>
  <div class="pickup-assign">
    <cube-scroll v-if="showPage" ref="$scroll">
      <div class="edit-form">
        <cube-form ref="assign-form" :model="model" :options="options" :immediate-validate="false" @validate="validateHandler">
          <cube-form-group>
            <cube-form-item :field="fields['assignCarType']"/>
          </cube-form-group>
          <cube-form-group v-if="model.assignCarType === 1">
            <cube-form-item :field="fields['carrierName']"/>
            <cube-form-item :field="fields['carrierCarNo']"/>
            <cube-form-item :field="fields['carrierDriverName']"/>
            <cube-form-item :field="fields['carrierDriverPhone']"/>
            <cube-form-item :field="fields['carType']"/>
            <cube-form-item :field="fields['carLength']"/>
          </cube-form-group>
          <cube-form-group v-if="model.assignCarType === 2">
            <cube-form-item :field="fields['carNo']"/>
            <cube-form-item :field="fields['selfDriverName']"/>
            <cube-form-item :field="fields['selfAssistantDriverName']"/>
          </cube-form-group>
          <cube-form-group>
            <cube-form-item v-if="model.assignCarType === 1" :field="fields['freightFee']"/>
            <cube-form-item v-if="model.assignCarType === 2" :field="fields['gasFee']"/>
            <cube-form-item :field="fields['loadFee']"/>
            <cube-form-item :field="fields['unloadFee']"/>
            <cube-form-item :field="fields['insuranceFee']"/>
            <cube-form-item :field="fields['otherFee']"/>
            <cube-form-item :field="fields['totalFee']">
              <span class="total-money">{{model.totalFee}}</span>
            </cube-form-item>
            <cube-form-item v-if="model.assignCarType === 1" :field="fields['settlementType']"/>
            <cube-form-item v-if="model.assignCarType === 1 && model.settlementType === 1" ref="cash-item" :field="fields['cashAmount']"/>
            <cube-form-item v-if="model.assignCarType === 1 && model.settlementType === 1" ref="fuel-item" :field="fields['fuelCardAmount']"/>
          </cube-form-group>
          <cube-form-group>
            <cube-form-item v-if="orderLength > 1" :field="fields['allocationStrategy']"/>
          </cube-form-group>
          <cube-form-group>
            <cube-form-item class="text-item" :field="fields['remark']"/>
          </cube-form-group>
        </cube-form>
      </div>
    </cube-scroll>
    <div class="confirm-btns">
      <a @click="submitAssign">确定</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NP from 'number-precision'
import inputAutoPosition from '../../order/create/js/inputAutoPosition'

export default {
  name: 'pickup-assign',
  metaInfo () {
    return {
      title: this.$route.query.isEdit ? '编辑' : '派车'
    }
  },
  data () {
    let _this = this
    return {
      showPage: true,
      validity: {},
      valid: true,
      orderLength: 0,
      isSubmitValid: false,
      model: {
        assignCarType: 1,
        carNo: '',
        selfDriverName: '',
        selfAssistantDriverName: '',
        carrierName: '',
        carrierCarNo: '',
        carrierDriverName: '',
        carrierDriverPhone: '',
        carType: '',
        carLength: '',
        freightFee: '',
        loadFee: '',
        unloadFee: '',
        insuranceFee: '',
        otherFee: '',
        totalFee: '',
        settlementType: 1,
        payType: 2,
        cashAmount: '',
        fuelCardAmount: '',
        allocationStrategy: '',
        remark: ''
      },
      options: {
        layout: 'standard'
      },
      fields: {
        assignCarType: {
          type: 'select',
          modelKey: 'assignCarType',
          label: '派车方式',
          props: {
            options: [
              {
                value: 1,
                text: '外转'
              },
              {
                value: 2,
                text: '自送'
              }
            ],
            placeholder: '请选择'
          }
        },
        carNo: {
          type: 'select',
          modelKey: 'carNo',
          label: '车牌号',
          props: {
            options: [],
            placeholder: '请选择（必填）'
          },
          rules: {
            required: true
          },
          messages: {
            required: '车牌号必选'
          },
          trigger: 'change'
        },
        selfDriverName: {
          type: 'select',
          modelKey: 'selfDriverName',
          label: '主司机',
          props: {
            options: [],
            placeholder: '请选择（必填）'
          },
          events: {
            'change': (value) => {
              _this.fields.selfAssistantDriverName.props.options = Object.assign([], _this.backupDriverList)
              _this.fields.selfAssistantDriverName.props.options.splice(_this.backupDriverList.indexOf(value), 1)
            }
          },
          rules: {
            required: true
          },
          messages: {
            required: '主司机必选'
          },
          trigger: 'change'
        },
        selfAssistantDriverName: {
          type: 'select',
          modelKey: 'selfAssistantDriverName',
          label: '副司机',
          props: {
            options: [],
            placeholder: '请选择'
          },
          events: {
            'change': (value) => {
              _this.fields.selfDriverName.props.options = Object.assign([], _this.backupDriverList)
              _this.fields.selfDriverName.props.options.splice(_this.backupDriverList.indexOf(value), 1)
            }
          }
        },
        carrierName: {
          type: 'input',
          modelKey: 'carrierName',
          label: '承运商名称',
          props: {
            maxlength: 20,
            placeholder: '请输入（必填）'
          },
          rules: {
            required: true
          },
          messages: {
            required: '承运商必填'
          },
          events: {
            'focus': (e) => {
              _this.inputFocus(e)
            }
          },
          trigger: 'blur'
        },
        carrierCarNo: {
          type: 'input',
          modelKey: 'carrierCarNo',
          label: '车牌号',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z](([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$)/
          },
          messages: {
            pattern: '请输入正确的车牌号'
          },
          events: {
            'focus': (e) => {
              _this.inputFocus(e)
            }
          },
          trigger: 'blur'
        },
        carrierDriverName: {
          type: 'input',
          modelKey: 'carrierDriverName',
          label: '司机姓名',
          props: {
            maxlength: 15,
            placeholder: '请输入'
          },
          events: {
            'focus': (e) => {
              _this.inputFocus(e)
            }
          }
        },
        carrierDriverPhone: {
          type: 'input',
          modelKey: 'carrierDriverPhone',
          label: '司机手机号',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^(1\d{2}\s\d{4}\s\d{4})?$/
          },
          messages: {
            pattern: '请输入正确的手机号码'
          },
          events: {
            'focus': (e) => {
              _this.inputFocus(e)
            },
            'input': (val) => {
              if (!val || val[0] !== '1') return
              val = val.trim().split(' ').join('')
              let phoneArr = []
              let phoneTemp = ''
              for (let i in val) {
                i = Number(i)
                phoneTemp += val[i]
                if (!phoneArr.length && i === 2) {
                  phoneArr.push(phoneTemp)
                  phoneTemp = ''
                } else if (phoneTemp.length === 4) {
                  phoneArr.push(phoneTemp)
                  phoneTemp = ''
                } else if (i === (val.length - 1)) {
                  phoneArr.push(phoneTemp)
                  phoneTemp = ''
                }
              }
              this.$nextTick(() => {
                this.model.carrierDriverPhone = phoneArr.join(' ')
              })
            }
          },
          trigger: 'blur'
        },
        carType: {
          type: 'select',
          modelKey: 'carType',
          label: '车型',
          props: {
            options: [
              {
                value: 1,
                text: '平板'
              },
              {
                value: 2,
                text: '高栏'
              },
              {
                value: 3,
                text: '厢车'
              },
              {
                value: 4,
                text: '自卸'
              },
              {
                value: 5,
                text: '冷藏'
              },
              {
                value: 6,
                text: '保温'
              },
              {
                value: 7,
                text: '高低板'
              },
              {
                value: 8,
                text: '面包车'
              },
              {
                value: 9,
                text: '爬梯车'
              },
              {
                value: 10,
                text: '飞翼车'
              },
              {
                value: 11,
                text: '罐车'
              }
            ],
            placeholder: '请选择'
          }
        },
        carLength: {
          type: 'select',
          modelKey: 'carLength',
          label: '车长',
          props: {
            options: [
              {
                value: 17,
                text: '17.5米'
              },
              {
                value: 16,
                text: '16米'
              },
              {
                value: 15,
                text: '15米'
              },
              {
                value: 14,
                text: '13米'
              },
              {
                value: 13,
                text: '12.5米'
              },
              {
                value: 12,
                text: '11.7米'
              },
              {
                value: 11,
                text: '9.6米'
              },
              {
                value: 10,
                text: '8.7米'
              },
              {
                value: 9,
                text: '8.2米'
              },
              {
                value: 8,
                text: '7.7米'
              },
              {
                value: 7,
                text: '6.8米'
              },
              {
                value: 6,
                text: '6.2米'
              },
              {
                value: 4,
                text: '4.2米'
              },
              {
                value: 3,
                text: '3.8米'
              },
              {
                value: 2,
                text: '2.7米'
              },
              {
                value: 1,
                text: '1.8米'
              }
            ],
            placeholder: '请选择'
          }
        },
        freightFee: _this.createMoneyField('freightFee', '运输费(元)'),
        gasFee: _this.createMoneyField('freightFee', '油费(元)'),
        loadFee: _this.createMoneyField('loadFee', '装货费(元)'),
        unloadFee: _this.createMoneyField('unloadFee', '卸货费(元)'),
        insuranceFee: _this.createMoneyField('insuranceFee', '保险费(元)'),
        otherFee: _this.createMoneyField('otherFee', '其他(元)'),
        totalFee: {
          modelKey: 'totalFee',
          label: '费用合计(元)'
        },
        settlementType: {
          type: 'select',
          modelKey: 'settlementType',
          label: '结算方式',
          props: {
            options: [
              {
                value: 1,
                text: '按单结'
              },
              {
                value: 2,
                text: '月结'
              }
            ],
            placeholder: '请选择'
          }
        },
        cashAmount: _this.createSettlementMoneyField('cashAmount', '到付现金(元)'),
        fuelCardAmount: _this.createSettlementMoneyField('fuelCardAmount', '到付油卡(元)'),
        allocationStrategy: {
          type: 'select',
          modelKey: 'allocationStrategy',
          label: '分摊策略',
          props: {
            options: [
              {
                value: 1,
                text: '按订单数分摊'
              },
              {
                value: 2,
                text: '按件数分摊'
              },
              {
                value: 3,
                text: '按重量分摊'
              },
              {
                value: 4,
                text: '按体积分摊'
              }
            ],
            placeholder: '请选择'
          }
        },
        remark: {
          type: 'textarea',
          modelKey: 'remark',
          label: '备注',
          props: {
            autoExpand: true,
            placeholder: '请输入'
          },
          events: {
            'focus': (e) => {
              _this.inputFocus(e)
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['backupDriverList']),
    ...mapGetters(['UserConfig'])
  },
  methods: {
    ...mapActions('pickup', ['getPickupDetailForForm', 'getCarrierNameList', 'getSelfCarList', 'getSelfDriverList', 'assign', 'pickupEdit']),
    ...mapActions('order/create', ['sendDirectly']),
    ...inputAutoPosition,
    validateHandler(result) {
      this.validity = result.validity
      if (result.valid !== false || result.firstInvalidFieldIndex > 13) {
        this.model.totalFee = NP.plus(this.model.freightFee, this.model.loadFee, this.model.unloadFee, this.model.otherFee, this.model.insuranceFee)
      }
      if (this.isSubmitValid) {
        let resultArray = Object.values(result.validity)
        if (resultArray.some(item => item.result.required && !item.result.required.valid)) {
          window.toast('请填写必填信息')
        }
        if (resultArray.some(item => item.result.pattern && !item.result.pattern.valid)) {
          window.toast('已填信息格式不正确')
        }
        if (resultArray.some(item => item.result.custom && !item.result.custom.valid)) {
          window.toast('结算总额应与费用合计相等')
        }
        this.isSubmitValid = false
      }
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    async submitAssign () {
      function moneyReduce (money) {
        return (money === '' || money === null) ? null : NP.times(money, 100)
      }
      let isValid = await this.$refs['assign-form'].validate()
      let freightValid = await this.freightValid()
      if (isValid && freightValid) {
        let req = {
          carrierName: this.model.carrierName,
          driverName: this.model.assignCarType === 1 ? this.model.carrierDriverName : this.model.selfDriverName.split('-')[0],
          driverPhone: this.model.assignCarType === 1 ? (this.model.carrierDriverPhone || '').split(' ').join('') : this.model.selfDriverName.split('-')[1],
          carNo: this.model.assignCarType === 1 ? this.model.carrierCarNo : this.model.carNo.split('-')[0],
          carType: this.model.assignCarType === 1 ? this.model.carType : this.model.carNo.split('-')[1],
          carLength: this.model.assignCarType === 1 ? this.model.carLength : this.model.carNo.split('-')[2],
          freightFee: moneyReduce(this.model.freightFee),
          loadFee: moneyReduce(this.model.loadFee),
          unloadFee: moneyReduce(this.model.unloadFee),
          otherFee: moneyReduce(this.model.otherFee),
          insuranceFee: moneyReduce(this.model.insuranceFee),
          settlementType: this.model.assignCarType === 1 ? this.model.settlementType : '',
          settlementPayInfo: this.model.assignCarType === 1 ? [{
            payType: this.model.payType,
            fuelCardAmount: moneyReduce(this.model.fuelCardAmount),
            cashAmount: moneyReduce(this.model.cashAmount)
          }] : [],
          assignCarType: this.model.assignCarType,
          assistantDriverName: this.model.assignCarType === 1 ? '' : this.model.selfAssistantDriverName.split('-')[0],
          assistantDriverPhone: this.model.assignCarType === 1 ? '' : this.model.selfAssistantDriverName.split('-')[1],
          allocationStrategy: this.model.allocationStrategy,
          remark: this.model.remark
        }
        if (this.$route.query.type) {
          await this.sendDirectly(req)
        } else {
          if (this.$route.query.isEdit) {
            await this.pickupEdit({ ...req, pickUpId: this.$route.params.id })
          } else {
            await this.assign({ ...req, pickUpId: this.$route.params.id })
          }
        }
        this.$router.back()
      } else {
        this.isSubmitValid = true
        if (!freightValid) {
          window.toast('结算总额应与费用合计相等')
        }
      }
    },
    createMoneyField (field, name) {
      return {
        type: 'input',
        modelKey: field,
        label: name,
        props: {
          placeholder: '请输入'
        },
        rules: {
          pattern: /^((([1-9]\d{0,8})|0)(\.\d{1,4})?)?$/
        },
        messages: {
          pattern: '不得超过9位整数和4位小数'
        },
        trigger: 'blur',
        events: {
          'focus': (e) => {
            this.inputFocus(e)
          }
        }
      }
    },
    createSettlementMoneyField (field, name) {
      const _this = this
      return {
        type: 'input',
        modelKey: field,
        label: name,
        props: {
          placeholder: '请输入'
        },
        rules: {
          pattern: /^((([1-9]\d{0,8})|0)(\.\d{1,4})?)?$/,
          custom: (val) => {
            return NP.plus(_this.model.fuelCardAmount, _this.model.cashAmount) === NP.plus(0, _this.model.totalFee)
          }
        },
        messages: {
          pattern: '不得超过9位整数和4位小数',
          custom: ' 结算总额应与费用合计相等'
        },
        trigger: 'blur',
        events: {
          'focus': (e) => {
            _this.inputFocus(e)
          },
          'blur': () => {
            this.$refs['fuel-item'].validate()
            this.$refs['cash-item'].validate()
          }
        }
      }
    },
    freightValid () {
      return new Promise((resolve, reject) => {
        console.log(this.model.settlementType)
        console.log(this.model.fuelCardAmount, this.model.cashAmount)
        resolve((this.model.assignCarType !== 1 || this.model.settlementType !== 1) || (NP.plus(this.model.fuelCardAmount, this.model.cashAmount) === NP.plus(0, this.model.totalFee)))
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      function moneyInit (money) {
        return money !== null ? NP.divide(money, 100) : ''
      }
      if (to.params.id) {
        vm.getPickupDetailForForm(to.params.id).then(data => {
          vm.orderLength = data.orderLength
          vm.model.assignCarType = data.assignCarType
          vm.model.carNo = data.assignCarType === 1 ? '' : `${data.carNo}-${data.carType}-${data.carLength}`
          vm.model.selfDriverName = data.assignCarType === 1 ? '' : `${data.driverName}-${data.driverPhone}`
          vm.model.selfAssistantDriverName = data.assignCarType === 1 ? '' : `${data.assistantDriverName}-${data.assistantDriverPhone}`
          vm.model.carrierName = (data.assignCarType === 1 && data.carrierName) ? data.carrierName : ''
          vm.model.carrierCarNo = data.assignCarType === 1 ? data.carNo : ''
          vm.model.carrierDriverName = data.assignCarType === 1 ? data.driverName : ''
          vm.model.carrierDriverPhone = data.assignCarType === 1 ? data.driverPhone : ''
          vm.model.carType = data.assignCarType === 1 ? data.carType : ''
          vm.model.carLength = data.assignCarType === 1 ? data.carLength : ''
          vm.model.freightFee = moneyInit(data.freightFee)
          vm.model.insuranceFee = moneyInit(data.insuranceFee)
          vm.model.loadFee = moneyInit(data.loadFee)
          vm.model.unloadFee = moneyInit(data.unloadFee)
          vm.model.otherFee = moneyInit(data.otherFee)
          vm.model.totalFee = moneyInit(data.totalFee)
          vm.model.settlementType = data.settlementType || 1
          vm.model.payType = data.settlementPayInfo.length ? data.settlementPayInfo[0].payType : 2
          vm.model.cashAmount = data.settlementPayInfo.length ? moneyInit(data.settlementPayInfo[0].cashAmount) : ''
          vm.model.fuelCardAmount = data.settlementPayInfo.length ? moneyInit(data.settlementPayInfo[0].fuelCardAmount) : ''
          vm.model.allocationStrategy = data.orderLength > 1 ? (data.allocationStrategy || vm.UserConfig.allocationStrategyInfo.waybillStrategy || 1) : null
          vm.model.remark = data.remark || ''
        })
      } else {
        vm.orderLength = 0
        vm.model = {
          assignCarType: 1,
          carNo: '',
          selfDriverName: '',
          selfAssistantDriverName: '',
          carrierName: '',
          carrierCarNo: '',
          carrierDriverName: '',
          carrierDriverPhone: '',
          carType: '',
          carLength: '',
          freightFee: '',
          loadFee: '',
          unloadFee: '',
          insuranceFee: '',
          otherFee: '',
          totalFee: '',
          settlementType: 1,
          payType: 2,
          cashAmount: '',
          fuelCardAmount: '',
          allocationStrategy: '',
          remark: ''
        }
      }
      vm.getSelfCarList().then(list => {
        vm.fields.carNo.props.options = list
      })
      vm.getSelfDriverList().then(list => {
        vm.fields.selfDriverName.props.options = list
        vm.fields.selfAssistantDriverName.props.options = list
      })
      vm.showPage = false
      vm.$nextTick(() => { vm.showPage = true })
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../../assets/font/iconfont.css"
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
    display: -webkit-box;
    display: -webkit-flex;
    flex-direction column
    .edit-form
      padding-top: 15px;
      flex 1
      -webkit-box-flex: 1
      height: calc(100% - 45px)
      overflow auto
      overflow-scrolling touch
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
                width 100%
              .iconfont
                width: 30px;
                margin: 15px 10px;
                padding: 0 10px
                line-height: 20px;
                border-left: 1px solid #ddd;
          &.text-item
            display: block
            .cube-form-field
              display: block
          .cube-validator-content
            .cube-input
              width 100%
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
            margin-top: 3px;
            font-size: 15px;
            text-align: right
          &.cube-validator
            display: block
            .cube-validator-content
              width: 100%;
            .cube-validator-msg
              text-align: right
              position relative
              pointer-events: none
              &:before
                display: none
              .cube-validator-msg-def
                position: absolute
                top: -15px
                color: #e64340;
                font-size: 12px;
                z-index 99
                right: 0
        .cube-select
          padding-right: 0;
          display: flex
          align-items center
          span
            font-size: 15px;
            display: inline-block
            margin-top: 3px;
          .cube-select-icon
            @extend .icon
            @extend .iconfont
            @extend .icon-ico_right
            position initial
            vertical-align: middle
            border: none
            margin-left: 10px;
            margin-top: 5px
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
      display: -webkit-box;
      display: -webkit-flex;
      a
        flex: 1
        -webkit-box-flex: 1
        background: #27A3BD;
        text-align: center
        height: 45px
        line-height: 45px
        font-size: 17px
        color: #ffffff
        &.light-btn
          background: #32C4D3;
</style>
