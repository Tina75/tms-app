<template>
  <div class="pickup">
    <cube-tab-bar
      v-model="currentTab"
      :data="tabs"
      :show-slider="true"
      :use-transition="true"
      @change="changeHandler">
    </cube-tab-bar>
    <div class="scroll-list-wrap">
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DispatchingList from '../components/DispatchingList'
import BePickingList from '../components/BePickingList'
import PickingList from '../components/PickingList'
import PickedList from '../components/PickedList'

export default {
  name: 'pickup',
  metaInfo: {
    title: '提货管理'
  },
  components: { DispatchingList, BePickingList, PickingList, PickedList },
  data () {
    return {
      currentTab: 'DispatchingList',
      tabs: [
        {
          label: '待调度',
          value: 'DispatchingList'
        },
        {
          label: '待提货',
          value: 'BePickingList'
        },
        {
          label: '提货中',
          value: 'PickingList'
        },
        {
          label: '已提货',
          value: 'PickedList'
        }
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
.pickup
  background-color: #EFEFEF;
  .cube-tab-bar
    background-color: #ffffff;
    height: 50px
    margin-bottom: 15px;
</style>
