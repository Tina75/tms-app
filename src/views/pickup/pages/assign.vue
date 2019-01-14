<template>
  <div class="pickup-assign">
    <div class="edit-form">
      <cube-form :model="model" :options="options" @validate="validateHandler">
        <cube-form-group>
          <cube-form-item :field="fields['assignCarType']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['carrierName']"/>
          <cube-form-item :field="fields['driverName']"/>
          <cube-form-item :field="fields['driverPhone']"/>
          <cube-form-item :field="fields['carType']"/>
          <cube-form-item :field="fields['carLength']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['carNo']"/>
          <cube-form-item :field="fields['driverName']"/>
          <cube-form-item :field="fields['assistantDriverName']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['freightFee']" class="freight-input">
            <cube-input v-model="model.freightFee" placeholder="请输入"/>
            <icon-font
              name="icon-ico_rule"
              :size="20"
              color="#00A4BD" />
          </cube-form-item>
          <cube-form-item :field="fields['gasFee']"/>
          <cube-form-item :field="fields['loadFee']"/>
          <cube-form-item :field="fields['unloadFee']"/>
          <cube-form-item :field="fields['insuranceFee']"/>
          <cube-form-item :field="fields['otherFee']"/>
          <cube-form-item :field="fields['totalFee']">
            <span>{{model.totalFee}}</span>
          </cube-form-item>
          <cube-form-item :field="fields['payType']"/>
          <cube-form-item :field="fields['fuelCardAmount']"/>
          <cube-form-item :field="fields['cashAmount']"/>
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
      <a class="light-btn">查看所有订单信息</a>
      <a>确定</a>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import IconFont from '@/components/Iconfont'

export default {
  name: 'pickup-assign',
  metaInfo: {
    title: '派车'
  },
  components: { IconFont },
  data () {
    return {
      validity: {},
      valid: undefined,
      model: {
        assignCarType: 1,
        dateValue: '',
        totalFee: ''
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
            options: ['苏A12345', '苏A23456', '苏B11111'],
            placeholder: '请选择'
          },
          rules: {
            required: true
          }
        },
        driverName: {
          type: 'select',
          modelKey: 'driverName',
          label: '主司机',
          props: {
            options: ['秦天师', '秦萨满', '秦神父', '秦方丈', '秦喇嘛', '秦阿訇', '秦牧首'],
            placeholder: '请选择'
          },
          rules: {
            required: true
          }
        },
        assistantDriverName: {
          type: 'select',
          modelKey: 'assistantDriverName',
          label: '副司机',
          props: {
            options: ['秦天师', '秦萨满', '秦神父', '秦方丈', '秦喇嘛', '秦阿訇', '秦牧首'],
            placeholder: '请选择'
          }
        },
        carrierName: {
          type: 'select',
          modelKey: 'carrierName',
          label: '承运商名称',
          props: {
            options: ['秦天师', '秦萨满', '秦神父', '秦方丈', '秦喇嘛', '秦阿訇', '秦牧首'],
            placeholder: '请选择'
          }
        },
        driverPhone: {
          type: 'select',
          modelKey: 'driverPhone',
          label: '司机手机号',
          props: {
            options: ['15000000001', '15000000002', '15000000003'],
            placeholder: '请选择'
          }
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
                value: 14,
                text: '13米'
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
        freightFee: {
          modelKey: 'freightFee',
          label: '运输费(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
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
            required: true
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
            required: true
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
            required: true
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
            required: true
          },
          trigger: 'blur'
        },
        otherFee: {
          type: 'input',
          modelKey: 'freightFee',
          label: '其他(元)',
          props: {
            placeholder: '请输入'
          },
          trigger: 'blur'
        },
        totalFee: {
          modelKey: 'totalFee',
          label: '费用合计(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          },
          trigger: 'blur'
        },
        payType: {
          type: 'select',
          modelKey: 'payType',
          label: '支付方式',
          props: {
            options: [
              {
                value: 1,
                text: '预付款'
              },
              {
                value: 2,
                text: '到付款'
              },
              {
                value: 3,
                text: '回付款'
              }
            ],
            placeholder: '请选择'
          },
          trigger: 'blur'
        },
        cashAmount: {
          type: 'input',
          modelKey: 'cashAmount',
          label: '到付现金(元)',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
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
            required: true
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
          },
          rules: {
            required: true
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
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard'
      }
    }
  },
  computed: {
    // ...mapGetters(['News'])
  },
  methods: {
    // ...mapActions(['getNews', 'clearNews']),
    /** 下拉刷新 */
    submitHandler(e) {
      console.log('submit')
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
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
          &.freight-input
            .cube-validator-content
              display: flex
              .cube-input
                flex: 1
              .iconfont
                width: 20px;
                margin: 15px 10px;
                padding: 0 10px
                line-height: 20px;
                border-left: 1px solid #ddd;
        .cube-form-label
          padding-top: 12px;
          width: 140px;
          span
            font-size: 15px
        .cube-form-item_required .cube-form-label
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
          text-align: right
          input
            text-align: right
          &.cube-validator
            display: block
            .cube-validator-content
              width: 100%;
            .cube-validator-msg
              margin-top: -5px
              &:before
                display: none
              .cube-validator-msg-def
                color: #e64340;
                font-size: 12px;
        .cube-select
          padding-right: 0;
          .cube-select-icon
            @extend .icon
            @extend .iconfont
            @extend .icon-ico_right
            position: static;
            border: none
            margin-left: 10px;
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
