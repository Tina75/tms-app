<template>
  <div class="page">
    <div class="scroll-list-wrap">
      <cube-scroll
        v-if="WaybillCargos && WaybillCargos.length>0"
        ref="scroll"
        :data="WaybillCargos"
      >
        <div
          v-for="item in WaybillCargos"
          :key="item.orderId"
          @click="handleItemClick(item.orderId)">
          <div class="scroll-list-item">
            <div class="scroll-list-item__title">
              {{item.startName}}
              <icon-font
                name="yzg-hebingxingzhuang6"
                :size="6"
                class="scroll-list-item__arrow"
                color="#D7D7D7" />
              {{item.endName}}
              <div>
                <span
                  v-if="item.quantity"
                  class="scroll-list-item__options">
                  {{item.quantity}}件
                </span>
                <span
                  v-if="item.volume"
                  class="scroll-list-item__options">
                  {{item.volume}}方
                </span>
                <span
                  v-if="item.weight"
                  class="scroll-list-item__options">
                  {{item.weight}}吨
                </span>
              </div>
              <span class="scroll-list-item__number">客户单号：{{item.customerOrderNo}}</span>
            </div>
            <div class="scroll-list-item__content">
              <p>发货方</p>
              <div class="content-box scroll-list-item__divider">
                <span class="item-name cube-c-black">{{item.consignerContact}}</span>
                <span class="item-address">{{item.consignerAddress}}</span>
                <a @click.stop="call(`tel:${item.consignerPhone}`)">
                  <icon-font
                    name='yzg-hebingxingzhuang2'
                    color="#189CB2"
                    :size="26" />
                </a>
              </div>
              <p>收货方</p>
              <div class="content-box">
                <span class="item-name cube-c-black">{{item.consigneeContact}}</span>
                <span class="item-address">{{item.consigneeAddress}}</span>
                <a @click.stop="call(`tel:${item.consigneePhone}`)">
                  <icon-font
                    name='yzg-hebingxingzhuang2'
                    color="#189CB2"
                    :size="26" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoData from '@/components/NoData'
import IconFont from '@/components/Iconfont'
export default {
  name: 'waybill-cargo-list',
  metaInfo: { title: '货物列表' },
  components: { NoData, IconFont },
  data () {
    return {
      billId: -1
    }
  },
  computed: {
    ...mapGetters(['WaybillCargos']),
    options () {
      return {
        pullDownRefresh: { txt: '刷新成功' },
        scrollbar: false
      }
    }
  },

  // beforeRouteEnter (to, from, next) {
  //   console.log('beforeRouteEnter')

  //   next((vm) => {

  //   })
  // },
  created () {
    this.billId = this.$route.params.billId
    this.clearWaybillCargos()
    this.getWaybillCargos(this.billId)
  },

  methods: {
    ...mapActions(['getWaybillCargos', 'clearWaybillCargos']),
    handlePullingDown () {
      this.getWaybillCargos(this.billId)
    },
    handleItemClick (id) {
      this.$router.push({ name: 'cargo-detail', params: { orderId: id } })
    },
    call (tel) {
      window.location.href = tel
    }
  }
}
</script>
<style lang='stylus' scoped>
.scroll-list
  &-item
    border-radius 5px
    overflow hidden
    margin 10px
    background white
    &__title
      padding 12px 10px 8px
      color white
      font-weight:600;
      font-size 18px
      background #189CB2
    &__arrow
      display inline-block
      margin -4px 5px 0 5px

    &__options
      font-size 14px
      display inline-block
      margin 10px 15px 7px 0
    &__number
      font-size 14px
      color #B2D5DB
    &__content
      border-top:1px dashed #189CB2;
      color #999999
      padding 3px 0 10px 10px
      p
        font-size 12px
        padding-top 8px
      .content-box
        display flex
        display -webkit-flex
        justify-content space-between
        align-items: text
        padding 10px 10px 10px 0
        .item-name
          display inline-block
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          flex-shrink 0
          margin-right 10px
          line-height 20px
        // .item-name
        .item-address
          flex-grow 1
          padding-right 20px
          word-break break-all
          line-height 20px
        .item-address:before
          content '|'
          padding-right 3px
          margin-left -5px
          color #999
    &__divider
      border-bottom 1px solid #EEEEEE
    &__info
      padding-top 10px
      padding-bottom 10px

</style>
