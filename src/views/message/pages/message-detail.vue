<template>
  <div class="swipe-wrapper">
    <cube-scroll
      ref="scroll"
      :data="list"
      :options="options"
      @pulling-down="onPullingDown">
      <div v-if="MessageDetail && MessageDetail.length > 0">
        <cube-swipe>
          <div
            name="swipe"
            tag="ul">
            <div
              v-for="(item, index) in MessageDetail"
              :key="index"
              class="detail swipe-item-wrapper">
              <cube-swipe-item
                ref="swipeItem"
                :btns="btns"
                :index="index"
                :auto-shrink="true"
                @btn-click="deleteMsg(item.id)">
                <div
                  class="detail_card"
                  @click="pushUrl(item.url)">
                  <div class="detail_top">
                    <div class="detail_top_title">
                      <h3>{{item.title}}</h3>
                      <div>{{item.createTimeStr}}</div>
                    </div>
                    <div class="detail_top_desc">
                      {{item.content}}
                    </div>
                  </div>
                  <div class="detail_footer">
                    <span>点击查看详情</span>
                    <i></i>
                  </div>
                </div>
              </cube-swipe-item>
            </div>
          </div>
        </cube-swipe>
      </div>
      <div
        v-else
        class="null">
        <div>
          <img src="../assets/message-null.png">
          <p>您还没有相关的消息</p>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import bridge from '@/libs/dsbridge'
export default {
  name: 'messageDetail',
  metaInfo () {
    return {
      title: +this.$route.params.type === 21 ? '通知消息' : '运单消息'
    }
  },
  data () {
    return {
      btns: [
        {
          text: '',
          color: ''
        }
      ],
      list: [
      ],
      options: {
        pullDownRefresh: {
          threshold: 60,
          txt: '刷新成功'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['MessageDetail'])
  },
  methods: {
    ...mapActions(['getDetail', 'deleteMessage']),
    pushUrl (url) {
      if (url) {
        let scheme = 'ydd://page/webview?url=' + encodeURIComponent(url)
        bridge.call('navigation.openSchema', { url: scheme }, function (result) {})
      }
    },
    async deleteMsg (id) {
      console.log('点击了删除' + id)
      await this.deleteMessage(id)
      this.getDetail(this.$route.params.type)
    },
    async onPullingDown () {
      await this.getDetail(this.$route.params.type)
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDetail(vm.$route.params.type)
    })
  }
}
</script>
<style lang="stylus" scoped>
.swipe-wrapper
  height 100%
  // padding-bottom 80px
.null
  width 100%
  height 100%
  display flex
  justify-content center
  text-align center
  img
    margin-top 161px
    width 117px
    height 117px
  p
    color #333333
    font-size 17px
    line-height 24px
.detail
  padding 15px 12px 0px 12px
  /deep/ .cube-swipe-btn
      // padding 0px 29px
      background #f3f3f3 !important
      width 75px !important
      box-sizing border-box
      .text
        display block
        flex none
        width 44px
        height 44px
        margin-left 29px
        background url("../assets/message-delete.png") center no-repeat
        background-size 44px 44px
  &_card
    background-color #ffffff
  &_top
    color #999999
    padding 18px 20px 14px 20px
    border-bottom 1px solid #E9E9E9
    &_title
      width 100%
      display flex
      align-items center
      justify-content space-between
      h3
        font-size 17px
        color #333333
        line-height 24px
        font-weight bold
      div
        font-size 12px
        line-height 17px
    &_desc
      // height 60px
      margin-top 11px
      line-height 21px
      overflow hidden
  &_footer
    padding 10px 20px
    font-size 13px
    color #555555
    line-height 18px
    display flex
    justify-content space-between
    align-items center
    i
      display block
      width 6px
      height 12px
      background url("../../../assets/arrow.png") center no-repeat
      background-size 6px 12px
</style>
