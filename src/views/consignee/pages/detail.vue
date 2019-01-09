<template>
  <div class="detail">
    <div class="detail_info">
      <div class="avatar">
        <IconFont
          name="icon-ico_send"
          :size="40"
          class="avatar_icon"
        />
      </div>
      <div class="consignor">
        <h2>{{detail.name}}</h2>
        <p>{{detail.phone}}</p>
      </div>
    </div>
    <div class="detail_other">
      <div class="otherCard">
        <div class="title">收货地址</div>
        <div class="address">{{detail.address}}</div>
      </div>
      <div class="otherCard">
        <div class="title">所属发货方</div>
        <div class="address">{{detail.address}}</div>
      </div>
      <div class="otherCard">
        <div class="title">收货人单位</div>
        <div class="address">{{detail.address}}</div>
      </div>
      <div class="otherCard">
        <div class="title">备注</div>
        <div class="address">{{detail.address}}</div>
      </div>
    </div>
    <div class="detail_call">
      <cube-button
        :primary="true"
        @click="callPhone">
        <img src="../assets/consignee_call.png" class="phone">
        <span>拨打电话</span>
      </cube-button>
    </div>
  </div>
</template>
<script>
import Mock from './mock.json'
import IconFont from '@/components/Iconfont'
// import { setAppTitleBtn } from '@/libs/bridgeUtil'
export default {
  name: 'ConsigneeDetail',
  metaInfo: {
    title: ''
  },
  components: { IconFont },
  computed: {
    detail() {
      return Mock.detail
    }
  },
  methods: {
    callPhone () {

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
  &_info
    width 100%
    height 110px
    padding 20px 16px
    box-sizing border-box
    background-color #3A424B
    display flex
    .avatar
      width 70px
      height 70px
      background-color rgba(0,0,0,0.2238)
      text-align center
      line-height 70px
      border-radius 50%
      &_icon
        background: linear-gradient(180deg,rgba(113,124,135,1) 0%,rgba(58,66,75,1) 100%)
        -webkit-background-clip: text
        color: transparent
    .consignor
      padding 10px 0px
      margin-left 9px
      color #ffffff
      h2
        font-size 18px
        font-weight 500
        line-height 18px
      p
        font-size 14px
        line-height 14px
        margin-top 15px
  &_other
    margin-top 10px
    .otherCard
      background-color #ffffff
      padding 24px 15px 15px
      border-bottom 1px solid #E4E7EC
      .title
        font-size 16px
        color #333333
        font-weight 500
      .address
        font-size 15px
        color #666666
        line-height 24px
        margin-top 13px
    .otherCard:last-child
      border-bottom none
  &_call
    width 100%
    position fixed
    bottom 0px
    .cube-btn
      font-weight 500
      font-size 17px
      border-radius 0
      height 44px
      padding 0
      span
        line-height 24px
      .phone
        width 24px
        height 24px
        vertical-align top
        background #000000
        margin-right 5px
</style>
