<template>
  <div class="carrier-detail cube-has-bottom-btn">
    <div class="carrier-detail__header">
      <span class="cube-font-18" v-text="viewData.carrierName"/>
      <div class="cube-font-14">
        <i class="cubeic-person cube-mr-10" style="color: #FCA950"/>
        <span class="cube-mr-10" v-text="viewData.carrierPrincipal"/>
        <span v-text="viewData.carrierPhone"/>
      </div>
    </div>
    <div v-if="viewData.remark" class="carrier-detail__remark cube-font-15 cube-mt-15">
      <div class="cube-c-black cube-mb-15" v-text="'备注'"/>
      <p class="cube-c-grey" v-text="viewData.remark"/>
    </div>

    <CellItem
      class="cube-mt-15"
      label="合作车辆"
      left-icon="icon-ico_location"
      :right-title="viewData.carCnt"
      @click="$router.push({name: 'contacts-carrier-truck', query:{carrierId: viewData.id}})"
    />

    <cube-button class="cube-bottom-button" :primary="true" @click="phoneCall">
      <i class="iconfont icon-ico_call"/>
      拨打电话
    </cube-button>
  </div>
</template>

<script>
import CellItem from '../../components/CellItem.vue'
import { mapGetters, mapActions } from 'vuex'
import { ContactDetail } from '../modules/model'
const moudleName = 'contacts/carrier'

export default {
  name: 'ContactsCarrierDetail',
  metaInfo: {
    title: ''
  },
  components: { CellItem },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(moudleName, ['contactDetail']),
    viewData() {
      return ContactDetail.toView(this.contactDetail)
    }
  },
  created () {
    const carrierId = this.$route.query.carrierId
    this.loadCarrierDetail(carrierId)
  },
  methods: {
    ...mapActions(moudleName, ['loadCarrierDetail']),
    phoneCall() {
      window.location.href = `tel:${this.viewData.phone}`
    }
  }
}
</script>

<style lang='stylus' scoped>
.carrier-detail
  .cell-item
    background #fff
  &__header
    display flex
    flex-direction column
    justify-content space-between
    padding 20px 15px
    height 90px
    color #333333
    background #ffffff
  &__remark
    padding 16px 15px
    min-height 100px
    background #ffffff
</style>
