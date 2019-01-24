<template>
  <cube-scroll
    ref="scroll"
    :data="pickingData.list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="order-wrapper">
      <bill-item
        v-for="(item, index) in pickingData.list"
        :key="index"
        :data="item">
        <a class="grey" @click.stop="locate(item, index)">位置</a>
        <a @click.stop="arrive(item, index)">到货</a>
      </bill-item>>
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
    ...mapGetters('pickup', ['pickingData', 'settlementTypeMap']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.pickingData.next,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['setPageStart', 'getPicking', 'arriveBill', 'removePicking', 'getPickupCount']),
    /** 下拉刷新 */
    async onPullingDown () {
      await this.setPageStart('pickingData')
      await this.getPickupCount()
      await this.getPicking()
    },
    /** 上拉加载 */
    async onPullingUp () {
      this.getPicking()
    },
    locate (item) {
      this.$router.push({
        name: 'pickup-track',
        params: {
          id: item.pickUpId
        },
        query: {
          type: 1
        }
      })
    },
    arrive (data, index) {
      const _this = this
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否确认到货？',
        confirmBtn: {
          text: '是',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '否',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        async onConfirm () {
          await _this.arriveBill(data.pickUpId)
          await _this.removePicking(index)
          await _this.getPickupCount()
          window.toast('到货成功')
        }
      }).show()
    }
  }
}
</script>
