<template>
  <div class="carrier-detail cube-has-bottom-btn">
    <div class="carrier-detail__header">
      <div class="avatar">
        <IconFont
          name="icon-ico_send"
          :size="40"
          class="avatar_icon"
        />
      </div>
      <div class="truck">
        <span class="cube-font-18" v-text="viewData.name"/>
        <div class="cube-font-14">
          <span class="cube-mr-10" v-text="viewData.contact"/>
          <span v-text="viewData.phone"/>
        </div>
      </div>
    </div>
    <div v-if="infoList.length" class="carrier-detail__info border-bottom-1px">
      <div
        v-for="(item, i) in infoList"
        :key="i"
        class="carrier-detail__info-item border-right-1px"
      >
        <span class="cube-font-15 cube-c-black" v-text="item.value"/>
        <span class="cube-font-14 cube-c-light-grey" v-text="item.text"/>
      </div>
    </div>
    <div v-if="viewData.remark" class="carrier-detail__remark cube-font-15">
      <div class="cube-c-black cube-mb-15" v-text="'备注'"/>
      <p class="cube-c-grey" v-text="viewData.remark"/>
    </div>

    <cube-button class="cube-bottom-button" :primary="true" @click="phoneCall">
      <i class="iconfont icon-ico_call"/>
      拨打电话
    </cube-button>
  </div>
</template>

<script>
import CellItem from '../../components/CellItem.vue'
import IconFont from '@/components/Iconfont'

import { mapState, mapGetters } from 'vuex'
import { ContactDetail } from '../modules/model'
const moudleName = 'contacts/carrier'
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
    return {}
  },
  computed: {
    ...mapState(moudleName, ['contactList', 'operator']),
    ...mapGetters(moudleName, ['contactDetail']),
    viewData() {
      return ContactDetail.toView(this.contactDetail, this.operator)
    },
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
    phoneCall() {
      window.location.href = `tel:${this.viewData.phone}`
    }
  }
}
</script>

<style lang='stylus' >
.carrier-detail
  .cell-item
    background #fff
  &__header
    display flex
    align-items center
    background #3A424B
    .avatar
      width 70px
      height 70px
      margin 0 10px 0 16px
      background-color rgba(0,0,0,0.2238)
      text-align center
      line-height 70px
      border-radius 50%
    .truck
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      padding 20px 15px
      height 90px
      color #fff
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
