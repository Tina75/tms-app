<template>
  <div>
    <detail-panel :title="'发货人'">
      <detail-panel-item :label="'联系人'">
        <p>{{Detail.consignerContact}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{Detail.consignerPhone}}</span>
          <a @click="call(Detail.consignerPhone)">
            联系TA <i class="iconfont icon-ico_call "/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item :label="'发货地址'">
        <p class="address">{{Detail.consignerAddress+Detail.consignerHourseNumber}}</p>
      </detail-panel-item>
    </detail-panel>
    <detail-panel :title="'收货人'">
      <detail-panel-item v-if="Detail.consigneeContact" :label="'联系人'">
        <p>{{Detail.consigneeContact}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{Detail.consigneePhone+Detail.consigneeHourseNumber}}</span>
          <a @click="call(Detail.consigneePhone)">
            联系TA <i class="iconfont icon-ico_call "/>
          </a>
        </p>
      </detail-panel-item>
      <detail-panel-item v-if="Detail.consigneeAddress" :label="'收货地址'">
        <p class="address">{{Detail.consigneeAddress}}</p>
      </detail-panel-item>
      <detail-panel-item v-if="Detail.consigneeCompanyName" :label="'收货人单位'">
        <p class="address">{{Detail.consigneeCompanyName}}</p>
      </detail-panel-item>
    </detail-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem },
  computed: {
    ...mapGetters('order/detail', ['Detail'])
  },
  methods: {
    call(tel) {
      window.location.href = `tel:${tel}`
    }
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
