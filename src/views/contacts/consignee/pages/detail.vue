<template>
  <div class="consignee-detail">
    <div class="consignee-detail_info">
      <div class="consignee-detail_info__avatar">
        <IconFont
          name="icon-ico_send"
          :size="40"
          class="consignee-detail_avatar_icon"
        />
      </div>
      <div class="consignee-detail_info__consignor">
        <h2>{{consigneeDetail.contact}}</h2>
        <p>{{consigneeDetail.phone}}</p>
      </div>
    </div>
    <div class="consignee-detail_other">
      <div class="consignee-detail_other__card">
        <div class="consignee-detail_title">收货地址</div>
        <div class="consignee-detail_address">{{consigneeDetail.cityName}}</div>
        <div class="consignee-detail_address">{{address}}</div>
      </div>
      <div class="consignee-detail_other__card">
        <div class="consignee-detail_title">所属发货方</div>
        <div class="consignee-detail_address">{{consigneeDetail.consignerName}}</div>
      </div>
      <div class="consignee-detail_other__card">
        <div class="consignee-detail_title">收货人单位</div>
        <div class="consignee-detail_address">{{consigneeDetail.consigneeCompanyName}}</div>
      </div>
      <div class="consignee-detail_other__card">
        <div class="consignee-detail_title">备注</div>
        <div class="consignee-detail_address">{{consigneeDetail.remark}}</div>
      </div>
    </div>
    <div class="consignee-detail_call">
      <cube-button
        :primary="true"
        @click="callPhone">
        <span class="consignee-detail_call__phone">
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
import { setAppRightBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/consignee'
export default {
  name: 'ConsigneeDetail',
  metaInfo: {
    title: ''
  },
  components: { IconFont },
  computed: {
    ...mapState(moudleName, ['consigneeDetail']),
    address () {
      if (this.consigneeDetail.consignerHourseNumber) {
        return this.consigneeDetail.address + this.consigneeDetail.consignerHourseNumber
      }
      return this.consigneeDetail.address
    }
  },
  methods: {
    ...mapActions(moudleName, ['loadConsigneeDetail', 'removeConsignee']),
    onPageRefresh() {
      this.loadConsigneeDetail()
      this.setButton()
    },
    callPhone () {
      window.location.href = `tel:${this.consigneeDetail.phone}`
    },
    setButton() {
      setAppRightBtn([
        {
          text: '删除',
          iconType: 'delete',
          action: () => {
            this.$createDialog({
              type: 'confirm',
              content: '确定删除？',
              icon: 'cubeic-alert',
              onConfirm: () => {
                const data = {
                  id: this.consigneeDetail.id
                }
                try {
                  this.removeConsignee(data)
                } catch (e) {
                  console.log(e)
                } finally {
                  this.$router.back()
                }
              }
            }).show()
          }
        },
        {
          text: '修改',
          iconType: 'edit',
          action: () => {
            this.$router.push({ name: 'contacts-consignee-modify', query: { consigneeId: this.consigneeDetail.id } })
          }
        }
      ])
    }
  }
}
</script>
<style lang="stylus" scoped>
.consignee-detail
  height 100%
  padding-bottom 44px
  box-sizing border-box
  overflow-y auto
  &_avatar_icon
    background: #FFFFFF
    -webkit-background-clip: text
    color: transparent
  &_title
    font-size 16px
    color #333333
    font-weight 500
    margin-bottom 13px
  &_address
    font-size 15px
    color #666666
    line-height 24px
  &_info
    width 100%
    height 110px
    padding 20px 16px
    box-sizing border-box
    background-color #FFFFFF
    display flex
    &__avatar
      width 70px
      height 70px
      background-color #E4E7EC
      text-align center
      line-height 70px
      border-radius 50%
    &__consignor
      padding 10px 0px
      margin-left 9px
      color #333333
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
    &__card
      background-color #ffffff
      padding 24px 15px 15px
      border-bottom 1px solid #E4E7EC
    &__card:last-child
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
    &__phone
      margin-right 5px
      position relative
      top -2px
</style>
