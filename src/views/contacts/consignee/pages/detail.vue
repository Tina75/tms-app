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
        <h2>{{consigneeDetail.contact}}</h2>
        <p>{{consigneeDetail.phone}}</p>
      </div>
    </div>
    <div class="detail_other">
      <div class="otherCard">
        <div class="title">收货地址</div>
        <div class="address">{{consigneeDetail.cityName}}</div>
        <div class="address">{{consigneeDetail.address}}</div>
      </div>
      <div class="otherCard">
        <div class="title">所属发货方</div>
        <div class="address">{{consigneeDetail.consignerHourseNumber}}</div>
      </div>
      <div class="otherCard">
        <div class="title">收货人单位</div>
        <div class="address">{{consigneeDetail.consigneeCompanyName}}</div>
      </div>
      <div class="otherCard">
        <div class="title">备注</div>
        <div class="address">{{consigneeDetail.remark}}</div>
      </div>
    </div>
    <cube-button
      :primary="true"
      @click="goAdd">
      新增
    </cube-button>
    <cube-button
      :primary="true"
      @click="goEdit">
      修改
    </cube-button>
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
        margin-bottom 13px
      .address
        font-size 15px
        color #666666
        line-height 24px
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
      padding 10px 0px
      line-height 24px
      .phone
        margin-right 5px
        position relative
        top -2px
</style>
