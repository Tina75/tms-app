<template>
  <div class="truck-detail">
    <div class="truck-detail__header cube-mb-15">
      <div class="cube-font-18">
        <span v-text="viewData.carNo"/>
        <span v-if="viewData.driverType" class="truck-tag" v-text="viewData.driverType" />
      </div>
      <div class="cube-font-14">
        <i class="cubeic-person cube-mr-10" style="color: #FCA950"/>
        <span class="cube-mr-10" v-text="viewData.driverName"/>
        <span v-text="viewData.phone"/>
      </div>
    </div>

    <div v-if="infoList.length" class="shipper-detail__info border-bottom-1px cube-mt-15">
      <div
        v-for="(item, i) in infoList"
        :key="i"
        class="shipper-detail__info-item border-right-1px"
      >
        <span class="cube-font-15 cube-c-black cube-font-weight--m" v-text="item.value"/>
        <span class="cube-font-14 cube-c-light-grey" v-text="item.text"/>
      </div>
    </div>

    <div v-if="regularLine.length" class="truck-detail__remark cube-font-15 cube-mt-15 border-bottom-1px">
      <div class="cube-c-black cube-mb-15" v-text="'常跑线路'"/>
      <div class="cube-c-grey cube-pl-15 cube-pr-15 cube-font-15">
        <p v-for="(item, index) in regularLine" :key="index" class="cube-mb-15">
          <span>{{item.en}}</span>
          <IconFont name="icon-line" color="#9DA1B0" class="route-line cube-ml-20 cube-mr-20"/>
          <span>{{item.sn}}</span>
        </p>
      </div>
    </div>
    <div v-if="photoList.length" class="truck-detail__remark cube-font-15 cube-mt-15">
      <div class="cube-c-black cube-mb-15" v-text="'证件照片'"/>
      <div class="imgs">
        <img v-for="(item, index) in photoList" :key="index" :src="item" alt="">
      </div>
    </div>

    <div v-if="viewData.remark" class="truck-detail__remark cube-font-15 cube-mt-15">
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
import IconFont from '@/components/Iconfont'
import { mapGetters, mapActions } from 'vuex'
import { TruckDetail } from '../modules/model.js'
const moudleName = 'contacts/carrier'

const ListConfig = [
  { text: '载重', key: 'shippingWeight' },
  { text: '净空', key: 'shippingVolume' },
  { text: '车型', key: 'carType' },
  { text: '车长', key: 'carLength' },
  { text: '品牌', key: 'carBrand' },
  { text: '结算方式', key: 'payType' }
]

export default {
  name: 'TruckDetail',

  metaInfo: { title: '' },

  components: { IconFont },

  computed: {
    ...mapGetters(moudleName, ['truckDetail']),

    viewData() {
      return TruckDetail.toView(this.truckDetail)
    },

    photoList () {
      const detail = this.viewData
      if (detail) {
        const arr = []
        detail.drivePhoto && arr.push(detail.drivePhoto)
        detail.travelPhoto && arr.push(detail.travelPhoto)
        return arr
      }
      return []
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
    },

    regularLine () {
      const detail = this.viewData
      if (detail && detail.regularLine) {
        return JSON.parse(this.viewData.regularLine)
      }
      return []
    }
  },

  methods: {
    ...mapActions(moudleName, ['loadTruckDetail', 'removeTruck']),

    onPageRefresh() {
      const carId = this.$route.query.carId
      this.loadTruckDetail(carId)
    },

    phoneCall () {
      window.location.href = `tel: ${this.truckDetail.driverPhone}`
    }

    // goAdd () {
    //   this.$router.push({
    //     name: 'contacts-carrier-truck-modify',
    //     query: {
    //       carrierId: this.truckDetail.carrierId
    //     }
    //   })
    // },

    // goEdit () {
    //   this.$router.push({
    //     name: 'contacts-carrier-truck-modify',
    //     query: {
    //       carrierId: this.truckDetail.carrierId,
    //       carId: this.truckDetail.id
    //     }
    //   })
    // }
  }
}
</script>

<style lang="stylus" scoped>
.truck-tag
  display inline-block
  margin-left 5px
  font-size 10px
  line-height 10px
  text-align center
  color #00A4BD
  padding 2px 3px
  border 1px solid #00A4BD
  border-radius 1px
  vertical-align top
.truck-detail
  height 100%
  padding-bottom 44px
  box-sizing border-box
  overflow-y auto
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
