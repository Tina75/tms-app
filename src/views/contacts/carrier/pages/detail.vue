<template>
  <div class="carrier-detail cube-has-bottom-btn">
    <div class="carrier-detail__header">
      <span class="cube-font-18" v-text="viewData.carrierName"/>
      <div class="carrier-detail__flexbox cube-font-14 cube-c-grey">
        <div class="carrier-detail__flex">
          <div class="cube-mt-15">
            <i class="cubeic-person cube-mr-10" style="color: #FCA950"/>
            <span class="cube-mr-10 cube-ellipsis carrier-detail__carrierPrincipal" v-text="viewData.carrierPrincipal"/>
            <span v-text="viewData.carrierPhone"/>
          </div>
          <div v-if="viewData.customerCarrierPhone" class="cube-mt-10">
            <i class="iconfont icon-ico_KF1 cube-mr-10" style="color: #A4AFC0"/>
            <span class="cube-mr-10">客服</span>
            <span v-text="viewData.customerCarrierPhone"/>
          </div>
        </div>
        <span v-text="viewData.payType" />
      </div>
    </div>
    <div v-if="viewData.remark" class="carrier-detail__remark cube-font-15 cube-mt-15">
      <div class="cube-c-black cube-mb-15" v-text="'备注'"/>
      <p class="cube-c-grey" v-text="viewData.remark"/>
    </div>

    <CellItem
      class="cube-mt-15"
      label="合作车辆"
      left-icon="icon-ico_driver cube-font-21"
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
import { setAppRightBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/carrier'

export default {
  name: 'ContactsCarrierDetail',
  metaInfo: { title: '' },
  components: { CellItem },
  computed: {
    ...mapGetters(moudleName, ['contactDetail']),
    viewData() {
      return ContactDetail.toView(this.contactDetail)
    }
  },
  methods: {
    ...mapActions(moudleName, ['loadCarrierDetail', 'removeContact']),
    phoneCall() {
      window.location.href = `tel:${this.viewData.phone}`
    },
    removeHandle () {
      this.$createDialog({
        type: 'confirm',
        title: '',
        content: '请确认是否需要删除该信息?',
        icon: 'cubeic-alert',
        onConfirm: () => {
          const data = {
            carrierId: this.$route.query.carrierId
          }
          try {
            this.removeContact(data)
            this.$refreshPage('contacts-carrier', 'contacts-carrier-detail')
          } catch (e) {
            console.log(e)
          } finally {
            this.$router.back()
          }
        }
      }).show()
    },

    onPageRefresh () {
      const carrierId = this.$route.query.carrierId
      this.loadCarrierDetail(carrierId)
      setAppRightBtn([
        {
          text: '修改',
          iconType: 'edit',
          action: () => {
            this.$router.push({ name: 'contacts-carrier-modify', query: { carrierId: this.contactDetail.id } })
          }
        },
        {
          text: '删除',
          iconType: 'delete',
          action: this.removeHandle
        }
      ])
    }
  }
}
</script>

<style lang='stylus'>
.carrier-detail
  .cell-item
    background #fff
  &__header
    display flex
    flex-direction column
    justify-content space-between
    padding 20px 15px
    height 110px
    color #333333
    background #ffffff
  &__remark
    padding 16px 15px
    min-height 100px
    background #ffffff
  &__flexbox
    display flex
    align-items flex-end
  &__flex
    flex 1
  &__carrierPrincipal
    display inline-block
    max-width 155px
</style>
