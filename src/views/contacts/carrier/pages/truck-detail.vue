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

    <div v-if="infoList.length" class="truck-detail__info border-bottom-1px cube-mt-15">
      <div
        v-for="(item, i) in infoList"
        :key="i"
        class="truck-detail__info-item"
        :class="{'border-bottom-1px': i <= 3, 'border-left-1px': i !== 0 && i !== 4}"
      >
        <div class="cube-font-15 cube-c-black cube-font-weight--m" v-text="item.value"/>
        <div class="cube-font-14 cube-c-light-grey" v-text="item.text"/>
      </div>
    </div>

    <div v-if="regularLine.length" class="truck-detail__card cube-font-15 cube-mt-15 border-bottom-1px">
      <div class="cube-c-black cube-mb-15" v-text="'常跑线路'"/>
      <div class="cube-c-grey cube-font-15">
        <p v-for="(item, index) in regularLine" :key="index" class="cube-mb-15 truck-detail__regularLine">
          <span>{{item.en}}</span>
          <IconFont name="icon-line" color="#9DA1B0" class="route-line cube-ml-20 cube-mr-20"/>
          <span>{{item.sn}}</span>
        </p>
      </div>
    </div>
    <div v-if="photoList.length" class="truck-detail__card cube-font-15 cube-mt-15">
      <div class="cube-c-black cube-mb-15" v-text="'证件照片'"/>
      <div class="photoWrap">
        <div v-for="(item, index) in photoList" :key="index" class="photo">
          <div :style="{'background-image': `url(${item})`}" class="photo-preview"/>
        </div>
      </div>
    </div>

    <div v-if="viewData.remark" class="truck-detail__card cube-font-15 cube-mt-15">
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
import { setAppRightBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/carrier'

const ListConfig = [
  { text: '载重', key: 'shippingWeight' },
  { text: '净空', key: 'shippingVolume' },
  { text: '车型', key: 'carType' },
  { text: '车长', key: 'carLength' },
  { text: '品牌', key: 'carBrand' },
  { text: '购买时间', key: 'purchDate' }
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
        detail.drivePhoto && arr.push(process.env.VUE_APP_IMG_HOST + detail.drivePhoto)
        detail.travelPhoto && arr.push(process.env.VUE_APP_IMG_HOST + detail.travelPhoto)
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
      setAppRightBtn([
        {
          text: '删除',
          iconType: 'delete',
          action: this.removeHandle
        },
        {
          text: '修改',
          iconType: 'edit',
          action: () => {
            this.$router.push({
              name: 'contacts-carrier-truck-modify',
              query: {
                carrierId: this.truckDetail.carrierId,
                carId: this.truckDetail.id
              }
            })
          }
        }
      ])
    },

    phoneCall () {
      window.location.href = `tel: ${this.truckDetail.driverPhone}`
    },

    removeHandle () {
      this.$createDialog({
        type: 'confirm',
        title: '',
        content: '请确认是否需要删除该信息?',
        icon: 'cubeic-alert',
        onConfirm: () => {
          const data = {
            carId: this.$route.query.carId
          }
          try {
            this.removeTruck(data)
            this.$refreshPage('contacts-carrier-truck', 'contacts-carrier-truck-detail')
          } catch (e) {
            console.log(e)
          } finally {
            this.$router.back()
          }
        }
      }).show()
    }
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
  &__card
    padding 16px 15px
    min-height 100px
    background #ffffff
  &__info
    padding 10px 15px 0px 15px
    flex-wrap wrap
    line-height 20px
    display flex
    background #fff
    >>>.border-left-1px:before
      height 100%
      top 15px
    &-item
      width 85px
      padding 13px 0px
      text-align center
  &__regularLine
    display flex
    align-items center
  .photoWrap
    display flex
    .photo
      margin-left 25px
      border-radius 2px
      height 90px
      width 160px
      &:first-child
        margin-left 0
      &-preview
        position relative
        background center no-repeat #F9F9F9
        background-size cover
        height 100px
</style>
