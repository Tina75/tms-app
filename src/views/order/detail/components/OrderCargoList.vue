<template>
  <detail-panel :title="'货物明细'">
    <div class="order-list">
      <ul>
        <li v-for="item in CargoList" :key="item.id" class="order-item">
          <ul>
            <li class="cargo-item">
              <p class="cargo-title">{{item.cargoName}} <span v-if="item.cargoNo">({{item.cargoNo}})</span> </p>
              <p class="cargo-content">
                <span v-if="item.weight">{{item.weight}}吨&nbsp;</span>
                <span v-if="item.volume">{{item.volume}}方&nbsp;</span>
                <span v-if="item.unit">{{item.unit}}&nbsp;</span>
                <span v-if="item.quantity">{{item.quantity}}件&nbsp;</span>
                <span v-if="item.cargoCost">{{item.cargoCost|moneyFormat}}元&nbsp;</span>
                <span v-if="item.remark1">{{item.remark1}}&nbsp;</span>
                <span v-if="item.remark2">{{item.remark2}}</span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </detail-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import detailPanel from '@/components/DetailPanel'

export default {
  name: 'order-cargo-list',
  components: { detailPanel },
  computed: {
    ...mapGetters('order/detail', ['CargoList'])
  }
}
</script>
<style scoped lang="stylus">
  .order-list
    padding: 15px 15px 0 0
    .order-item
      margin-bottom: 15px;
      padding: 15px 10px 0
      background-color: #F9F9F9
      .order-no
        display: flex
        justify-content space-between
        span
          color: #666666
          font-size: 15px;
        a
          color: #00A4BD;
          font-size: 15px;
      .cargo-item
        padding: 0px 0 10px
        &:not(:last-child)
          border-bottom 1px dashed #C8C8C8
        .cargo-title
          color: #000000;
          font-size: 15px;
          margin-bottom: 5px;
        .cargo-content
          color: #666666
          font-size: 12px;
          line-height: 18px;
</style>
