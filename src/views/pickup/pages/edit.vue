<template>
  <div class="pickup-edit">
    <div class="edit-form">
      <cube-form :model="model" @validate="validateHandler">
        <cube-form-group>
          <cube-form-item :field="fields['assignCarType']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['carNo']"/>
          <cube-form-item :field="fields['driverName']"/>
          <cube-form-item :field="fields['assistantDriverName']"/>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields['freightFee']"/>
          <cube-form-item :field="fields['loadFee']"/>
          <cube-form-item :field="fields['unloadFee']"/>
          <cube-form-item :field="fields['insuranceFee']"/>
          <cube-form-item :field="fields['otherFee']"/>
          <cube-form-item :field="fields['totalFee']">
            <span>{{totalFee}}</span>
          </cube-form-item>
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

export default {
  name: 'pickup-edit',
  metaInfo: {
    title: '编辑'
  },
  data () {
    return {
      validity: {},
      valid: undefined,
      model: {
        assignCarType: 1,
        dateValue: ''
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
        freightFee: {
          type: 'input',
          modelKey: 'freightFee',
          label: '运输费用(元)',
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
            placeholder: '请输入'
          },
          rules: {
            required: true
          },
          trigger: 'blur',
          debounce: 100
        }
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
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-ico_right
  &:before
    content: "\e6d6";
    color: #C5C8CE;
.pickup-edit
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
      .cube-form-label
        width: 140px;
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
      .cube-select
        padding-right: 0;
        .cube-select-icon
          @extend .icon
          @extend .iconfont
          @extend .icon-ico_right
          position: static;
          border: none
          margin-left: 10px;
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
