<template>
  <div class="contact-list">
    <div class="contact-item">
      <span class="contact-item-aside">收</span>
      <div class="contact-item-content">
        <Contact :data="consignee" />
      </div>
    </div>

    <div class="contact-item">
      <span class="contact-item-aside">发</span>
      <div class="contact-item-content">
        <Contact :data="consigner" />
      </div>
    </div>
  </div>
</template>

<script>
import Contact from './Contact'
export default {
  name: 'ContactList',
  components: { Contact },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    consigner () {
      return {
        name: this.data.consignerContact,
        address: this.data.consignerAddress,
        phone: this.data.consignerPhone
      }
    },
    consignee () {
      return {
        name: this.data.consigneeContact,
        address: this.data.consigneeAddress,
        phone: this.data.consigneePhone
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .contact-list
    flex-direction column
    padding 21px 10px 21px 0

  .contact-item
    display flex
    position relative

    &-aside
      flex none
      width 30px
      height 30px
      line-height 31px
      border-radius 2px
      margin-right 15px
      font-size 15px
      text-align center
      color #ffffff

    &:first-child
      padding-bottom 38px

      &:after
        content ""
        position absolute
        top 29px
        bottom -1px
        left 15px
        width 1px
        // border-left 1px solid
        background linear-gradient(180deg, rgba(24,156,178,1), rgba(32,40,44,1))

      .contact-item-aside
        background #189CB2

    &:last-child .contact-item-aside
      background #20282C

    &-content
      flex auto
</style>
