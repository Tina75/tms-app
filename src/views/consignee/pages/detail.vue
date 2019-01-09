<template>
  <div class="detail">
    <div class="detail_info">
      <img src="../assets/consignee_avatar.png" class="avatar">
    </div>
  </div>
</template>
<script>
import Mock from './mock.json'
export default {
  name: 'ConsigneeDetail',
  metaInfo: {
    title: ''
  },
  computed: {
    detail() {
      return Mock.detail
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail
  height 100%
  &_info
    height 110px
    padding 20px 16px
    box-sizing border-box
    background-color #3A424B
    display flex
    .avatar
      width 70px
      height 70px
      border-radius 50%
</style>
