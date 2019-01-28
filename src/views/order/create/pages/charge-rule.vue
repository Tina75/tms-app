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
 * departure {required} 出发地code
 * destination {required} 目的地code
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
import { MODULE_NAME } from '../../js/constant'

const WEIGHT_TON = 1 // 重量吨
const VOLUME = 2 // 体积方
const WEIGHT_TON_KM = 3 // 吨公里
const VOLUME_KM = 4 // 方公里
const CAR_TYPE = 5 // 车型
const WEIGHT_KG = 6 // 重量公斤
const WEIGHT_KG_KM = 7 // 公斤公里
const QUANTITY = 8 // 件

export default {
  name: 'order-charge-rule',
  metaInfo: { title: '请选择计费规则' },
  components: { NoData },
  data () {
    return {
      NO_DATA,
      loading: true,
      ruleList: [],
      info: {}
    }
  },
  methods: {
    ...mapMutations(MODULE_NAME.ORDER_CREATE, [ 'CLEAR_CALCULATED_AMOUNT' ]),
    ...mapActions(MODULE_NAME.ORDER_CREATE, [ 'getRuleList', 'calculateAmount' ]),

    async pickRuleAndCalc (item) {
      let { departure, destination, weight, volume, distance, carType, cargoInfos } = this.info
      let query = { departure, destination }

      switch (item.ruleType) {
        case WEIGHT_TON:
          if (!weight) return window.toast('当前计费规则不适用')
          query.input = NP.divide(weight, 1000)
          break
        case WEIGHT_TON_KM:
          if (!weight || !distance) return window.toast('当前计费规则不适用')
          query.input = NP.divide(weight, 1000)
          query.distance = distance
          break
        case WEIGHT_KG:
          if (!weight) return window.toast('当前计费规则不适用')
          query.input = weight
          break
        case WEIGHT_KG_KM:
          if (!weight || !distance) return window.toast('当前计费规则不适用')
          query.input = weight
          query.distance = distance
          break
        case VOLUME:
          if (!volume) return window.toast('当前计费规则不适用')
          query.input = volume
          break
        case VOLUME_KM:
          if (!volume || !distance) return window.toast('当前计费规则不适用')
          query.input = volume
          query.distance = distance
          break
        case CAR_TYPE:
          if (!carType) return window.toast('当前计费规则不适用')
          query.carType = carType
          break
        case QUANTITY:
          if (!cargoInfos.length) return window.toast('当前计费规则不适用')
          query.cargoInfos = cargoInfos
      }

      window.loading(true)
      query.ruleId = item.id
      if (query.input) query.input = NP.times(query.input, 100)
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
      vm.info = vm.$route.query.info || vm.$route.query
      const { partnerType, partnerId, departure, destination } = vm.info
      if (!partnerType || !partnerId) {
        // window.toast('缺少参数')
        // vm.$router.back()
        vm.loading = false
        return
      }
      window.loading(true)
      try {
        vm.ruleList = await vm.getRuleList({ partnerType, partnerId, departure, destination })
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
