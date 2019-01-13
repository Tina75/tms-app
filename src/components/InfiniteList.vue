<template>
  <wtf
    :is="type"
    ref="scroll"
    :options="options"
    @pulling-down="onListPullDown"
    @pulling-up="onListPullUp"
  >
    <slot/>
    <slot v-if="!data.length && !loading" name="empty"/>
  </wtf>
</template>

<script>
export default {
  name: 'ContactsShipper',
  model: {
    prop: 'refresh',
    event: 'refresh'
  },
  props: {
    type: {
      type: String,
      default: 'cube-scroll'
    },
    refresh: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    loader: {
      type: Function,
      default: () => {}
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      },
      loading: false
    }
  },
  watch: {
    refresh(newV) {
      if (newV && !this.loading) {
        this.startHackLoading()
      }
    }
  },
  methods: {
    getCubeScroll() {
      let scroll
      switch (this.type) {
        case 'cube-index-list':
          scroll = this.$refs.scroll.$refs.scroll
          break
        case 'cube-scroll':
          scroll = this.$refs.scroll
          break
      }
      return scroll
    },
    onListPullDown() {
      console.info('onListPullDown')
      this.loadingData(true)
    },
    onListPullUp() {
      this.loadingData()
    },
    async loadingData(clear) {
      this.loading = true
      try {
        await this.loader(clear)
      } catch (e) {
        console.error(e)
      } finally {
        this.stopListLoading()
      }
    },
    // 问过better-scroll黄轶，莫的直接的api手动控制的刷新下拉动画的
    // cube基于cube-scroll改造的组件都可以这么玩
    startHackLoading() {
      this.loading = true
      setTimeout(() => {
        let scroll = this.getCubeScroll()
        if (scroll) {
          scroll.scrollTo(0, 50)
          scroll._pullDownHandle()
          scroll._pullDownScrollHandle({ y: 50 })
        } else {
          this.onListPullDown()
        }
      })
    },
    stopListLoading() {
      let scroll = this.getCubeScroll()
      scroll.forceUpdate()
      this.loading = false
      this.$emit('refresh', false)
    }
  }
}
</script>

<style lang='stylus'>
</style>
