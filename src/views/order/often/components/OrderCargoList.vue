<template>
  <detail-panel :title="'货物明细'">
    <ul class="cargo-list">
      <li
        v-for="cargo in cargoList"
        :key="cargo.id" class="cargo-item">
        <p class="cargo-title">{{ cargo.cargoName }} {{ `(${cargo.cargoNo})` }}</p>
        <p class="cargo-content">{{ cargo | cargoDetail }}</p>
      </li>
    </ul>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'
import NP from 'number-precision'

export default {
  name: 'pickupInfo',
  components: { detailPanel },
  filters: {
    cargoDetail (cargo) {
      const details = []
      if (cargo.weight) details.push(cargo.weight + '吨')
      if (cargo.volume) details.push(cargo.volume + '方')
      if (cargo.quantity) details.push(cargo.quantity + '件')
      if (cargo.unit) details.push(cargo.unit)
      if (cargo.cargoCost) details.push(NP.divide(cargo.cargoCost, 100) + '元')
      if (cargo.remark1) details.push(cargo.remark1)
      if (cargo.remark2) details.push(cargo.remark2)
      return details.join(' ')
    }
  },
  computed: {
    ...mapGetters('order/often', [ 'detail' ]),
    cargoList () {
      return this.detail.orderCargoTemplateList
    }
  }
}
</script>
<style scoped lang="stylus">
  .cargo-list
    padding: 15px 15px 0 0
    .cargo-item
      margin-bottom: 15px;
      padding: 17px 10px
      background-color: #F9F9F9
      .cargo-title
        color: #000000;
        font-size: 15px;
        margin-bottom: 5px;
      .cargo-content
        color: #666666
        font-size: 12px;
        line-height: 18px;
</style>
