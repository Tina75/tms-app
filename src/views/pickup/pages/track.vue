<template>
  <div class="pickup-track">
    <baidu-map class="bm-view" :center="locationList[0]" :zoom="5" ak="EkPR9YNO4Ez9LW301kyTGCyTfQ5cweIz">
      <bm-overlay
        pane="markerPane"
        :class="{terminal: true}"
        @draw="startDraw"/>
      <bm-overlay
        pane="markerPane"
        :class="{terminal: true}"
        @draw="endDraw"/>
      <bm-polyline :path="locationList" stroke-color="#00a4bd" :stroke-opacity="0.5" :stroke-weight="2"/>
      <bm-overlay
        pane="labelPane"
        :class="{active: true}"
        @draw="activeDraw">
        <div class="driver-label">
          <div class="driver-icon">
            <icon-font
              :name="'icon-driverr'"
              :size="20"
              color="#ffffff"/>
          </div>
          <div class="driver-text">
            <p class="truck-no">苏AD88DAD</p>
            <p class="driver-name">秦天师</p>
          </div>
        </div>
      </bm-overlay>
    </baidu-map>
    <div class="track-mask" :class="{'opacity': !pulled}"/>
    <div id="track-list" class="track-list" :class="{'pulled': pulled}">
      <div class="popup-switch">
        <i :class="pulled ? 'icon-collapse' : 'icon-expand'" @click="pullSwitch"/>
      </div>
      <div v-show="!pulled" class="location-item">
        <div class="location-time strong">
          <p class="date">{{addressList[0].date}}</p>
          <p class="time">{{addressList[0].time}}</p>
        </div>
        <p class="location-icon strong">
          <icon-font
            :name="iconMap[addressList[0].positionType]"
            :size="25"
            color="#00A4BD"/>
        </p>
        <p class="location-address strong">{{addressList[0].address}}</p>
      </div>
      <div v-if="pulled" class="address-list">
        <cube-scroll
          ref="scroll"
          :data="addressList">
          <li v-for="(item, index) in addressList" :key="index" class="location-item">
            <div class="location-time" :class="{'strong': item.id === active}">
              <p class="date">{{item.date}}</p>
              <p class="time">{{item.time}}</p>
            </div>
            <p class="location-icon" :class="{'strong': item.id === active}">
              <icon-font
                :name="iconMap[item.positionType]"
                :size="20"
                :color="item.id === active ? '#00A4BD' : '#C5C8CE'"/>
            </p>
            <p class="location-address" :class="{'strong': item.id === active}">
              {{item.address}}
            </p>
          </li>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import IconFont from '@/components/Iconfont'

export default {
  name: 'pickup-track',
  metaInfo: {
    title: '车辆管理'
  },
  components: { BaiduMap, BmOverlay, BmPolyline, IconFont },
  data () {
    return {
      active: 1,
      pulled: false,
      locationList: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 38.915 },
        { lng: 116.406, lat: 37.915 },
        { lng: 116.407, lat: 36.915 },
        { lng: 116.408, lat: 35.915 },
        { lng: 116.409, lat: 34.915 },
        { lng: 116.410, lat: 33.915 },
        { lng: 116.411, lat: 32.915 }
      ],
      addressList: [
        { id: 1, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 1 },
        { id: 2, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 2 },
        { id: 3, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 3 },
        { id: 4, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 1 },
        { id: 5, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 2 },
        { id: 6, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 3 },
        { id: 7, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 1 },
        { id: 8, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 2 },
        { id: 9, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 3 },
        { id: 10, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 1 },
        { id: 11, date: '01-13', time: '14:00', address: '江苏省南京市秦淮区通服大厦海底 捞火锅', positionType: 2 }
      ],
      iconMap: {
        1: 'icon-beidoudingwei',
        2: 'icon-sijidingwei',
        3: 'icon-shoujidingwei'
      }
    }
  },
  computed: {
    // ...mapGetters(['News'])
  },
  mounted() {
    document.querySelector('body').addEventListener('click', this.hideLinks, false)
    document.querySelector('body').addEventListener('touchstart', this.hideLinks, false)
  },
  methods: {
    startDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationList[0])
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    endDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationList[this.locationList.length - 1])
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    activeDraw ({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(this.locationList[0])
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.pickup-track
  height: 100%
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
    padding: 2px 5px;
    background: #00A4BD;
    overflow: hidden;
    color: #fff;
    text-align: center;
    .driver-icon
      width: 20px;
      height: 20px;
      margin-top: 6px;
      margin-right: 5px;
    .driver-text
      flex: 1
      text-align: left
      .truck-no
        font-size: 14px;
        font-weight: bold
        line-height: 18px;
        letter-spacing: -1px
      .driver-name
        font-size: 10px;
        line-height: 14px;
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
        &.strong
          .date
            color: #333333;
      .location-icon
        width: 30px;
        height: 30px;
        margin: 0 13px
        border-radius: 16px
        border: 1px solid #C5C8CE
        text-align: center
        line-height: 30px;
        &.strong
          border-color: #00a4bd;
      .location-address
        flex: 1
        font-size: 13px;
        line-height: 18px;
        color: #666666
        &.strong
          font-weight: bold
          font-size: 15px;
          line-height: 21px
          color: #333333
    .address-list
      height: 520px
      .location-item:not(:last-child)
        margin-bottom: 30px;
</style>
