<template>
  <div class="scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <form>
        <div class="form-section">
          <form-item v-model="form.pickupFee" label="提货费用(元)" type="number" />
          <form-item v-model="form.uploadFee" label="装货费用(元)" type="number" />
          <form-item v-model="form.unloadFee" label="卸货费用(元)" type="number" />
          <form-item v-model="form.ensuranceFee" label="保险费用(元)" type="number" />
        </div>
        <div class="form-section">
          <form-item v-model="form.otherFee" label="其它费用(元)" type="number" />
        </div>
      </form>
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
import { FormItem } from '@/components/Form'
import NP from 'number-precision'

export default {
  metaInfo: { title: '费用信息' },
  components: { FormItem, MoneyLabel },
  data () {
    return {
      form: {
        pickupFee: '',
        uploadFee: '',
        unloadFee: '',
        ensuranceFee: '',
        otherFee: ''
      }
    }
  },
  computed: {
    ...mapGetters('order/create', [
      'feeInfo'
    ]),
    total () {
      return NP.plus(this.form.pickupFee, this.form.uploadFee, this.form.unloadFee, this.form.ensuranceFee, this.form.otherFee)
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_FEE_INFO' ]),

    ensure () {
      this.SET_FEE_INFO(Object.assign({}, this.form))
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      for (let key in vm.form) {
        vm.form[key] = vm.feeInfo[key] === undefined ? '' : vm.feeInfo[key]
      }
    })
  }

}
</script>

<style lang="stylus" scoped>
  form
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
