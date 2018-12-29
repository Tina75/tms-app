<template>
  <div class="page">
    <div class="scroll-list-wrap">
      <cube-scroll
        v-if="LoadbillCargos && LoadbillCargos.length"
        ref="scroll"
        :data="LoadbillCargos"
      >
        <ul>
          <li
            v-for="item in LoadbillCargos"
            :key="item.id"
            class="list-item">
            <p class="list-item__name">{{item.consignerContact}}</p>
            <div class="list-item__concat">
              <p class="cube-pr-20">{{item.consignerAddress}}</p>
              <a @click.stop="call(`tel:${item.consignerPhone}`)">
                <icon-font
                  name=" yzg-hebingxingzhuang2"
                  color="#189CB2"
                  :size="26">
                </icon-font>
              </a>
            </div>
            <span
              v-if="item.weight"
              class="cube-mr-10 cube-c-grey">
              {{item.weight}}吨
            </span>
            <span
              v-if="item.quantity"
              class="cube-mr-10 cube-c-grey">
              {{item.quantity}}件
            </span>
            <span
              v-if="item.volume"
              class="cube-c-grey">
              {{item.volume}}方
            </span>
          </li>
        </ul>
      </cube-scroll>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import NoData from '@/components/NoData'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'loadbill-cargo-list',
  metaInfo: { title: '提货信息' },
  components: { IconFont, NoData },
  data () {
    return {
      billId: -1
    }
  },
  computed: {
    ...mapGetters(['LoadbillCargos'])
  },

  // beforeRouteEnter (to, from, next) {
  //   next((vm) => {

  //   })
  // },
  created () {
    this.billId = this.$route.params.billId
    this.clearLoadbillCargos()
    this.getLoadbillCargos(this.billId)
  },

  methods: {
    ...mapActions(['getLoadbillCargos', 'clearLoadbillCargos']),
    pullDownRefresh () {
      this.getLoadbillCargos(this.billId)
    },
    call (tel) {
      window.location.href = tel
    }
  }
}

</script>
<style lang='stylus' scoped>
.page
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  .scroll-list-wrap
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .list-item
      display block
      background white
      padding 12px 15px
      margin-bottom 10px
      &__name
        font-size 18px
        color $color-dark-grey
        font-weight bold
      &__concat
        font-size 15px
        color $color-light-grey
        padding 5px 0
        margin-bottom  4px
        display flex
        display -webkit-flex
        align-items: center
        justify-content space-between
</style>
