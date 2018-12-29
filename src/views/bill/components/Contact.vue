<template>
  <div>
    <p class="name">{{ contact.name }}</p>
    <p class="address">{{ contact.address }}</p>
    <a
      class="contact"
      :href="`tel:${contact.phone}`">
      <Iconfont
        class="contact-icon"
        name="yzg-hebingxingzhuang2"
        size="18" />
      联系TA
    </a>
  </div>
</template>

<script>
import bridge from '@/libs/dsbridge'

export default {
  name: 'Contact',
  props: {
    data: {
      type: Object, // { name, address, phone }
      required: true
    }
  },
  computed: {
    contact () {
      return this.data
    }
  },
  methods: {
    makeCall () {
      bridge.call('ui.phoneCall', { phone: this.contact.phone })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .name, .address
    font-size 15px
    line-height 21px

  .name
    font-weight bold
    margin-bottom 3px

  .address
    margin-bottom 10px

  .contact
    display block
    width 80px
    height 18px
    font-size 13px
    line-height 18px
    color #189cb2

    &-icon
      margin-right 6px
      vertical-align text-top
</style>
