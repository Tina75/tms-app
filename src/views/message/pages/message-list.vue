<template>
  <div class="message">
    <div
      v-for="(item, index) in MessageList"
      :key="index"
      class="message_card"
      @click="getDetail(item.type)">
      <div class="message_icon">
        <img
          :src="item.iconUrl | imgUrlFormat"
          @error="changeImage(item.type, $event)">
        <i
          v-if="item.unreadCnt > 0"
          class="number">
          {{item.unreadCnt}}
        </i>
      </div>
      <div class="message_text">
        <div class="message_text_title">
          <h3>{{item.typeName}}</h3>
          <div>{{item.nearestCreateTimeStr}}</div>
        </div>
        <div class="message_text_desc cube-ellipsis">
          {{item.nearestContent}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import defaultMessageIconOne from '../assets/message-icon-1.png'
import defaultMessageIconTwo from '../assets/message-icon-2.png'
export default {
  name: 'meaasgeList',
  metaInfo: {
    title: '消息'
  },
  computed: {
    ...mapGetters(['MessageList'])
  },
  methods: {
    ...mapActions(['getMessage']),
    changeImage (item, event) {
      if (item === 21) {
        event.target.src = defaultMessageIconOne
      } else {
        event.target.src = defaultMessageIconTwo
      }
    },
    getDetail (type) {
      this.$router.push({
        name: 'message-detail',
        params: {
          type: type
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getMessage()
    })
  }
}
</script>
<style lang="stylus" scoped>
.message
  padding-top 10px
  &_card
    margin-bottom 10px
    padding 19px 12px
    height 80px
    box-sizing border-box
    background-color #ffffff
    display flex
    -webkit-display flex
  &_icon
    width 42px
    height 42px
    position relative
    img
      width 100%
      height 100%
    .number
      position absolute
      box-sizing content-box !important
      top -6px
      right -6px
      width 15px
      height 15px
      padding 2px
      border-radius 10px
      background #ED5265
      color #ffffff
      font-style normal
      text-align center
      line-height 17px
      font-size 12px
  &_text
    margin-left 14px
    width 295px
    &_title
      display flex
      -webkit-display flex
      align-items center
      justify-content space-between
      h3
        font-size 16px
        color #333333
        font-weight bold
        line-height 22px
      div
        font-size 12px
        color #999999
        line-height 17px
    &_desc
      margin-top 2px
      font-size 12px
      color #666666
      line-height 17px
    .cube-ellipsis
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      word-wrap normal
</style>
