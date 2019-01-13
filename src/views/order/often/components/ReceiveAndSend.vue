<template>
  <div>
    <detail-panel :title="'发货人'">
      <detail-panel-item :label="'联系人'">
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
      <detail-panel-item :label="'发货地址'">
        <p class="address">好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟</p>
      </detail-panel-item>
    </detail-panel>
    <detail-panel :title="'收货人'">
      <detail-panel-item :label="'联系人'">
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
      <detail-panel-item :label="'收货地址'">
        <p class="address">好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟</p>
      </detail-panel-item>
      <detail-panel-item :label="'收货人单位'">
        <p class="address">好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟好嗨哟</p>
      </detail-panel-item>
    </detail-panel>
  </div>
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
  .address
    max-width 240px
    text-align: left
    float: right
</style>
