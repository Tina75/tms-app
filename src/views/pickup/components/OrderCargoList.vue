<template>
  <detail-panel :title="'提货单信息'">
    <detail-panel-item :label="'提货单单号'">
      <p>
        提货单单号
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
      <p>
        18709870987
        <a>
          复制
          <icon-font
            name="icon-ico_call"
            :size="20"
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
      <p class="remark">好嗨哟！感觉人生已经到达了高潮！ 感觉人</p>
    </detail-panel-item>
  </detail-panel>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import detailPanel from '@/components/detailPanel'
import detailPanelItem from '@/components/detailPanelItem'
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

</style>
