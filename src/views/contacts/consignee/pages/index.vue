<template>
  <div class="consignee">
    <cube-index-list
      ref="indexList"
      :data="consigneeList"
      :options="options"
      class="consignee_list"
      @pulling-down="onPullingDown">
      <cube-index-list-group
        v-for="(group, index) in consigneeList"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem(index)">
          <div class="consignee_item border-bottom-1px">
            <div class="consignee_item_img">
              {{item.name.slice(0,1)}}
            </div>
            <div class="consignee_item_info">
              <div>
                <div class="info_top">
                  <span>{{item.name}}</span>
                  <span>{{item.phone}}</span>
                </div>
                <div class="info_bottom cube-ellipsis">
                  {{item.address}}
                </div>
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
        v-if="consigneeList.length <= 0 && !loading"
        message="老板，您还没有记录收货方信息赶快新增一个，方便联系哦～"
        action="新增收货方"
        @btn-click="btnClick">
        <img
          slot="img"
          src="@/assets/contacts/consigness_nodata.png"
          class="consignee_nodata"
        >
      </NoData>
    </cube-index-list>
  </div>
</template>
<script>
import IconFont from '@/components/Iconfont'
import { mapGetters } from 'vuex'
import NoData from '@/components/NoData'
const moudleName = 'contacts/consignee'
export default {
  name: 'Consignee',
  metaInfo: {
    title: '收货方'
  },
  components: { IconFont, NoData },
  data () {
    return {
      options: {
        pullDownRefresh: {
          threshold: 30,
          txt: '更新成功'
        }
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['consigneeList'])
  },
  methods: {
    onPageRefresh() {
      this.startHackLoading()
    },
    selectItem (idx) {
      console.log(idx)
      this.$router.push({
        name: 'contacts-consignee-detail'
      })
    },
    callPhone (phone) {
      window.location.href = `tel:${phone}`
    },
    btnClick () {
      this.$router.push({
        name: 'contacts-consignee-form',
        params: {
          type: 'add'
        }
      })
    },
    onPullingDown () {
      setTimeout(() => {
        console.log(1)
        this.$refs.indexList.forceUpdate()
      }, 1000)
    },
    startHackLoading() {
      this.loading = true
      setTimeout(() => {
        const scroll = this.$refs.indexList
        scroll.scrollTo(0, 60)
        scroll._pullDownHandle()
        scroll._pullDownScrollHandle({ y: 60 })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.consignee
  height 100%
  background-color #EFEFEF
  &_nodata
    width 185px
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
      margin-left 15px
      display flex
      padding 10px 0px
      .info_top
        font-size 17px
        color #333333
        font-weight 400
        line-height 18px
        span
          margin-right 11px
      .info_bottom
        margin-top 8px
        font-size 14px
        max-width 224px
        color #999999
        line-height 14px
      .info_phone
        margin-left 21px
  >>>.cube-index-list-nav
    top 20%
    right -5px
  >>>.cube-index-list-nav > ul > li
    margin-top 10px
</style>
