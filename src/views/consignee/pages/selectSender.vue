<template>
  <div class="select">
    <div
      class="border-top-1px">
      <div
        v-for="(item, index) in data"
        :key="index"
        @click="choose(item.company)">
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
                <span>{{item.company}}</span>
              </div>
              <div class="info_bottom">
                <span>{{item.name}}</span>
                <span>{{item.phone}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NoData
      v-if="!data"
      :img="IMG.noSender"
      content="发货方"/>
  </div>
</template>
<script>
import Mock from './mock.json'
import IconFont from '@/components/Iconfont'
import NoData from '../components/noData'
const IMG = {
  noSender: require('../assets/no-sender.png')
}
export default {
  name: 'SelectSender',
  metaInfo: {
    title: '选择发货方'
  },
  components: { IconFont, NoData },
  data () {
    return {
      IMG
    }
  },
  computed: {
    data () {
      return Mock.sender
      // return []
    }
  },
  methods: {
    choose(name) {
      console.log(name)
      this.$router.back()
    }
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
