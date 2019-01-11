<template>
  <div class="cell-group">
    <p class="penal-title"></p>
    <slot/>
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
    tap: Function
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
  .cell-group
    width: 100%;
    background-color: #fff;
    margin-bottom: 12px;
    padding-left: 15px;
</style>
