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
        pullUpLoad: false
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
    onListPullDown() {
      console.info('onPullDown')
      this.loadingData(true)
    },
    onListPullUp() {
      console.info('onPullUp')
      this.loadingData()
    },
    async loadingData(clear) {
      this.loading = true
      try {
        await this.loader(clear)
        this.checkPullDown()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
        this.stopListLoading()
      }
    },
    checkPullDown() {
      const betterScroll = this.$refs.scroll.scroll
      const pullUpLoad = !!this.isEnd
      this.options.pullUpLoad = pullUpLoad
      pullUpLoad ? betterScroll.openPullUp() : betterScroll.closePullUp()
    },
    startHackLoading() {
      this.loading = true
      setTimeout(() => {
        const scroll = this.$refs.scroll
        scroll.scrollTo(0, 50)
        scroll._pullDownHandle()
        scroll._pullDownScrollHandle({ y: 50 })
        this.$emit('refresh', false)
      })
    },
    stopListLoading() {
      this.$refs.scroll.forceUpdate()
    }
  }
}
</script>

<style lang='stylus'>
</style>
