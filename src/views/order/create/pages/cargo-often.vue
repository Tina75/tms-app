<template>
  <no-data
    v-if="!loading && !cargoList.length"
    :img="NO_DATA"
    message="暂无常发货物" />
  <cube-scroll v-else ref="$scroll">
    <ul class="list">
      <li
        v-for="item in cargoList" :key="item.id"
        class="list-item"
        @click="pickCargo(item)">
        <div class="item-icon">
          <icon-font name="icon-ico_thing" size="20" color="#ffffff" />
        </div>

        <div class="item-info border-bottom-1px">
          <p class="item-info-title">{{ item.cargoName }}</p>
          <p class="item-info-data">
            <span v-if="item.weight">{{ item.weight }}吨</span>
            <span v-if="item.volume">{{ item.volume }}方</span>
            <span v-if="item.unit">{{ item.unit }}</span>
          </p>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NoData from '@/components/NoData'
import NO_DATA from '@/assets/img-no-data.png'
import NP from 'number-precision'
import { MODULE_NAME } from '../../js/constant'

export default {
  name: 'cargo-often',
  metaInfo: { title: '选择常发货物' },
  components: { NoData },
  data () {
    return {
      NO_DATA,
      loading: false,
      cargoList: []
    }
  },
  computed: mapGetters(MODULE_NAME.ORDER_CREATE, [ 'consignerId' ]),
  methods: {
    ...mapMutations(MODULE_NAME.ORDER_CREATE, [ 'SET_CARGO_OFTEN' ]),
    ...mapActions(MODULE_NAME.ORDER_CREATE, [ 'getOftenCargo' ]),

    pickCargo (item) {
      const cargo = Object.assign({}, item)
      cargo.fromOften = true // 标记是否来自选择的货物
      cargo.cargoCost = NP.divide(cargo.cargoCost || 0, 100)
      cargo.quantity = 1
      cargo.size = !item.dimension.length && !item.dimension.width && !item.dimension.height
        ? ''
        : [ item.dimension.length || '-', item.dimension.width || '-', item.dimension.height || '-' ].join('x')
      this.SET_CARGO_OFTEN(cargo)
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.cargoList = []
      if (!vm.consignerId) return
      vm.loading = true
      window.loading(true)
      try {
        vm.cargoList = await vm.getOftenCargo(vm.consignerId)
        this.$nextTick(() => { this.$refs.$scroll.refresh() })
      } catch (err) {
        //
      } finally {
        vm.loading = false
        window.loading(false)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../style/list.styl';

  .item-info-data span
    margin-right 15px
</style>
