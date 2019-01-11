<template>
  <div v-if="showData" class="select">
    <div
      v-if="consignerList && consignerList.length > 0"
      class="border-top-1px">
      <div
        v-for="(item, index) in consignerList"
        :key="index"
        @click="choose(item)">
        <div class="select_item border-bottom-1px">
          <div class="select_item_img">
            <IconFont
              name="icon-ico_accept"
              :size="25"
              class="avatar_icon"
            />
          </div>
          <div class="select_item_info">
            <div>
              <div class="info_top">
                <span>{{item.name}}</span>
              </div>
              <div class="info_bottom">
                <span>{{item.contact}}</span>
                <span>{{item.phone}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoData
      v-else
      :img="config.img"
      button-text="新增发货方"
      :message="config.message"/>
  </div>
</template>
<script>
import IconFont from '@/components/Iconfont'
import NoData from '@/components/NoData'
import { mapGetters, mapActions } from 'vuex'
const moudleName = 'contacts/consignee'
const config = {
  img: require('../assets/shipper_nodata.png'),
  message: '老板，您还没有记录发货方信息 赶快新增一个，方便联系哦～'
}
export default {
  name: 'SelectSender',
  metaInfo: {
    title: '选择发货方'
  },
  components: { IconFont, NoData },
  data () {
    return {
      config,
      showData: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['consignerList'])
  },
  methods: {
    ...mapActions(moudleName, ['saveConsignerInfo', 'getConsignerList']),
    async choose(item) {
      await this.saveConsignerInfo(item)
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.showData = true
      // vm.getConsignerList().then(() => {
      //   vm.showData = true
      // })
    })
  }
}
</script>
<style lang="stylus" scoped>
.select
  height 100%
  // padding-top 40px
  .border-bottom-1px:after
    left 70px
  .select_item
    width 100%
    height 60px
    padding 10px 15px
    display flex
    box-sizing border-box
    align-items center
    background-color #ffffff
    &_img
      width 40px
      height 40px
      border-radius 50%
      line-height 40px
      text-align center
      font-size 17px
      color #ffffff
      background-color #E4E7EC
    &_info
      margin-left 15px
      display flex
      padding 10px 0px
      .info_top
        font-size 17px
        color #333333
        font-weight 400
        line-height 18px
      .info_bottom
        margin-top 8px
        font-size 14px
        max-width 224px
        color #999999
        line-height 14px
        span
          margin-right 10px
      .info_phone
        margin-left 21px
        margin-top 5px
        width 30px
        height 30px
        vertical-align middle
</style>
