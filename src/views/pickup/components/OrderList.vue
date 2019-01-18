<template>
  <detail-panel :title="'货物明细'">
    <a slot="title-btn">编辑</a>
    <div class="order-list">
      <ul>
        <li class="order-item">
          <div class="order-no">
            <span>D9384834783748374</span>
            <a>复制</a>
          </div>
          <ul>
            <li class="cargo-item">
              <p class="cargo-title">可口可乐</p>
              <p class="cargo-content">2吨 2方 桶装 2件 1000元 小心轻放 这个东西比较贵装卸货的 时候轻拿轻放</p>
            </li>
            <li class="cargo-item">
              <p class="cargo-title">可口可乐</p>
              <p class="cargo-content">2吨 2方 桶装 2件 1000元 小心轻放 这个东西比较贵装卸货的 时候轻拿轻放</p>
            </li>
          </ul>
        </li>
        <li class="order-item">
          <div class="order-no">
            <span>D9384834783748374</span>
            <a>复制</a>
          </div>
          <ul>
            <li class="cargo-item">
              <p class="cargo-title">可口可乐</p>
              <p class="cargo-content">2吨 2方 桶装 2件 1000元 小心轻放 这个东西比较贵装卸货的 时候轻拿轻放</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </detail-panel>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import detailPanel from '@/components/DetailPanel'

export default {
  name: 'order-list',
  components: { detailPanel },
  computed: {
    // ...mapGetters(['BePickingData']),
    options () {
      return {
        pullDownRefresh: true,
        pullUpLoad: true,
        scrollbar: true
      }
    }
  },
  methods: {
    // ...mapActions(['getBePicking']),
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
