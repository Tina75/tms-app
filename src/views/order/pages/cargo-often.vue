<template>
  <cube-scroll class="scroll-box">
    <ul class="list">
      <li class="list-item">
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

      <li class="list-item">
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
export default {
  metaInfo: { title: '选择常发货物' }
}
</script>

<style lang="stylus" scoped>
  @import '../style/list.styl';

  .item-info-data span
    margin-right 15px
</style>
