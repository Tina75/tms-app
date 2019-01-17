<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form-group ref="$form" class="form" :rules="rules">
        <div class="form-section">
          <form-item
            v-model="form.pickupFee"
            prop="pickupFee"
            label="提货费用(元)"
            type="number"
            precision="4" />
          <form-item
            v-model="form.loadFee"
            prop="loadFee"
            label="装货费用(元)"
            type="number"
            precision="4" />
          <form-item
            v-model="form.unloadFee"
            prop="unloadFee"
            label="卸货费用(元)"
            type="number"
            precision="4" />
          <form-item
            v-model="form.insuranceFee"
            prop="insuranceFee"
            label="保险费用(元)"
            type="number"
            precision="4" />
        </div>
        <div class="form-section">
          <form-item
            v-model="form.otherFee"
            prop="otherFee"
            label="其它费用(元)"
            type="number"
            precision="4" />
        </div>
      </form-group>
    </cube-scroll>

    <div class="footer">
      <div class="footer-total">费用合计：<money-label :money="total" /></div>
      <cube-button class="footer-button" primary @click="ensure">确定</cube-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MoneyLabel from '../../components/MoneyLabel'
import { FormGroup, FormItem } from '@/components/Form'
import NP from 'number-precision'

export default {
  metaInfo: { title: '费用信息' },
  components: { FormGroup, FormItem, MoneyLabel },
  data () {
    const FEE_RULE = { type: 'number', min: 0 }

    return {
      form: {
        pickupFee: '',
        loadFee: '',
        unloadFee: '',
        insuranceFee: '',
        otherFee: ''
      },
      rules: {
        pickupFee: FEE_RULE,
        loadFee: FEE_RULE,
        unloadFee: FEE_RULE,
        insuranceFee: FEE_RULE,
        otherFee: FEE_RULE
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [ 'feeInfo' ]),
    total () {
      return NP.plus(this.form.pickupFee, this.form.loadFee, this.form.unloadFee, this.form.insuranceFee, this.form.otherFee)
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_FEE_INFO' ]),

    ensure () {
      const temp = Object.assign({}, this.form)
      for (let key in temp) {
        if (temp[key]) temp[key] = NP.times(temp[key], 100)
      }
      this.SET_FEE_INFO(temp)
      this.$formWillLeave()
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm.feeInfo)
      for (let key in vm.form) {
        vm.form[key] = vm.feeInfo[key] === undefined || vm.feeInfo[key] === '' ? '' : NP.divide(vm.feeInfo[key], 100)
      }
    })
  }

}
</script>

<style lang="stylus" scoped>
  .form
    margin-top 10px
  .form-section
    margin-bottom 15px

  .footer
    position fixed
    bottom 0
    left 0
    right 0
    height 44px
    display flex
    background #ffffff

    .footer-total
      flex none
      height 44px
      line-height 44px
      padding 0 24px 0 14px

    .footer-button
      border-radius 0
      padding 0
</style>
