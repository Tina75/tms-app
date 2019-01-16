<template>
  <div class="pickup">
    <cube-tab-bar
      v-model="currentTab"
      show-slider
      use-transition>
      <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.label" :value="item.value">
        <p class="tab-label">{{item.label}}</p>
        <p class="tab-count">{{tabCount[item.value]}}</p>
      </cube-tab>
    </cube-tab-bar>
    <div class="scroll-list-wrap">
      <keep-alive>
        <component :is="currentTab"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DispatchingList from '../components/DispatchingList'
import BePickingList from '../components/BePickingList'
import PickingList from '../components/PickingList'
import PickedList from '../components/PickedList'
import { mapGetters, mapActions } from 'vuex'

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
  },
  computed: {
    ...mapGetters(['tabCount'])
  },
  methods: {
    ...mapActions(['getPickupCount'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPickupCount()
    })
  }
}
</script>
<style scoped lang="stylus">
.pickup
  height: 100%
  background-color: #EFEFEF;
  display: flex
  flex-direction column
  .cube-tab-bar
    background-color: #ffffff;
    height: 60px
    margin-bottom: 15px;
  .tab-label
    margin-top: 5px;
    font-size: 13px;
    line-height: 18px;
    color: #333333;
    margin-bottom: 5px;
  .tab-count
    font-size: 13px;
    line-height: 18px;
    color: #666666;
    margin-bottom: 5px;
  .cube-tab_active
    .tab-label, .tab-count
      color: #00A4BD;
  .scroll-list-wrap
    flex: 1
    overflow-y auto
</style>
