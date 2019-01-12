<template>
  <div class="driver">
    <cube-index-list
      ref="indexList"
      :data="driverList"
      :options="options"
      class="driver_list"
      @pulling-down="onPullingDown">
      <cube-index-list-group
        v-for="(group, index) in driverList"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem(index)">
          <div class="driver_item border-bottom-1px">
            <div class="driver_item_img">
              {{item.name.slice(0,1)}}
            </div>
            <div class="driver_item_info">
              <div class="info_detail">
                <div class="name">{{item.name}}</div>
                <div class="phone">{{item.phone}}</div>
              </div>
              <div class="info_phone">
                <IconFont
                  name="icon-ico_call"
                  size="32"
                  color="#00A4BD"
                  @click="callPhone(item.phone)"
                />
              </div>
            </div>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
      <NoData
        v-if="driverList.length <= 0"
        message="老板，您还没有记录熟车司机信息赶快新增一个，方便联系哦～"
        action="新增熟车司机"
        @btn-click="btnClick">
        <img
          slot="img"
          src="../assets/driver-nodata.png"
          class="driver_nodata"
        >
      </NoData>
    </cube-index-list>
  </div>
</template>
<script>
import IconFont from '@/components/Iconfont'
import { mapGetters } from 'vuex'
import NoData from '@/components/NoData'
const moudleName = 'contacts/driver'
export default {
  name: 'driver',
  metaInfo: {
    title: '熟车司机'
  },
  components: { IconFont, NoData },
  data () {
    return {
      options: {
        pullDownRefresh: {
          threshold: 30,
          txt: '更新成功'
        }
      }
    }
  },
  computed: {
    ...mapGetters(moudleName, ['driverList'])
  },
  methods: {
    selectItem (idx) {
      console.log(idx)
      this.$router.push({
        name: 'contacts-driver-detail',
        params: {
          id: idx
        }
      })
    },
    callPhone (phone) {
      window.location.href = `tel:${phone}`
    },
    btnClick () {

    },
    onPullingDown () {
      setTimeout(() => {
        console.log(1)
        this.$refs.indexList.forceUpdate()
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.driver
  height 100%
  background-color #EFEFEF
  &_nodata
    width 182px
  &_list
    height 100%
  .border-bottom-1px:after
    left 70px
  &_item
    width 100%
    height 60px
    padding 10px 15px
    display flex
    box-sizing border-box
    align-items center
    &_img
      width 40px
      height 40px
      border-radius 50%
      line-height 40px
      text-align center
      font-size 17px
      color #ffffff
      background-color #E4E7EC
    &_info
      flex 1
      margin-left 15px
      display flex
      justify-content space-between
      padding 10px 0px
      padding-right 10px
      .info_detail
        font-size 17px
        color #333333
        font-weight 400
        line-height 18px
        .name
          color #333333
          font-weight 400
        .phone
          color #999999
          margin-top 8px
          font-size 14px
          line-height 14px
      .info_phone
        // margin-left 150px
  >>>.cube-index-list-nav
    top 20%
    right -10px
  >>>.cube-index-list-nav > ul > li
    margin-top 10px
</style>
