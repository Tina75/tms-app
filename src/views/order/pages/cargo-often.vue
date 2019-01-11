<template>
  <cube-scroll class="scroll-box">
    <ul class="list">
      <li class="list-item" @click="chooseCargo">
        <div class="item-icon">
          <icon-font name="icon-ico_thing" size="20" color="#ffffff" />
        </div>

        <div class="item-info border-bottom-1px">
          <p class="item-info-title">这里是货物名称</p>
          <p class="item-info-data">
            <span>9吨</span>
            <span>9方</span>
            <span>箱装</span>
          </p>
        </div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  metaInfo: { title: '选择常发货物' },
  methods: {
    ...mapMutations('order', [ 'SET_CARGO_OFTEN' ]),

    chooseCargo () {
      this.SET_CARGO_OFTEN({
        cargoName: '货物名',
        weight: 111,
        volumn: 222,
        cost: 333,
        package: '箱',
        count: 321,
        size: 123,
        number: 66,
        remark1: 'test',
        remark2: new Date().toString()
      })
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../style/list.styl';

  .item-info-data span
    margin-right 15px
</style>
