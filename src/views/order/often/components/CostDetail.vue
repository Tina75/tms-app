<template>
  <detail-panel :title="'应收费用'">
    <detail-panel-item :label="'计费里程'">
      <p>1000公里</p>
    </detail-panel-item>
    <detail-panel-item :label="'运输费用'">
      <p>1000元</p>
    </detail-panel-item>
    <detail-panel-item :label="'提货费用'">
      <p>1000元</p>
    </detail-panel-item>
    <detail-panel-item :label="'装货费用'">
      <p>1000元</p>
    </detail-panel-item>
    <detail-panel-item :label="'卸货费用'">
      <p>1000元</p>
    </detail-panel-item>
    <detail-panel-item :label="'保险费用'">
      <p>1000元</p>
    </detail-panel-item>
    <detail-panel-item :label="'其他费用'">
      <p>1000元</p>
    </detail-panel-item>
    <div class="total-cost">
      <label>合计</label>
      <span>6000元</span>
      <i>月结</i>
    </div>
  </detail-panel>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  computed: {
    // ...mapGetters(['BePickingData']),
    options () {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  methods: {
    // ...mapActions(['getBePicking']),
  }
}
</script>
<style scoped lang="stylus">
  .total-cost
    padding: 10px
    text-align: right
    label
      font-size: 15px;
      color: #333333;
      margin-right: 10px
    span
      color: #FA8C16
      font-size: 20px;
      margin-right: 10px
    i
      color: #666666
      font-size: 15px;
      font-style: normal
</style>
