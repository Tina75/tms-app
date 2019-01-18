<template>
  <div>
    <detail-panel :title="'发货人'">
      <detail-panel-item :label="'联系人'">
        <p>{{Detail.consignerContact}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{Detail.consignerPhone}}</span>
          <a :href="`tel:${Detail.consignerPhone}`">
            联系TA
            <icon-font
              name="icon-ico_call"
              :size="18"
              color="#00A4BD"/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item :label="'发货地址'">
        <p class="address">{{Detail.consignerAddress}}</p>
      </detail-panel-item>
    </detail-panel>
    <detail-panel :title="'收货人'">
      <detail-panel-item :label="'联系人'">
        <p>{{Detail.consigneeContact}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{Detail.consigneePhone}}</span>
          <a :href="`tel:${Detail.consigneePhone}`">
            联系TA
            <icon-font
              name="icon-ico_call"
              :size="18"
              color="#00A4BD"/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item :label="'发货地址'">
        <p class="address">{{Detail.consigneeAddress}}</p>
      </detail-panel-item>
    </detail-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import IconFont from '@/components/Iconfont'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem, IconFont },
  computed: {
    ...mapGetters('order/detail', ['Detail']),
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
