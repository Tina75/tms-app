<template>
  <div class="order-detail">
    <detail-group
      :status="{text: '调度中', time: '2019-01-07 17:54'}"
      :tabs="tabData">
      <template slot-scope="slotProps">
        <detail-item
          :tab-name="slotProps.data.label"
          :name="'一'">
          <div class="content-box">{{slotProps.data.label}}</div>
        </detail-item>
        <detail-item
          :tab-name="slotProps.data.label"
          :name="'二'">
          <div class="content-box">{{slotProps.data.label}}</div>
        </detail-item>
        <detail-item
          :tab-name="slotProps.data.label"
          :name="'三'">
          <div class="content-box">{{slotProps.data.label}}</div>
        </detail-item>
      </template>
    </detail-group>
  </div>
</template>

<script>
import DetailGroup from '@/components/DetailGroup'
import DetailItem from '@/components/DetailItem'

export default {
  name: 'pickup-order-detail',
  components: { DetailGroup, DetailItem },
  metaInfo: {
    title: '订单详情'
  },
  data () {
    return {
      tabData: [
        {
          label: '一',
          anchor: 'text1'
        },
        {
          label: '二',
          anchor: 'text2'
        },
        {
          label: '三',
          anchor: 'text3'
        },
        {
          label: '四',
          anchor: 'text4'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
.order-detail
  height: 100%
  .content-box
    height: 500px
    background-color: #cccccc;
    margin-bottom: 20px;
</style>
