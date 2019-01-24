<template>
  <div class="pickup-track">
    <div v-if="locationDetail.got === 2" class="map-container">
      <baidu-map class="bm-view" :center="locationDetail.locationList[active]" :zoom="12" ak="EkPR9YNO4Ez9LW301kyTGCyTfQ5cweIz">
        <bm-overlay
          v-if="locationDetail.locationList.length"
          pane="markerPane"
          :class="{terminal: true}"
          @draw="startDraw"/>
        <bm-overlay
          v-if="locationDetail.locationList.length > 1"
          pane="markerPane"
          :class="{terminal: true}"
          @draw="endDraw"/>
        <bm-polyline :path="locationDetail.locationList" stroke-color="#00a4bd" :stroke-opacity="0.5" :stroke-weight="2"/>
        <bm-overlay
          v-if="locationDetail.locationList.length"
          ref="track-locate"
          pane="labelPane"
          :class="{active: true}"
          @draw="activeDraw">
          <div class="driver-label">
            <div class="driver-icon">
              <icon-font
                :name="'icon-ico_driver1'"
                :size="20"
                color="#ffffff"/>
            </div>
            <div class="driver-text">
              <p class="truck-no">{{locationDetail.truckNo}}</p>
              <!--<p class="driver-name">{{locationDetail.truckNo}}</p>-->
            </div>
          </div>
        </bm-overlay>
      </baidu-map>
      <div class="track-mask" :class="{'opacity': !pulled}"/>
      <div v-if="locationDetail.addressList.length" id="track-list" class="track-list" :class="{'pulled': pulled}">
        <div class="popup-switch">
          <i :class="pulled ? 'icon-collapse' : 'icon-expand'" @click="pullSwitch"/>
        </div>
        <div v-show="!pulled" class="location-item strong">
          <div class="location-time">
            <p class="date">{{locationDetail.addressList[active].date}}</p>
            <p class="time">{{locationDetail.addressList[active].time}}</p>
          </div>
          <p class="location-icon">
            <icon-font
              :name="iconMap[locationDetail.addressList[active].positionType]"
              :size="25"
              color="#00A4BD"/>
          </p>
          <p class="location-address">{{locationDetail.addressList[active].address}}</p>
        </div>
        <div v-if="pulled" class="address-list">
          <cube-scroll
            ref="scroll"
            :data="locationDetail.addressList">
            <li
              v-for="(item, index) in locationDetail.addressList"
              :key="index" class="location-item"
              :class="{'strong': item.index === active}"
              @click="relocate(index)">
              <div class="location-time">
                <p class="date">{{item.date}}</p>
                <p class="time">{{item.time}}</p>
              </div>
              <p class="location-icon">
                <icon-font
                  :name="iconMap[item.positionType]"
                  :size="20"
                  :color="item.index === active ? '#00A4BD' : '#C5C8CE'"/>
              </p>
              <p class="location-address">
                {{item.address}}
              </p>
            </li>
          </cube-scroll>
        </div>
      </div>
    </div>
    <div v-if="locationDetail.got === 1" class="empty-data">
      <NoData message="暂无车辆位置信息">
        <img
          slot="img"
          class="empty-data-img"
          src="../assets/icon-location-empty.png">
      </NoData>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import IconFont from '@/components/Iconfont'
import NoData from '@/components/NoData'

export default {
  name: 'pickup-track',
  metaInfo: {
    title: '车辆管理'
  },
  components: { BaiduMap, BmOverlay, BmPolyline, IconFont, NoData },
  data () {
    return {
      active: 0,
      pulled: false,
      iconMap: {
        1: 'icon-beidoudingwei',
        2: 'icon-sijidingwei',
        3: 'icon-shoujidingwei',
        4: 'icon-sijidingwei'
      }
    }
  },
  computed: {
    ...mapGetters('pickup', ['locationDetail'])
  },
  mounted() {
    document.querySelector('body').addEventListener('click', this.hideLinks, false)
    document.querySelector('body').addEventListener('touchstart', this.hideLinks, false)
  },
  methods: {
    ...mapActions('pickup', ['getPickupLocation', 'getWaybillLocation', 'clearTracks']),
    startDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationDetail.locationList[0])
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    endDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationDetail.locationList[this.locationDetail.locationList.length - 1])
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    activeDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationDetail.locationList[this.active])
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    pullSwitch () {
      this.pulled = !this.pulled
    },
    hideLinks (event) {
      if (this.pulled) {
        let elem = event.target || event.srcElement
        while (elem) {
          if (elem.id && (elem.id === 'track-list')) {
            return false
          }
          elem = elem.parentNode
        }
        setTimeout(() => {
          this.pulled = false
        }, 150)
        return false
      }
    },
    relocate (index) {
      this.pulled = false
      this.active = index
      this.$refs['track-locate'].reload()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (Number(to.query.type) === 1) {
        vm.getPickupLocation(to.params.id)
      } else if (Number(to.query.type) === 2) {
        vm.getWaybillLocation(to.params.id)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.clearTracks()
    next()
  }
}
</script>
<style lang="stylus" scoped>
.pickup-track
  height: 100%
  .map-container
    height: 100%
    width: 100%
  .empty-data
    height 100%
    .empty-data-img
      width 179px
      height 133px
  .bm-view
    height: 100%
    width: 100%
  .terminal
    position: absolute;
    width 12px
    height: 12px
    transform translateX(-6px) translateY(-7px)
    overflow: hidden;
    border-radius: 50%
    background-color: #00A4BD;
    box-shadow: 0 0 0 3px #ffffff
  .active
    width: 110px;
    height: 40px;
    position: absolute
    transform translateX(-54px) translateY(-47px)
    &:after
      content: ''
      display: block
      position: absolute
      top: 35px
      left: 45px
      width: 0
      height: 0
      border-color: #00A4BD transparent transparent transparent;
      border-style: solid;
      border-width: 5px 10px;
  .driver-label
    display: flex
    width: 110px;
    height: 35px;
    padding: 2px 4px;
    background: #00A4BD;
    overflow: hidden;
    color: #fff;
    text-align: center;
    .driver-icon
      width: 20px;
      height: 20px;
      margin-top: 6px;
      margin-right: 2px;
    .driver-text
      flex: 1
      text-align: left
      .truck-no
        text-align: center
        font-size: 14px;
        font-weight: bold
        line-height: 35px;
        letter-spacing: -1px
  .track-mask
    position: fixed
    bottom: 0
    width: 100%;
    height: 100%
    z-index 100
    &.opacity
      pointer-events none
  .track-list
    position: fixed
    bottom: 0
    width 343px
    height: 75px
    margin: 0 16px
    padding: 5px 10px
    overflow hidden
    background-color: #fff
    transition-duration 0.3s
    z-index 101
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0 0 10px 0 #cccccc
    &.pulled
      height: 550px
    .popup-switch
      text-align: center
      margin-bottom: 10px;
      i
        display: inline-block
        width 40px
        height: 8px
        vertical-align: top
        border-radius: 2px;
        background-size: 100% 100%
        &.icon-collapse
          background-image: url(../assets/iicon-collapse.png);
        &.icon-expand
          background-image: url(../assets/icon-expand.png);
    .location-item
      display: flex
      height: 40px
      .location-time
        text-align: right
        width: 40px
        color: #666666
        .date
          font-size: 14px;
          line-height: 20px
        .time
          font-size: 12px;
          line-height: 20px;
      .location-icon
        width: 30px;
        height: 30px;
        margin: 0 13px
        border-radius: 16px
        border: 1px solid #C5C8CE
        text-align: center
        line-height: 30px;
      .location-address
        flex: 1
        font-size: 13px;
        line-height: 18px;
        color: #666666
      &.strong
        .location-time
          .date
            color: #333333;
        .location-icon
          border-color: #00a4bd
        .location-address
          font-weight: bold
          font-size: 15px;
          line-height: 21px
          color: #333333
    .address-list
      height: 520px
      .location-item:not(:last-child)
        margin-bottom: 30px;
</style>
