<template>
  <div class="carrier-create">
    <form-item
      v-model="form.carrierName"
      :maxlength="20"
      label="承运商名称"
      required
    />
    <form-item
      v-model="form.carrierPrincipal"
      :maxlength="15"
      label="负责人"
      required
    />
    <form-item
      v-model="form.carrierPhone"
      :maxlength="11"
      label="联系电话"
      required
    />
    <form-item
      v-model="payTypePicker"
      type="click"
      label="结算方式"
      @on-click="openSelector"
    />

    <div class="split-line" />

    <form-item
      v-model="form.remark"
      label="备注"
      type="textarea"
      placeholder="请输入（最多输入100字）"
      maxlength="100"
    />

    <div class="fixed-button">
      <cube-button :primary="true">确定</cube-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { FormItem } from '@/components/Form'

const payTypeConf = [
  { text: '按单结', value: '1'},
  { text: '月结', value: '2' }
]

export default {
  name: 'CarrierCreate',

  metaInfo: { title: '新增承运商' },

  components: { FormItem },

  data () {
    return {
      form: {
        carrierName: '',
        carrierPrincipal: '',
        carrierPhone: '',
        payType: '',
        remark: ''
      },

      payTypePicker: ''
    }
  },

  computed: {
    // validator
    validateCarrierName () {
      return /^\s{20}$/ig.test(this.form.carrierName)
    },
    validateCarrierPrincipal () {
      return /^\s{15}$/ig.test(this.form.carrierPrincipal)
    }
  },

  methods: {
    ...mapActions([ 'createCarrier' ]),

    /* 打开结算方式选择器 */
    openSelector () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '结算方式',
          data: [ payTypeConf ],
          onSelect: this.handleSelected
        })
      }
      this.picker.show()
    },

    /* 结算方式选中 */
    handleSelected (selectedVal, selectedIndex, selectedText) {
      this.payTypePicker = selectedText.shift()
      this.form.payType = selectedVal.shift()
    },

    /* 清空表单 */
    clearForm () {
      this.form = {
        ...{
          carrierName: '',
          carrierPrincipal: '',
          carrierPhone: '',
          payType: '',
          remark: ''
        }
      }
    },

    /* 校验表单 */
    validateForm () {

    },

    /* 提交表单 */
    handleSubmit () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.carrier-create
  padding-top 10px
.fixed-button
  position fixed
  bottom 0
  left 0
  right 0
  z-index 100
.split-line
  margin-top 15px
  background transparent
</style>
