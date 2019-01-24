<template>
  <cube-scroll
    ref="scroll"
    :data="bePickingData.list"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div class="order-wrapper">
      <bill-item
        v-for="(item, index) in bePickingData.list"
        :key="index"
        :data="item">
        <a v-if="assignStatus(item)" @click.stop="pickup(item, index)">提货</a>
        <a v-else @click.stop="assign(item, index)">派车</a>
      </bill-item>
    </div>
  </cube-scroll>
</template>

<script>
import BillItem from './BillItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BePickingList',
  components: { BillItem },
  computed: {
    ...mapGetters('pickup', ['bePickingData', 'settlementTypeMap']),
    options () {
      return {
        pullDownRefresh: {
          txt: '刷新成功'
        },
        pullUpLoad: this.bePickingData.next,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['setPageStart', 'getBePicking', 'getPickupCount', 'pickupBill', 'removeBePicking']),
    /** 下拉刷新 */
    async onPullingDown () {
      await this.setPageStart('bePickingData')
      await this.getPickupCount()
      await this.getBePicking()
    },
    /** 上拉加载 */
    async onPullingUp () {
      this.getBePicking()
    },
    assignStatus (item) {
      return (item.assignCarType === 1 && item.carrierName) || (item.assignCarType === 2 && item.carNo)
    },
    assign (item) {
      this.$router.push({
        name: 'pickup-assign',
        params: {
          id: item.pickUpId
        }
      })
    },
    pickup (data, index) {
      const _this = this
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '提货后将不能修改提货单，是否提货？',
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
          await _this.pickupBill(data.pickUpId)
          await _this.removeBePicking(index)
          await _this.getPickupCount()
          _this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '提货成功'
          }).show()
        }
      }).show()
    }
  }
}
</script>
