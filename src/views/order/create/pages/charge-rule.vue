<template>
  <no-data
    v-if="!loading && !ruleList.length"
    :img="NO_DATA"
    message="老板，您还有设置计费规则<br>快去电脑端设置一个哦～" />

  <cube-scroll v-else class="scroll-box">
    <ul class="rule-list">
      <li
        v-for="item in ruleList" :key="item.id"
        class="rule-item border-bottom-1px"
        @click="pickRuleAndCalc(item)">{{ item.name }}</li>
    </ul>
  </cube-scroll>

</template>

<script>
/**
 * 路由参数
 * partnerType {required} 1-发货方 2-承运商 3-外转方
 * partnerId {required}
 * departure 出发地code
 * destination 目的地code
 * weight 重量（公斤）
 * volume 体积
 * distance 距离（米）
 * carType 车型
 * carLength 车长
 * cargoInfos {array} [{ key, value }]
 * key 货物名称
 * value 货物数量
 */

/**
 * 计算结果从 getter order/create calculatedAmount 读取
 * 由于运费可修改 所以建议读取完毕后通过 mutation order/create CLEAR_CALCULATED_AMOUNT 清空计算结果
 */

import { mapMutations, mapActions } from 'vuex'
import NP from 'number-precision'
import NoData from '@/components/NoData'
import NO_DATA from '@/assets/img-no-rule.png'

export default {
  name: 'order-charge-rule',
  metaInfo: { title: '请选择计费规则' },
  components: { NoData },
  data () {
    return {
      NO_DATA,
      loading: true,
      ruleList: [],
      info: this.$route.query.info || this.$route.query
    }
  },
  methods: {
    ...mapMutations('order/create', [ 'CLEAR_CALCULATED_AMOUNT' ]),
    ...mapActions('order/create', [ 'getRuleList', 'calculateAmount' ]),

    async pickRuleAndCalc (item) {
      let { departure, destination, weight, volume, distance, carType, carLength, cargoInfos } = this.info
      let query = { departure, destination, distance, carType, carLength, cargoInfos }
      if (item.ruleType === 1) query.input = NP.divide(weight || 0, 10)
      else query.input = NP.times(volume || 0, 100)
      query.ruleId = item.id

      window.loading(true)
      try {
        await this.calculateAmount(query)
        this.$router.back()
      } catch (err) {
        //
      } finally {
        window.loading(false)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.CLEAR_CALCULATED_AMOUNT()
      vm.loading = true
      const { partnerType, partnerId } = vm.info
      if (!partnerType || !partnerId) {
        // window.toast('缺少参数')
        // vm.$router.back()
        vm.loading = false
        return
      }
      window.loading(true)
      try {
        vm.ruleList = await vm.getRuleList({ partnerType, partnerId })
      } catch (err) {
        //
      } finally {
        vm.loading = false
        window.loading(false)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .rule-list
    margin 10px 0
    background #ffffff

    .rule-item
      height 50px
      line-height 50px
      padding 0 15px
      font-size 15px
      color #333333
</style>
