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
      v-model="form.payType"
      :options="payTypeConf"
      type="select"
      label="结算方式"
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
      <cube-button :primary="true" @click="handleSubmit">确定</cube-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { FormItem } from '@/components/Form'

const moduleName = 'contacts/carrier'

export default {
  name: 'CarrierCreate',

  metaInfo () {
    return {
      title: this.isCreator ? '新增承运商' : '修改承运商'
    }
  },

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

      payTypeConf: [
        { text: '按单结', value: '1'},
        { text: '月结', value: '2' }
      ]
    }
  },

  computed: {
    ...mapState(moduleName, [ 'carrierDetail' ]),

    isCreator () {
      return this.$route.name === 'carrier-create'
    }
  },

  created () {
    console.log(this.carrierDetail)
  },

  methods: {
    ...mapActions(moduleName, [ 'createCarrier', 'updateCarrier' ]),

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

    /* 提交表单 */
    async handleSubmit () {
      try {
        const params = { ...this.form }
        if (this.isCreator) {
          await this.createCarrier(params)
          this.$createToast({ time: 1000, txt: '新增承运商成功' })
        } else {
          params.carrierId = 12
          await this.updateCarrier(params)
          this.$createToast({ time: 1000, txt: '修改承运商成功' })
        }
        this.clearForm()
        this.$router.back()
      } catch (error) {
        console.error(error)
      }
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
