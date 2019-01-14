<template>
  <div class="list-placeholder">
    <div class="list-placeholder__content">
      <cube-loading v-if="loading" :size="40" />
      <template v-else>
        <slot name="img">
          <img :src="img" class="list-placeholder__img">
        </slot>
        <div class="list-placeholder__message cube-mb-25 cube-mt-5" v-html="message"/>
        <div v-if="action">
          <cube-button :primary="true" @click="clickHandler">{{action}}</cube-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: '' // 图片
    },
    message: {
      type: String,
      default: '' // 提示信息
    },
    action: {
      type: String,
      default: '' // 按钮动作描述
    }
  },
  methods: {
    clickHandler() {
      this.$emit('btn-click') // 点击按钮的方法
    }
  }
}
</script>
<style lang='stylus'>
.list-placeholder
  height 100%
  min-height 100vh
  background-color #fff
  display flex
  flex-direction column
  align-items center
  justify-content center
  &__content
    display flex
    flex-direction column
    align-items center
    position relative
    text-align center
    top -45px //native头部大概高度
  &__img
    // height 182px
    width 185px
  &__message
    width 200px
    font-size 14px
    color #666666
    line-height 24px
    position relative
  .cube-btn
    width 140px
    height 40px
    padding 0
    line-height 40px
    font-size 17px
    font-weight 500
</style>
