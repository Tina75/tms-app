<!-- 消息详情 -->
<template>
  <div class="page msg ">
    <p class="msg-title">{{MsgDetail.title}}</p>
    <span class="msg-time">{{MsgDetail.createTime | datetimeFormat}}</span>
    <pre class="msg-content" v-html="MsgDetail.content"/>
  </div>
</template>

<script>
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
  methods: {
    ...mapActions('message', ['getMsgById', 'deleteMsgById'])
  }
}

</script>
<style lang='stylus' scoped>
.msg
  padding 20px 15px
  background white
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
    font-size 15px
    line-height 22px
    margin-top 10px
    margin-bottom 10px
</style>
