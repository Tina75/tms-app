<template>
  <div class="driver-detail">
    <div class="driver-detail_info cube-mb-15">
      <div class="avatar">
        <IconFont
          name="icon-ico_driver1"
          :size="40"
          class="avatar_icon"
        />
      </div>
      <div class="driver">
        <h2>{{viewData.driverName}} <span>{{viewData.carNO}}</span></h2>
        <p>{{viewData.driverPhone}}</p>
      </div>
    </div>
    <div v-if="infoList.length" class="driver-detail__info">
      <div
        v-for="(item, i) in infoList"
        :key="i"
        class="driver-detail__info-item"
        :class="{'border-bottom-1px': i <= 3, 'border-left-1px': i !== 0 && i !== 4}"
      >
        <div class="cube-font-15 cube-c-black cube-font-weight--m" v-text="item.value"/>
        <div class="cube-font-14 cube-c-light-grey cube-mt-10" v-text="item.text"/>
      </div>
    </div>
    <div v-if="regularLine.length" class="driver-detail_line cube-mt-15">
      <div class="routes">
        <h2 class="cube-c-grey-dark cube-font-16">常跑路线</h2>
        <div class="cube-c-grey cube-pl-15 cube-pr-15 cube-font-15">
          <p v-for="(item, index) in regularLine" :key="index" class="cube-mb-15">
            <span>{{item.en}}</span>
            <IconFont name="icon-line" color="#9DA1B0" class="route-line cube-ml-20 cube-mr-20"/>
            <span>{{item.sn}}</span>
          </p>
        </div>
      </div>
      <div v-if="photoList.length" class="identImg border-top-1px">
        <h2 class="cube-c-grey-dark cube-font-16">证件照片</h2>
        <div class="imgs">
          <img v-for="(item, index) in photoList" :key="index" :src="item" alt="">
        </div>
      </div>
      <div v-if="viewData.remark" class="remark border-top-1px">
        <h2 class="cube-c-grey-dark cube-font-16">备注</h2>
        <div class="cube-pa-15 cube-font-15 cube-c-grey">
          {{viewData.remark}}
        </div>
      </div>
    </div>
    <div class="driver-detail_call">
      <cube-button
        :primary="true"
        @click="callPhone">
        <span class="phone">
          <IconFont
            name="icon-ico_call"
            size="24"
          />
        </span>
        <span>拨打电话</span>
      </cube-button>
    </div>
  </div>
</template>
<script>
import IconFont from '@/components/Iconfont'
import { mapState, mapActions } from 'vuex'
import { DriverDetail } from '../modules/model.js'
import { setAppRightBtn } from '@/libs/bridgeUtil'
const ListConfig = [
  { text: '载重', key: 'shippingWeight' },
  { text: '净空', key: 'shippingVolume' },
  { text: '车型', key: 'carType' },
  { text: '车长', key: 'carLength' },
  { text: '品牌', key: 'carBrand' },
  { text: '结算方式', key: 'payType' }
]
const moudleName = 'contacts/driver'
export default {
  name: 'DriverDetail',
  metaInfo: {
    title: ''
  },
  components: { IconFont },
  data () {
    return {
      viewData: {}
    }
  },
  computed: {
    ...mapState(moudleName, ['driverDetail']),
    photoList () {
      const detail = this.viewData
      if (detail) {
        const arr = []
        if (detail.drivePhoto) { arr.push(process.env.VUE_APP_IMG_HOST + detail.drivePhoto) }
        if (detail.travelPhoto) { arr.push(process.env.VUE_APP_IMG_HOST + detail.travelPhoto) }
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
    ...mapActions(moudleName, ['loadDriverDetail', 'removeDriver']),
    async onPageRefresh() {
      this.viewData = {}
      await this.loadDriverDetail()
      this.viewData = DriverDetail.toView(this.driverDetail)
    },
    callPhone () {
      window.location.href = `tel: ${this.driverDetail.driverPhone}`
    },
    async remove() {
      await this.removeDriver({ carrierId: this.$route.query.carrierId })
      this.$refreshPage('contacts-driver')
      window.toast('删除成功')
      this.$router.back(true)
    },
    setButton() {
      setAppRightBtn([
        {
          text: '修改',
          iconType: 'edit',
          action: this.editDriver.bind(this)
        },
        {
          text: '删除',
          iconType: 'delete',
          action: () => {
            this.$createDialog({
              type: 'confirm',
              title: '',
              content: '请确认是否需要删除该信息?',
              icon: 'cubeic-alert',
              onConfirm: this.remove.bind(this)
            }).show()
          }
        }
      ])
    },
    editDriver() {
      this.$router.push({ name: 'contacts-driver-modify', query: { carrierId: this.$route.query.carrierId } })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setButton())
  }
}
</script>
<style lang="stylus" scoped>
.driver-detail
  height 100%
  padding-bottom 44px
  box-sizing border-box
  overflow-y auto
  &_info
    width 100%
    height 110px
    padding 20px 16px
    box-sizing border-box
    background-color #ffffff
    display flex
    .avatar
      width 70px
      height 70px
      background-color #E4E7EC
      text-align center
      line-height 70px
      border-radius 50%
      &_icon
        background: #FFFFFF
        -webkit-background-clip: text
        color: transparent
    .driver
      padding 10px 0px
      margin-left 9px
      color #333333
      h2
        font-size 18px
        font-weight 500
        line-height 18px
        span
          display inline-block
          margin-left 10px
          background-color #FCA950
          padding 0px 5px
          font-size 12px
          color  #FFFFFF
          vertical-align top
      p
        font-size 14px
        line-height 14px
        margin-top 15px
        color #666666
  &__info
    padding 10px 15px 0px 15px
    // height 160px
    // box-sizing border-box
    display flex
    background #fff
    flex-wrap wrap
    line-height 18px
    >>>.border-left-1px:before
      height 190%
      top 13px
    &-item
      width 85px
      padding 13px 0px
      text-align center
  &_line
    background-color #ffffff
    padding 15px 0
    .routes
      line-height 16px
      h2
        font-weight 500
        padding 15px 15px
      .route-line
        vertical-align top
        font-weight 100
    .identImg
      h2
        font-weight 500
        padding 24px 15px 0px 15px
      .imgs
        display flex
        justify-content space-between
        padding 15px
        img
          width 160px
          height 90px
          vertical-align middle
    .remark
      h2
        font-weight 500
        padding 24px 15px 0px 15px
      div
        line-height 24px
  &_call
    width 100%
    position fixed
    bottom 0px
    .cube-btn
      font-weight 500
      font-size 17px
      border-radius 0
      height 44px
      padding 10px 0px
      line-height 24px
      .phone
        margin-right 5px
        position relative
        top -2px
</style>
