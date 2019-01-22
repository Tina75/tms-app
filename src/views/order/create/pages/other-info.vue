<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group :rules="rules">
        <div class="form-section" v-if="orderConfig.isInvoiceOption">
          <form-item
            v-model="isInvoice"
            label="是否开票"
            type="switch" />
          <form-item
            v-if="isInvoice"
            v-model="form.invoiceRate"
            label="开票税率(%)"
            type="number"
            precision="2" />
        </div>
        <div class="form-section" v-if="orderConfig.collectionMoneyOption">
          <form-item
            v-model="form.collectionMoney"
            prop="collectionMoney"
            label="代收货款(元)"
            type="number"
            precision="4" />
        </div>
        <div class="form-section">
          <form-item
            v-model="form.remark"
            label="备注"
            type="textarea"
            placeholder="请输入(最多输入200字)"
            maxlength="200" />
        </div>
      </form-group>
    </cube-scroll>

    <cube-button class="footer" primary @click="ensure">确定</cube-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FormGroup, FormItem } from '@/components/Form'
import NP from 'number-precision'

export default {
  metaInfo: { title: '其他信息' },
  components: { FormGroup, FormItem },
  data () {
    return {
      isInvoice: false,
      form: {
        isInvoice: false,
        invoiceRate: '',
        collectionMoney: '',
        remark: ''
      },
      rules: {
        collectionMoney: { type: 'number', min: 0 }
      }
    }
  },
  computed: mapGetters('order/create', [ 'otherInfo', 'orderConfig' ]),
  watch: {
    isInvoice (val) { this.form.isInvoice = Number(val) }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_OTHER_INFO' ]),

    ensure () {
      const temp = Object.assign({}, this.form)
      temp.invoiceRate = temp.invoiceRate ? NP.divide(temp.invoiceRate, 100) : temp.invoiceRate
      temp.collectionMoney = temp.collectionMoney ? NP.times(temp.collectionMoney, 100) : temp.collectionMoney
      this.SET_OTHER_INFO(temp)
      this.$formWillLeave()
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      for (let key in vm.form) {
        console.log(vm.otherInfo)
        if (key === 'isInvoice') vm.isInvoice = vm.form.isInvoice = !!vm.otherInfo.isInvoice
        else if (key === 'invoiceRate') {
          vm.form.invoiceRate = (vm.otherInfo.invoiceRate === undefined || vm.otherInfo.invoiceRate === '')
            ? ''
            : NP.times(vm.otherInfo.invoiceRate, 100)
        } else if (key === 'collectionMoney') {
          vm.form.collectionMoney = (vm.otherInfo.collectionMoney === undefined || vm.otherInfo.collectionMoney === '')
            ? ''
            : NP.divide(vm.otherInfo.collectionMoney, 100)
        } else vm.form[key] = vm.otherInfo[key] === undefined ? '' : vm.otherInfo[key]
        console.log(vm.form)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  form
    padding-top 10px
  .form-section
    margin-bottom 15px

  .footer
    position fixed
    left 0
    right 0
    bottom 0
    height 44px
    padding 0
    border-radius 0
</style>
