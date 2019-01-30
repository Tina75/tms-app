<!-- 消息详情 -->
<template>
  <div class="page msg">
    <p class="msg-title">{{MsgDetail.title}}</p>
    <span class="msg-time">{{MsgDetail.createTime | datetimeFormat}}</span>
    <pre class="msg-content" v-html="MsgDetail.content"/>
  </div>
</template>

<script>
import { setAppRightBtn } from '@/libs/bridgeUtil'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'message-detail',
  metaInfo: { title: '消息' },

  computed: {
    ...mapGetters('message', ['MsgDetail'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getMsgById(to.params.id)
    })
  },
  activated() {
    setAppRightBtn([
      { text: '删除',
        iconType: 'delete',
        action: () => {
          this.$createDialog({
            type: 'confirm',
            // icon: 'cubeic-alert',
            title: '提醒',
            content: '确定要删除消息吗？',
            onConfirm: () => {
              this.deleteMsgById(this.$route.params.id).then(() => {
                this.$router.back()
              })
            }
          }).show()
        }
      }
    ])
  },
  beforeRouteLeave(to, from, next) {
    setAppRightBtn([{ text: '', action: () => { } }])
    next()
  },
  methods: {
    ...mapActions('message', ['getMsgById', 'deleteMsgById'])
  }
}

</script>
<style lang='stylus' >
.msg
  width 375px
  padding 20px 15px
  background white
  overflowx-x hidden
  overflow-y auto

  pre
    margin-top: 15px
    color: #666666
    font-size: 15px
    line-height:20px;
    white-space: pre-wrap;
    word-wrap: break-word;

  &-title
    font-size 18px
    color #333333
    font-weight bold
  &-time
    font-size 12px
    color #999999
    padding 10px 0
    display block
  &-content
    color #666666
    display inline-block
    font-size 15px
    word-break break-all
    line-height 22px
    margin-bottom 10px
    overflow hidden
    img
      width 100%
</style>
