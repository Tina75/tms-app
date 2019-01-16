<template>
  <wtf
    :is="type"
    ref="scroll"
    :options="options"
    @pulling-down="onListPullDown"
    @pulling-up="onListPullUp"
  >
    <slot/>
    <slot v-if="!hasData && !loading" name="empty"/>
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
    loader: {
      type: Function,
      default: () => {}
    },
    hasNext: {
      type: [Boolean, Number],
      default: true
    },
    hasData: {
      type: [Boolean, Number],
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    options() {
      const pullUpLoad = this.hasData
        ? {
          threshold: 0,
          txt: {
            more: '上拉加载更多',
            noMore: '没有更多数据了'
          }
        }
        : false
      return {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
        pullUpLoad
      }
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
      this.loadingData(true)
    },
    onListPullUp() {
      this.loadingData()
    },
    async loadingData(isRefresh) {
      this.loading = true
      try {
        await this.loader(isRefresh)
      } catch (e) {
        console.error(e)
      } finally {
        this.stopListLoading(isRefresh)
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
    stopListLoading(isRefresh) {
      let scroll = this.getCubeScroll()
      // 重新计算高度和文字
      scroll.forceUpdate(!!this.hasNext)
      this.loading = false
      this.$emit('refresh', false)
      // forceUpdate根据入参判断是否要重新计算高度和更改文案
      // 当该次请求有新的数据但hasNext为false后 scroll更新了文案但没计算高度 需要自己手动设置下, 不如vant机智好用
      if (!this.hasNext && !isRefresh) {
        scroll.refresh()
      }
    }
  }
}
</script>

<style lang='stylus'>
</style>
