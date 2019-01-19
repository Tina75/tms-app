<template>
  <div class="shipper-detail cube-has-bottom-btn">
    <div class="shipper-detail__header">
      <span class="cube-font-20 cube-font-weight--m" v-text="viewData.name"/>
      <div class="cube-font-14 cube-c-grey">
        <i class="cube-c-orange cubeic-person cube-mr-10"/>
        <span class="cube-mr-10" v-text="viewData.contact"/>
        <span v-text="viewData.phone"/>
      </div>
    </div>

    <div class="cube-mt-15">
      <div v-if="infoList.length" class="shipper-detail__info">
        <div
          v-for="(item, i) in infoList"
          :key="i"
          class="shipper-detail__info-item border-right-1px"
        >
          <span class="cube-font-15 cube-c-black cube-font-weight--m" v-text="item.value"/>
          <span class="cube-font-14 cube-c-light-grey" v-text="item.text"/>
        </div>
      </div>
      <div v-if="viewData.remark" class="shipper-detail__remark border-top-1px cube-font-15">
        <div class="cube-c-black cube-mb-15" v-text="'备注'"/>
        <p class="cube-c-grey" v-text="viewData.remark"/>
      </div>
    </div>

    <CellItem
      class="cube-mt-15"
      label="发货地址"
      left-icon="icon-ico_location"
      :right-title="viewData.addressList&&viewData.addressList.length"
      @click="$router.push({name: 'contacts-shipper-address', query:{consignerId: viewData.id}})"
    />

    <CellItem
      class="cube-mt-15"
      label="常发货物"
      left-icon="icon-ico_box"
      :right-title="viewData.cargoList&&viewData.cargoList.length"
      @click="$router.push({name: 'contacts-shipper-cargo', query:{consignerId: viewData.id}})"
    />

    <cube-button class="cube-bottom-button" :primary="true" @click="phoneCall">
      <i class="iconfont icon-ico_call"/>
      拨打电话
    </cube-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setAppRightBtn } from '@/libs/bridgeUtil'
import { ContactDetail } from '../modules/model'
import CellItem from '../../components/CellItem.vue'
const moudleName = 'contacts/shipper'
const ListConfig = [
  { text: '结算方式', key: 'payType' },
  { text: '提货方式', key: 'pickUp' },
  { text: '开票税率', key: 'invoiceRate' },
  { text: '业务员', key: 'operatorName' }
]
export default {
  name: 'ContactsShipperDetail',
  metaInfo: {
    title: ''
  },
  components: { CellItem },
  data() {
    return {
      viewData: {}
    }
  },
  computed: {
    ...mapState(moudleName, ['contactDetail', 'operator']),
    infoList() {
      const detail = this.viewData
      if (detail) {
        let value
        return ListConfig.reduce((arr, { text, key }, index) => {
          value = detail[key]
          if (value) {
            arr.push({
              text,
              value
            })
          }
          return arr
        }, [])
      }
      return []
    }
  },
  methods: {
    ...mapActions(moudleName, ['loadContactDetail', 'removeContact']),
    async onPageRefresh() {
      this.viewData = {}
      await this.loadContactDetail()
      this.viewData = ContactDetail.toView(this.contactDetail, this.operator)
    },
    phoneCall() {
      window.location.href = `tel:${this.viewData.phone}`
    },
    edit() {
      this.$router.push({
        name: 'contacts-shipper-modify',
        query: { consignerId: this.$route.query.consignerId }
      })
    },
    async remove() {
      await this.removeContact({ id: this.$route.query.consignerId })
      this.$refreshPage('contacts-shipper')
      window.toast('删除成功')
      this.$router.back(true)
    },
    setBtns() {
      setAppRightBtn([
        {
          text: '删除',
          iconType: 'delete',
          action: () => {
            window.confirm({
              content: '确认删除？',
              icon: 'cubeic-alert',
              onConfirm: this.remove.bind(this)
            })
          }
        },
        {
          text: '修改',
          iconType: 'edit',
          action: this.edit.bind(this)
        }
      ])
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setBtns())
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
    padding 20px 15px 30px
    height 100px
    box-sizing border-box
    background #fff
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
