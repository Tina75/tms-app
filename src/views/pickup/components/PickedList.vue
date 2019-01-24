<template>
  <cube-scroll
    ref="scroll"
    :data="pickedData.list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="order-wrapper">
      <bill-item
        v-for="(item, index) in pickedData.list"
        :key="index"
        :data="item"/>
    </div>
  </cube-scroll>
</template>

<script>
import BillItem from './BillItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'pickup',
  components: { BillItem },
  computed: {
    ...mapGetters('pickup', ['pickedData', 'settlementTypeMap']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.pickedData.next,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['setPageStart', 'getPicked', 'getPickupCount']),
    /** 下拉刷新 */
    async onPullingDown () {
      await this.setPageStart('pickedData')
      await this.getPickupCount()
      await this.getPicked()
    },
    /** 上拉加载 */
    async onPullingUp () {
      this.getPicked()
    }
  }
}
</script>
