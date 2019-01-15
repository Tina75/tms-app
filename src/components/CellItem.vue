<template>
  <div
    class="cell-item"
    @click="eventHandle">
    <label v-if="label">{{label}}</label>
    <div class="cell-content">
      <slot/>
    </div>
    <icon-font
      v-if="linkIcon || route"
      name="icon-ico_right"
      :size="12"
      color="#ADADAD"
      class="link-icon"/>
  </div>
</template>
<script>
import IconFont from './Iconfont'

export default {
  components: { IconFont },
  props: {
    // 标题
    label: {
      type: String,
      default: ''
    },
    // 链接图标
    linkIcon: {
      type: Boolean,
      default: false
    },
    // 跳转路由
    // 结构同 vue-router 的 to {name: '', params: {} || query: {}}
    route: {
      type: Object,
      default: function () {}
    },
    tap: {
      type: Function,
      default: function () {}
    }
  },
  methods: {
    routerLink () {
      const { route, $router } = this
      if (route && $router) {
        $router.push(route)
      }
    },
    eventHandle () {
      if (this.route) {
        this.routerLink()
      } else {
        this.$emit('tap')
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
  .cell-item
    padding: 5px 15px 5px 0
    min-height: 60px
    display: flex
    align-items center
    &:not(:last-child)
      border-bottom: 1px solid #f2f2f2
    label
      display: block
      min-width 50px
      color: #333333;
      font-size: 16px;
      line-height: 22px;
    .cell-content
      flex 1
      text-align: right
      color: #333333
      font-size: 16px;
      line-height: 22px;
    .link-icon
      margin-left: 20px
</style>
