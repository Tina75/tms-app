<template>
  <detail-panel :title="'提货单信息'">
    <detail-panel-item :label="'提货单单号'">
      <p class="remix-content">
        <span class="border-right-1px">提货单单号</span>
        <a>复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'派车方式'">
      <p>外传</p>
    </detail-panel-item>
    <detail-panel-item :label="'承运商'">
      <p>南京海底捞</p>
    </detail-panel-item>
    <detail-panel-item :label="'司机'">
      <p>刘亦菲</p>
    </detail-panel-item>
    <detail-panel-item :label="'联系方式'">
      <p class="remix-content">
        <span class="border-right-1px">18709870987</span>
        <a>
          联系TA
          <icon-font
            name="icon-ico_call"
            :size="18"
            color="#00A4BD"/>
        </a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'车型'">
      <p>冷藏</p>
    </detail-panel-item>
    <detail-panel-item :label="'车长'">
      <p>12.5米</p>
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
import IconFont from '@/components/Iconfont'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem, IconFont },
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
