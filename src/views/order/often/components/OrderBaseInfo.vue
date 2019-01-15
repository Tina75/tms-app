<template>
  <detail-panel :title="'基本信息'">
    <detail-panel-item :label="'客户名称'">
      <p>南京可口可乐有限公司</p>
    </detail-panel-item>
    <detail-panel-item :label="'客户订单号'">
      <p class="remix-content">
        <span class="border-right-1px">12334456789</span>
        <a>复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'客户运单号'">
      <p class="remix-content">
        <span class="border-right-1px">12334456789</span>
        <a>复制</a>
      </p>
    </detail-panel-item>
    <!-- <detail-panel-item :label="'始发地'">
      <p>广东省深圳市宝安区</p>
    </detail-panel-item>
    <detail-panel-item :label="'目的地'">
      <p>黑龙江哈尔滨市南岗区</p>
    </detail-panel-item> -->
    <detail-panel-item :label="'发货时间'">
      <p>2018-12-30 12:00</p>
    </detail-panel-item>
    <detail-panel-item :label="'到货时间'">
      <p>2018-12-31 12:00</p>
    </detail-panel-item>
    <detail-panel-item :label="'提货方式'">
      <p>大车直送客户</p>
    </detail-panel-item>
    <detail-panel-item :label="'回单数量'">
      <p>1份</p>
    </detail-panel-item>
    <detail-panel-item :label="'代收货款'">
      <p>300元</p>
    </detail-panel-item>
    <detail-panel-item :label="'责任业务员'">
      <p>张三</p>
    </detail-panel-item>
    <detail-panel-item :label="'是否开票'">
      <p>是(5%)</p>
    </detail-panel-item>
    <detail-panel-item :label="'备注'">
      <p class="remark">好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟</p>
    </detail-panel-item>
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
  .remix-content
    display: flex
    span
      flex 1
      text-align: right
      padding-right: 10px;
    a
      padding-left: 10px;
      color: #00a4bd;
  .remark
    max-width 240px
    text-align: left
    float: right
</style>
