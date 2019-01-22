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
      <component :is="currentTab"/>
    </div>
  </div>
</template>

<script>
import DispatchingList from '../components/DispatchingList'
import BePickingList from '../components/BePickingList'
import PickingList from '../components/PickingList'
import PickedList from '../components/PickedList'
import { mapGetters, mapActions } from 'vuex'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'pickup',
  metaInfo: {
    title: '提货管理'
  },
  components: { DispatchingList, BePickingList, PickingList, PickedList },
  props: {
    tab: {
      type: Number,
      default: 0
    }
  },
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
      ],
      tabMap: {
        1: 'DispatchingList',
        2: 'BePickingList',
        3: 'PickingList',
        4: 'PickedList'
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['tabCount'])
  },
  watch: {
    tab (val) {
      this.currentTab = this.tabMap[val]
    },
    currentTab (value) {
      if (value === 'DispatchingList') {
        setAppRightBtn([
          {
            text: '调度',
            action: () => {
              this.$router.push({
                name: 'pickup-dispatch'
              })
            }
          }
        ])
      } else {
        setAppRightBtn([{ text: '', action: () => {} }])
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['getPickupCount', 'setPageStart'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      setAppRightBtn([
        {
          text: '调度',
          action: () => {
            vm.$router.push({
              name: 'pickup-dispatch'
            })
          }
        }
      ])
      vm.getPickupCount()
    })
  },
  beforeRouteLeave (to, from, next) {
    setAppRightBtn([{ text: '', action: () => {} }])
    next()
  }
}
</script>
<style scoped lang="stylus">
.pickup
  height: 100%
  background-color: #EFEFEF;
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
    overflow-y auto
    height calc(100% - 80px)
</style>
