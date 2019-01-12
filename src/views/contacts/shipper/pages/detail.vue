<template>
  <div class="shipper-detail">
    <div class="shipper-detail__header">
      <span class="cube-font-18" v-text="contactDetail.name"/>
      <div class="cube-font-14">
        <i class="cubeic-person cube-mr-10" />
        <span class="cube-mr-10" v-text="contactDetail.contact"/>
        <span v-text="contactDetail.phone" />
      </div>
    </div>
    <div class="shipper-detail__info border-bottom-1px">
      <div v-for="(item, i) in info" :key="i" class="shipper-detail__info-item border-right-1px">
        <span class="cube-font-15 cube-c-black" v-text="item.value" />
        <span class="cube-font-14 cube-c-light-grey" v-text="item.text" />
      </div>
    </div>
    <div v-if="contactDetail.remark" class="shipper-detail__remark cube-font-15">
      <div class="cube-c-black cube-mb-15" v-text="'备注'"/>
      <p class="cube-c-grey" v-text="contactDetail.remark" />
    </div>

    <CellItem class="cube-mt-15" label="发货地址" left-icon="icon-ico_location" :right-title="contactDetail.addressCnt"/>

    <CellItem class="cube-mt-15" label="常发货物" left-icon="icon-ico_location" :right-title="contactDetail.cargoCnt"/>

    <cube-button class="cube-bottom-button" :primary="true" @click="phoneCall">
      <i class="iconfont icon-ico_call"/>
      拨打电话
    </cube-button>
  </div>
</template>

<script>
import CellItem from '../../components/CellItem.vue'
import { mapState } from 'vuex'
const moudleName = 'contacts/shipper'
export default {
  name: 'ShipperDetail',
  metaInfo: {
    title: ''
  },
  components: { CellItem },
  data () {
    return {
      info: [{
        text: '结算方式',
        value: '月结'
      }, {
        text: '提货方式',
        value: '上门提货'
      }, {
        text: '开票税率',
        value: '0.5%'
      }, {
        text: '业务员',
        value: '李四'
      }]
    }
  },
  computed: {
    ...mapState(moudleName, ['contactDetail'])

  },
  methods: {
    phoneCall() {
      window.location.href = `tel:${this.contactDetail.phone}`
    }
  }
}
</script>

<style lang='stylus' >
.shipper-detail
  .cell-item
    background #fff
  &__header
    display flex
    flex-direction column
    justify-content space-between
    padding 20px 15px
    height 90px
    color #fff
    background #3A424B
  &__remark
    padding 16px 15px
    min-height 100px
    background #fff
  &__info
    height 86px
    padding 23px 0 13px
    display flex
    background #fff
    &-item
      flex 1
      display flex
      flex-direction column
      align-items center
      justify-content space-around
</style>
