<template>
  <detail-panel :title="'货物明细'">
    <a slot="title-btn" class="cargo-edit" @click="toEditOrders">编辑</a>
    <div class="order-list">
      <ul>
        <li v-for="(item, index) in pickupCargoDetail" :key="index" class="order-item">
          <div class="order-no">
            <span>{{item.orderNo}}</span>
            <a v-clipboard:copy="item.orderNo" v-clipboard:success="onNoCopy">复制</a>
          </div>
          <ul>
            <li v-for="(el, no) in item.cargoList" :key="no" class="cargo-item">
              <p class="cargo-title">{{el.cargoName}}</p>
              <p class="cargo-content">
                <span v-if="el.weight">{{el.weight}}吨 </span>
                <span v-if="el.volume">{{el.volume}}方 </span>
                <span v-if="el.quantity">{{el.quantity}}件 </span>
                <span v-if="el.cargoCost">{{el.cargoCost}}吨 </span>
                <span v-if="el.remark1">{{el.remark1}}吨 </span>
                <span v-if="el.remark2">{{el.remark2}}吨 </span>
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
  name: 'order-list',
  components: { detailPanel },
  computed: {
    ...mapGetters('pickup', ['pickupDetail', 'pickupCargoDetail'])
  },
  methods: {
    onNoCopy () {
      window.toast('复制成功')
    },
    toEditOrders () {
      this.$router.push({
        name: 'pickup-order-list',
        params: {
          id: this.pickupDetail.pickUpId
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .cargo-edit
    float: right
    padding-right: 25px;
    color: #00A4BD;
    font-size: 15px;
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
        padding: 15px 0 10px
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
