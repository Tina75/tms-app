<template>
  <detail-panel :title="'提货单信息'">
    <detail-panel-item :label="'提货单单号'">
      <p class="remix-content">
        <span class="border-right-1px">{{pickupDetail.pickupNo}}</span>
        <a v-clipboard:copy="pickupDetail.pickupNo" v-clipboard:success="onNoCopy">复制</a>
      </p>
    </detail-panel-item>
    <detail-panel-item :label="'派车方式'">
      <p>{{pickupDetail.assignCarType === 2 ? '自送' : '外转'}}</p>
    </detail-panel-item>
    <template v-if="pickupDetail.assignCarType === 1">
      <detail-panel-item :label="'承运商'">
        <p>{{pickupDetail.carrierName}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'车牌号'">
        <p>{{pickupDetail.carNo}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'司机'">
        <p>{{pickupDetail.driverName}}</p>
      </detail-panel-item>
      <detail-panel-item :label="'联系方式'">
        <p class="remix-content">
          <span class="border-right-1px">{{pickupDetail.driverPhone}}</span>
          <a @click="phoneCall(pickupDetail.driverPhone)">
            联系TA
            <icon-font
              name="icon-ico_call"
              :size="18"
              color="#00A4BD"/>
          </a>
        </p>
      </detail-panel-item>
    </template>
    <template v-if="pickupDetail.assignCarType === 2">
      <detail-panel-item :label="'车牌号'">
        <p>{{pickupDetail.carNo}}</p>
      </detail-panel-item>
      <template v-if="pickupDetail.driverName">
        <detail-panel-item :label="'主司机'">
          <p>{{pickupDetail.driverName}}</p>
        </detail-panel-item>
        <detail-panel-item :label="'联系方式'">
          <p class="remix-content">
            <span class="border-right-1px">{{pickupDetail.driverPhone}}</span>
            <a @click="phoneCall(pickupDetail.driverPhone)">
              联系TA
              <icon-font
                name="icon-ico_call"
                :size="18"
                color="#00A4BD"/>
            </a>
          </p>
        </detail-panel-item>
      </template>
      <template v-if="pickupDetail.assistantDriverName">
        <detail-panel-item v-if="pickupDetail.assistantDriverName" :label="'副司机'">
          <p>{{pickupDetail.assistantDriverName}}</p>
        </detail-panel-item>
        <detail-panel-item v-if="pickupDetail.assistantDriverPhone" :label="'联系方式'">
          <p class="remix-content">
            <span class="border-right-1px">{{pickupDetail.assistantDriverPhone}}</span>
            <a @click="phoneCall(pickupDetail.driverPhone)">
              联系TA
              <icon-font
                name="icon-ico_call"
                :size="18"
                color="#00A4BD"/>
            </a>
          </p>
        </detail-panel-item>
      </template>
    </template>
    <detail-panel-item :label="'车型'">
      <p>{{carTypeMap[pickupDetail.carType]}}</p>
    </detail-panel-item>
    <detail-panel-item :label="'车长'">
      <p>{{carLengthMap[pickupDetail.carLength]}}</p>
    </detail-panel-item>
    <detail-panel-item :label="'备注'">
      <p class="remark">{{pickupDetail.remark}}</p>
    </detail-panel-item>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import detailPanelItem from '@/components/DetailPanelItem'
import IconFont from '@/components/Iconfont'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import bridge from '@/libs/dsbridge'

Vue.use(VueClipboard)

export default {
  name: 'pickupInfo',
  components: { detailPanel, detailPanelItem, IconFont },
  computed: {
    ...mapGetters('pickup', ['pickupDetail', 'carLengthMap', 'carTypeMap'])
  },
  methods: {
    // ...mapActions(['getBePicking']),
    onNoCopy () {
      window.toast('复制成功')
    },
    phoneCall (tel) {
      bridge.call('ui.phoneCall', { phone: tel }, function (result) {})
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
  .remark
    max-width 240px
    text-align: left
    float: right
</style>
