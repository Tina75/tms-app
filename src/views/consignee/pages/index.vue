<template>
  <div class="consignee">
    <cube-index-list :data="data">
      <cube-index-list-group
        v-for="(group, index) in data"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem">
          <div>我是自定义 {{item.name}}</div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>
<script>
import Mock from './mock.json'
export default {
  name: 'Consignee',
  metaInfo: {
    title: '收货方'
  },
  computed: {
    data () {
      return Mock.list
    }
  },
  methods: {
    selectItem () {

    }
  }
}
</script>
<style lang="stylus" scoped>
.consignee
  background-color #ffffff
</style>
