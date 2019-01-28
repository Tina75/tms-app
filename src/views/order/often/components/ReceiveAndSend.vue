<template>
  <div>
    <detail-panel :title="'发货人'">
      <detail-panel-item :label="'联系人'">
        <p>{{ detail.consignerContact }}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{ detail.consignerPhone }}</span>
          <a :href="`tel:${detail.consignerPhone}`" >
            联系TA
            <icon-font
              class="call-icon"
              name="icon-ico_call"
              :size="18"
              color="#00A4BD"/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item :label="'发货地址'">
        <p class="address">{{ detail.consignerAddress + (detail.consignerHourseNumber || '') }}</p>
      </detail-panel-item>
    </detail-panel>
    <detail-panel :title="'收货人'">
      <detail-panel-item :label="'联系人'">
        <p>{{ detail.consigneeContact }}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{ detail.consigneePhone }}</span>
          <a :href="`tel:${detail.consigneePhone}`">
            联系TA
            <icon-font
              class="call-icon"
              name="icon-ico_call"
              :size="18"
              color="#00A4BD"/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item :label="'收货地址'">
        <p class="address">{{ detail.consigneeAddress + (detail.consigneeHourseNumber || '') }}</p>
      </detail-panel-item>
      <detail-panel-item :label="'收货人单位'">
        <p class="address">{{ detail.consigneeCompanyName || '-' }}</p>
      </detail-panel-item>
    </detail-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import { MODULE_NAME } from '../../js/constant'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  computed: mapGetters(MODULE_NAME.ORDER_OFTEN, [ 'detail' ])
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
  .call-icon
    vertical-align unset
</style>
