<template>
  <div class="detail-group">
    <div
      class="content">
      <cube-tab-bar
        v-show="showTabs"
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler">
      </cube-tab-bar>
      <div
        ref="detailContent"
        class="main"
        @scroll="anchorLocate">
        <div
          v-if="status"
          v-show="!showTabs"
          ref="statusContainer"
          class="status-container">
          <h2>{{status.text}}</h2>
          <p>{{status.time}}</p>
        </div>
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :ref="'content-box-' + tab.anchor"
          class="block">
          <slot :data="tab"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array
    },
    status: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selectedLabelDefault: '',
      statusHeight: 0,
      showTabs: true,
      realTab: []
    }
  },
  mounted () {
    this.showTabs = !this.status
    this.setHeights()
  },
  updated () {
    this.setHeights()
  },
  methods: {
    clickHandler () {},
    changeHandler () {},
    setHeights () {
      this.realTab = this.tabs.map(item => Object.assign({ height: this.$refs['content-box-' + item.anchor][0].offsetTop }, item))
    },
    anchorLocate () {
      console.log(this.$refs['detailContent'].scrollTop, this.statusHeight)
      // console.log(this.$refs['detailContent'].scrollTop >= this.statusHeight)
      if (this.$refs['statusContainer']) {
        this.statusHeight = this.$refs['statusContainer'].clientHeight + 1
      }
      this.showTabs = this.$refs['detailContent'].scrollTop >= this.statusHeight
      this.realTab.find(item => item.height)
    }
  }
}
</script>
<style lang='stylus' scoped>
  .detail-group
    height: 100%
    .status-container
      background-color: #000;
      color: #ffffff;
      height: 100px
    .content
      height: 100%
      display: flex
      flex-direction column
      .cube-tab-bar
        height: 50px
      .main
        flex: 1
        overflow: auto
</style>
