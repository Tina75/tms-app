<template>
  <detail-panel :title="'货物明细'">
    <ul class="cargo-list">
      <li class="cargo-item">
        <p class="cargo-title">可口可乐</p>
        <p class="cargo-content">2吨 2方 桶装 2件 1000元 小心轻放 这个东西比较贵装卸货的 时候轻拿轻放</p>
      </li>
    </ul>
  </detail-panel>
</template>

<script>
import detailPanel from '@/components/DetailPanel'

export default {
  name: 'pickupInfo',
  components: { detailPanel }
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
