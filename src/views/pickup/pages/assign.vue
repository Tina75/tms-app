<template>
  <div class="pickup-assign">
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
          <cube-form-item :field="fields['carrierWaybillNo']"/>
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
          <cube-form-item v-if="model.assignCarType === 1 && model.settlementType === 1" :field="fields['fuelCardAmount']"/>
          <cube-form-item v-if="model.assignCarType === 1 && model.settlementType === 1" :field="fields['cashAmount']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['allocationStrategy']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['remark']"/>
        </cube-form-group>
      </cube-form>
    </div>
    <div class="confirm-btns">
      <a @click="submitAssign">确定</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NP from 'number-precision'

export default {
  name: 'pickup-assign',
  metaInfo: {
    title: '派车'
  },
  data () {
    let _this = this
    return {
      validity: {},
      valid: true,
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
        carrierWaybillNo: '',
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
          },
          rules: {
            required: true
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
          }
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
          }
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
          type: 'select',
          modelKey: 'carrierName',
          label: '承运商名称',
          props: {
            options: [],
            placeholder: '请选择'
          },
          rules: {
            required: true
          },
          messages: {
            pattern: '承运商必选'
          }
        },
        carrierCarNo: {
          type: 'input',
          modelKey: 'carrierCarNo',
          label: '车牌号',
          props: {
            placeholder: '请输入'
          },
          rules: {
            partten: /^[冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝京津沪][A-Za-z][A-Za-z0-9]{5,6}$/
          },
          messages: {
            pattern: '请输入正确的车牌号'
          },
          trigger: 'blur'
        },
        carrierDriverName: {
          type: 'input',
          modelKey: 'carrierDriverName',
          label: '司机姓名',
          props: {
            placeholder: '请输入'
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
            pattern: /^(1\d{10})?$/
          },
          messages: {
            pattern: '请输入正确的手机号码'
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
                value: 1,
                text: '1.8米'
              },
              {
                value: 2,
                text: '2.7米'
              },
              {
                value: 3,
                text: '3.8米'
              },
              {
                value: 4,
                text: '4.2米'
              },
              {
                value: 5,
                text: '5米'
              },
              {
                value: 6,
                text: '6.2米'
              },
              {
                value: 7,
                text: '6.8米'
              },
              {
                value: 8,
                text: '7.7米'
              },
              {
                value: 9,
                text: '8.2米'
              },
              {
                value: 10,
                text: '8.7米'
              },
              {
                value: 11,
                text: '9.6米'
              },
              {
                value: 12,
                text: '11.7米'
              },
              {
                value: 13,
                text: '12.5米'
              },
              {
                value: 14,
                text: '13米'
              },
              {
                value: 15,
                text: '15米'
              },
              {
                value: 16,
                text: '16米'
              },
              {
                value: 17,
                text: '17.5米'
              }
            ],
            placeholder: '请选择'
          }
        },
        carrierWaybillNo: {
          type: 'input',
          modelKey: 'carrierWaybillNo',
          label: '承运商运单号',
          props: {
            placeholder: '请输入'
          }
        },
        freightFee: {
          type: 'input',
          modelKey: 'freightFee',
          label: '运输费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        gasFee: {
          type: 'input',
          modelKey: 'freightFee',
          label: '油费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        loadFee: {
          type: 'input',
          modelKey: 'loadFee',
          label: '装货费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        unloadFee: {
          type: 'input',
          modelKey: 'unloadFee',
          label: '卸货费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        insuranceFee: {
          type: 'input',
          modelKey: 'insuranceFee',
          label: '保险费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        otherFee: {
          type: 'input',
          modelKey: 'otherFee',
          label: '其他(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
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
        cashAmount: {
          type: 'input',
          modelKey: 'cashAmount',
          label: '到付现金(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
        fuelCardAmount: {
          type: 'input',
          modelKey: 'fuelCardAmount',
          label: '到付油卡(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            pattern: /^((([1-9]\d{0,8})|0)(\.\d{0,3}[1-9])?)?$/
          },
          messages: {
            pattern: '请输入正确的金额'
          },
          trigger: 'blur'
        },
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
            placeholder: ''
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['carrierNameList', 'backupDriverList'])
  },
  methods: {
    ...mapActions('pickup', ['getPickupDetailForForm', 'getCarrierNameList', 'getSelfCarList', 'getSelfDriverList', 'assign', 'reloadCurrentPickup']),
    ...mapActions('order/create', ['sendDirectly']),
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      if (result.valid !== false) {
        this.model.totalFee = NP.plus(this.model.freightFee, this.model.loadFee, this.model.unloadFee, this.model.otherFee, this.model.insuranceFee)
      }
      // console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    async submitAssign () {
      let isValid = await this.$refs['assign-form'].validate()
      if (isValid) {
        let req = {
          carrierName: this.model.carrierName,
          driverName: this.model.assignCarType === 1 ? this.model.carrierDriverName : this.model.selfDriverName.split('-')[0],
          driverPhone: this.model.assignCarType === 1 ? this.model.carrierDriverPhone : this.model.selfDriverName.split('-')[1],
          carNo: this.model.assignCarType === 1 ? this.model.carrierCarNo : this.model.carNo.split('-')[0],
          carType: this.model.assignCarType === 1 ? this.model.carType : this.model.carNo.split('-')[1],
          carLength: this.model.assignCarType === 1 ? this.model.carLength : this.model.carNo.split('-')[2],
          freightFee: NP.times(this.model.freightFee, 100),
          loadFee: NP.times(this.model.loadFee, 100),
          unloadFee: NP.times(this.model.unloadFee, 100),
          otherFee: NP.times(this.model.otherFee, 100),
          insuranceFee: NP.times(this.model.insuranceFee, 100),
          settlementType: this.model.assignCarType === 1 ? this.model.settlementType : '',
          settlementPayInfo: this.model.assignCarType === 1 ? [{
            payType: this.model.payType,
            fuelCardAmount: NP.times(this.model.fuelCardAmount, 100),
            cashAmount: NP.times(this.model.cashAmount, 100)
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
          await this.assign(Object.assign({ pickUpId: this.$route.params.id }, req))
          await this.reloadCurrentPickup(this.$route.params.id)
        }
        this.$router.back()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.getPickupDetailForForm(to.params.id).then(data => {
          vm.model.freightFee = NP.divide(data.freightFee, 100)
          vm.model.insuranceFee = NP.divide(data.insuranceFee, 100)
          vm.model.loadFee = NP.divide(data.loadFee, 100)
          vm.model.unloadFee = NP.divide(data.unloadFee, 100)
          vm.model.otherFee = NP.divide(data.otherFee, 100)
          vm.model.totalFee = NP.divide(data.totalFee, 100)
          vm.model.settlementType = data.settlementType
          vm.model.payType = data.settlementPayInfo.length ? data.settlementPayInfo[0].payType : 2
          vm.model.cashAmount = data.settlementPayInfo.length ? NP.divide(data.settlementPayInfo[0].cashAmount, 100) : ''
          vm.model.fuelCardAmount = data.settlementPayInfo.length ? NP.divide(data.settlementPayInfo[0].fuelCardAmount, 100) : ''
        })
      }
      vm.getCarrierNameList().then(list => {
        vm.fields.carrierName.props.options = list
      })
      vm.getSelfCarList().then(list => {
        vm.fields.carNo.props.options = list
      })
      vm.getSelfDriverList().then(list => {
        vm.fields.selfDriverName.props.options = list
        vm.fields.selfAssistantDriverName.props.options = list
      })
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
    flex-direction column
    .edit-form
      padding-top: 15px;
      flex 1
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
              pointer-events: none
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
