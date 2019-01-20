<template>
  <div class="often-list-page">
    <infinite-list
      v-model="loading"
      :has-data="oftenList.list.length"
      :loader="loadOftenList"
      :has-next="oftenList.hasNext"
    >
      <ul v-if="oftenList.list.length" class="order-list">
        <li
          v-for="(item, index) in oftenList.list"
          :key="index"
          class="order-list-item"
          @click="$router.push({ name: 'order-often-detail', params: { orderId: item.id } })">
          <p class="order-company order-container">{{ item.consignerName }}</p>

          <div class="order-body order-container border-top-1px border-bottom-1px">
            <p class="order-body-cities">
              <span>{{ item.startName || item.consignerAddress }}</span>
              <icon-font name="icon-line" size="20" />
              <span>{{ item.endName || item.consigneeAddress }}</span>
            </p>
            <ul class="order-body-info">
              <li class="order-body-info-item">{{ item.cargoNames }}</li>
              <li v-if="item.weight" class="order-body-info-item">{{ item.weight }}吨</li>
              <li v-if="item.volume" class="order-body-info-item">{{ item.volume }}方</li>
              <li v-if="item.quantity" class="order-body-info-item">{{ item.quantity }}件</li>
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
            <div class="order-footer-info">
              <p class="info-settlement">{{ item.settlementType | settlementType }}</p>
              <p class="info-money">{{ item | totalFee }}<span>/元</span></p>
            </div>
            <div class="order-footer-button">
              <cube-button
                v-if="oftenPermission.indexOf(100402) > -1"
                class="order-footer-button-item order-footer-button-delete"
                inline light outline
                @click.stop="orderDelete(item.id)">删除</cube-button>
              <cube-button
                v-if="oftenPermission.indexOf(100401) > -1"
                class="order-footer-button-item order-footer-button-add"
                inline light outline
                @click.stop="orderAdd(item.id)">再来一单</cube-button>
            </div>
          </div>
        </li>
      </ul>

      <template slot="empty">
        <no-data
          :img="NO_DATA"
          message="暂无常发订单<br />请在开单时保存为常发订单" />
      </template>

    </infinite-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import NO_DATA from '@/assets/img-no-data.png'
import { settlementType, totalFee } from '../../js/filters'

export default {
  name: 'order-often',
  metaInfo: { title: '常发订单' },
  components: { NoData, InfiniteList },
  filters: { settlementType, totalFee },
  data () {
    return {
      NO_DATA,
      loading: false
    }
  },
  computed: {
    ...mapState('order/often', [ 'oftenList' ]),
    ...mapState('order/create', [ 'oftenPermission' ])
  },
  methods: {
    ...mapMutations('order/create', [ 'SET_ORDER_RESET' ]),
    ...mapActions('order/often', [ 'loadOftenList', 'deleteOftenOrder' ]),

    onPageRefresh() { this.loading = true },

    orderAdd (id) {
      this.SET_ORDER_RESET(true)
      this.$router.push({
        name: 'order-one-more',
        params: { id }
      })
    },

    async orderDelete (id) {
      if (!confirm('确认需要删除此常发订单？')) return
      await this.deleteOftenOrder(id)
      window.toast('删除成功')
    }
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
    display flex
    align-items center
    height 59px

    &-info
      flex 1
      .info-settlement
        margin-bottom 5px
        font-size 12px
        color #333333
      .info-money
        font-size 20px
        color #FA8C15
        span
          font-size 14px
    &-button
      flex none
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
      display flex
      font-size 18px
      font-weight bold
      i
        flex none
        width 40px
        text-align center
      span
        flex none
        max-width calc(50% - 20px)
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        font-size 18px
        font-weight bold
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
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      span
        margin-right 12px
</style>
