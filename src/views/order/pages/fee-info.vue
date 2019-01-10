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
      <div class="footer-total">费用合计：<money-label :money="2500" /></div>
      <cube-button class="footer-button" primary @click="ensure">确定</cube-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MoneyLabel from '../components/MoneyLabel'
import { FormItem } from '@/components/Form'

export default {
  metaInfo: { title: '费用信息' },
  components: { FormItem, MoneyLabel },
  data () {
    return { form: {} }
  },
  computed: {
    ...mapGetters([
      'feeInfo'
    ])
  },
  methods: {
    ensure () {
      this.$store.commit('SET_FEE_INFO', this.form)
    }
  }
  // beforeRouterEnter

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
