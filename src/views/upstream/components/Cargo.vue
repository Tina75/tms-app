<template>
  <div class="cargo-detail">
    <div class="cargo-name">
      {{data.name}}
    </div>
    <div class="cargo-info">
      <span v-if="data.weight">{{data.weight | weight}}吨</span>
      <span v-if="data.volume">{{data.volume | volume}}方</span>
      <span>{{data.packageUnit}}</span>
      <span v-if="data.num">{{data.num}}件</span>
      <span v-if="data.cost">{{data.cost | moneyFormat}}元</span>
      <span>{{data.remark1}}</span>
      <span>{{data.remark2}}</span>
    </div>
  </div>
</template>
<script>
import { getMoney, getVolume, getWeight } from '../libs'
export default {
  name: 'cargo-detail',
  filters: {
    money: getMoney,
    volume: getVolume,
    weight: getWeight
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.cargo-detail
  padding 10px
  margin-right 15px
  margin-bottom 10px
  margin-top 10px
  background #F9F9F9
.cargo-name
  font-size 15px
  color #000
  line-height 30px
.cargo-info
  font-size 12px
  color #666
  span
    margin-right 5px
</style>
