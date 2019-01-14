<template>
  <div class="detail">
    <div class="detail_info">
      <div class="avatar">
        <IconFont
          name="icon-driverr"
          :size="40"
          class="avatar_icon"
        />
      </div>
      <div class="driver">
        <h2>张三胖子 <span>苏A5Q2D6</span></h2>
        <p>18351825731</p>
      </div>
    </div>
    <div class="detail_other">
      <div class="type">
        <div class="item cube-ml-15">
          <p class="info-detail">20吨</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">载重</p>
        </div>
        <div class="line"/>
        <div class="item">
          <p class="info-detail">45方</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">净空</p>
        </div>
        <div class="line"/>
        <div class="item">
          <p class="info-detail">高栏</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">车型</p>
        </div>
        <div class="line"/>
        <div class="item">
          <p class="info-detail">17.5米</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">车长</p>
        </div>
      </div>
      <div class="type">
        <div class="item cube-ml-15">
          <p class="info-detail">东风</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">品牌</p>
        </div>
        <div class="line"/>
        <div class="item">
          <p class="info-detail">月结</p>
          <p class="cube-c-light-grey cube-mt-10 cube-font-14">结算方式</p>
        </div>
      </div>
    </div>
    <div class="detail_line cube-mt-15">
      <div class="routes">
        <h2 class="cube-c-grey-dark cube-font-16">常跑路线</h2>
        <div class="cube-c-grey cube-pl-15 cube-pr-15 cube-font-15">
          <p>
            <span>江苏省南京市</span>
            <IconFont name="icon-line" color="#9DA1B0" class="route-line cube-ml-20 cube-mr-20"/>
            <span>江苏省南京市</span>
          </p>
          <p class="cube-mt-15">
            <span>江苏省南京市</span>
            <IconFont name="icon-line" color="#9DA1B0" class="route-line cube-ml-20 cube-mr-20"/>
            <span>江苏省南京市</span>
          </p>
        </div>
      </div>
      <div class="identImg">
        <h2 class="cube-c-grey-dark cube-font-16">证件照片</h2>
        <div class="imgs">
          <div>
            <img src="../assets/driver-nodata.png" alt="">
          </div>
          <div>
            <img src="../assets/driver-nodata.png" alt="">
          </div>
        </div>
      </div>
      <div class="remark">
        <h2 class="cube-c-grey-dark cube-font-16">备注</h2>
        <div class="cube-pa-15 cube-font-15 cube-c-grey">
          江苏省南京市江苏省南京市江苏省南京市江苏省南京 市江苏省南京市后就开始疯狂军队和司法解释
        </div>
      </div>
    </div>
    <!-- <cube-button
      :primary="true"
      @click="goAdd">
      新增
    </cube-button>
    <cube-button
      :primary="true"
      @click="goEdit">
      修改
    </cube-button> -->
    <div class="detail_call">
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
import { mapGetters } from 'vuex'
// import { setAppTitleBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeDetail',
  metaInfo: {
    title: ''
  },
  components: { IconFont },
  computed: {
    ...mapGetters(moudleName, ['consigneeDetail'])
  },
  methods: {
    callPhone () {
      window.location.href = `tel:${this.consigneeDetail.phone}`
    },
    goAdd () {
      this.$router.push({
        name: 'contacts-consignee-form',
        params: {
          type: 'add'
        }
      })
    },
    goEdit () {
      this.$router.push({
        name: 'contacts-consignee-form',
        params: {
          type: 'edit'
        },
        query: {
          id: 1
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    })
  }
}
</script>
<style lang="stylus" scoped>
.detail
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
      span
        display inline-block
        margin-left 10px
        background-color #FCA950
        padding 4px 5px
        font-size 12px
        color  #FFFFFF
      h2
        font-size 18px
        font-weight 500
        line-height 18px
      p
        font-size 14px
        line-height 14px
        margin-top 15px
        color #666666
  &_other
    margin-top 15px
    padding 0px 15px
    background-color #ffffff
    .type:last-child
      border none
    .type
      padding 15px 0px
      display flex
      // justify-content space-between
      box-sizing border-box
      height 75px
      margin 0 0
      border-bottom 1px solid #E4E7EC
      border-width 0.5px
      .line
        height 100%
        width 0.5px
        background-color #E4E7EC
        margin 0px 30px
      .item
        // flex 1
        // padding 0px 28px
        font-size 12px
        text-align center
        box-sizing border-box
        display flex
        flex-direction column
        // align-items center
        justify-content center
      .item-pl
        padding-left 15px
      .item-pr
        padding-right 15px
      .info-detail
        color #333333
        font-size 15px
        font-weight 500
        // flex 1
  &_line
    background-color #ffffff
    padding 15px 0
    .routes
      padding-bottom 15px
      border-bottom 1px solid #E4E7EC
      border-width 0.5px
      h2
        font-weight 500
        padding 15px 15px
      .route-line
        vertical-align top
    .identImg
      border 1px solid #E4E7EC
      border-width 0.5px
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
