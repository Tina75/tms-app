<template>
  <div class="often-list-page">
    <no-data
      v-if="!loading && !oftenList.length"
      :img="NO_DATA"
      message="暂无常发订单<br />请在开单时保存为常发订单" />

    <cube-scroll
      v-else
      ref="$scroll"
      :options="options"
      @pulling-down="pullDownHandler"
      @pulling-up="fetchData">
      <ul class="order-list">
        <li
          v-for="(item, index) in oftenList"
          :key="index" class="order-list-item"
          @click="$router.push({ name: 'order-often-detail' })">
          <p class="order-company order-container">{{ item.consignerName }}</p>

          <div class="order-body order-container border-top-1px border-bottom-1px">
            <p class="order-body-cities">
              {{ item.startName }}
              <icon-font name="icon-line" size="20" />
              {{ item.endName }}
            </p>
            <ul class="order-body-info">
              <li class="order-body-info-item">猪饲料</li>
              <li class="order-body-info-item">20吨</li>
              <li class="order-body-info-item">37件</li>
            </ul>
            <p class="order-body-user">
              <span>{{ item.consigneeContact }}</span>
              <span>{{ item.consigneePhone }}</span>
            </p>
            <p class="order-body-user">
              {{ item.consigneeAddress }}
            </p>
          </div>

          <div class="order-footer order-container">
            <money-label :money="item | totalFee" />
            <span class="order-footer-settlement">{{ item.settlementType | settlementType }}</span>
            <div class="order-footer-button">
              <cube-button
                class="order-footer-button-item order-footer-button-delete"
                inline light outline
                @click.stop="orderDelete(item.id)">删除</cube-button>
              <cube-button
                class="order-footer-button-item order-footer-button-add"
                inline light outline
                @click.stop="orderAdd(item.id)">再来一单</cube-button>
            </div>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import NP from 'number-precision'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MoneyLabel from '../../components/MoneyLabel'
import NoData from '@/components/NoData'
import { SETTLEMENT_TYPE } from '../../js/constant'
import NO_DATA from '@/assets/img-no-data.png'

export default {
  name: 'order-often',
  metaInfo: { title: '常发订单' },
  components: { MoneyLabel, NoData },
  filters: {
    settlementType (type) {
      for (let i in SETTLEMENT_TYPE) {
        if (type === SETTLEMENT_TYPE[i].value) return SETTLEMENT_TYPE[i].text
      }
    },
    totalFee (order) {
      return NP.divide(
        NP.plus(
          order.freightFee || 0,
          order.loadFee || 0,
          order.unloadFee || 0,
          order.insuranceFee || 0,
          order.otherFee || 0,
          order.pickupFee || 0
        ), 100
      )
    }
  },
  data () {
    return {
      NO_DATA,
      loading: true,
      noMore: false
    }
  },
  computed: {
    ...mapGetters('order/often', [ 'pageNo', 'oftenList' ]),

    options() {
      return {
        pullDownRefresh: { txt: '刷新成功' },
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  methods: {
    ...mapMutations('order/often', [ 'SET_PAGE_NO' ]),
    ...mapActions('order/often', [ 'getOftenList', 'deleteOftenOrder' ]),

    async fetchData () {
      if (this.noMore) return
      this.loading = true
      try {
        const hasList = await this.getOftenList()
        this.noMore = !hasList
        if (!hasList && this.getOftenList.length) window.toast('没有更多数据')
      } catch (err) {
        //
      } finally {
        this.$refs.$scroll.forceUpdate()
        this.loading = false
      }
    },

    orderAdd (id) {},
    async orderDelete (id) {
      if (!confirm('确认需要删除此常发订单？')) return
      await this.deleteOftenOrder(id)
      window.toast('删除成功')
    },

    pullDownHandler () {
      this.SET_PAGE_NO(0)
      this.fetchData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
  }
}
</script>

<style lang="stylus" scoped>
  .often-list-page
    height 100%

  .order-container
    padding 0 14px
  .order-list
    padding-bottom 10px
    &-item
      margin-top 10px
      background #ffffff

  .order-company
    height 33px
    line-height 33px

  .order-footer
    height 49px
    line-height 49px

    &-settlement
      font-size 12px
      color #666666
      margin-left  10px
    &-button
      float right
      &-item
        width 70px
        height 30px
        padding 0
        margin-left 10px
        border-radius 1px
        font-size 15px
        box-shadow none
      &-delete
        color #666666
        &:after
          border-color #DCDEE2
        &:active
          background #F8F8F9
      &-add:active
        background #E2FCFC

  .order-body
    padding-top 14px
    padding-bottom 14px
    &-cities
      font-size 18px
      font-weight bold
      i
        margin 0 10px
    &-info
      margin 10px 0
      &-item
        display inline-block
        height 18px
        padding 0 4px
        margin-right 10px
        line-height 18px
        background #F8F8F9
    &-user
      font-size 12px
      color #666666
      line-height 1.5
      span
        margin-right 12px
</style>
