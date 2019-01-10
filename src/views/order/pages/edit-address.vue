<template>
  <cube-scroll class="scroll-box">
    <div class="edit-address-box">
      <form class="border-bottom-1px">
        <form-item clearable align="left" placeholder="请输入详细地址" />
        <form-item clearable align="left" placeholder="补充地址(楼号-门牌号等)" />
      </form>

      <p class="address-list-title">常用地址</p>

      <ul class="list">
        <li class="list-item">
          <div class="item-icon">
            <icon-font name="icon-ico_location" size="20" color="#ffffff" />
          </div>

          <div class="item-info border-bottom-1px">
            <p class="item-info-title">江苏省南京市秦淮区</p>
            <p class="item-info-data">
              江苏省南京市秦淮区江苏省南京市秦淮区江苏省南京市秦淮区
            </p>
          </div>
        </li>
        <li class="list-item">
          <div class="item-icon">
            <icon-font name="icon-ico_location" size="20" color="#ffffff" />
          </div>

          <div class="item-info">
            <p class="item-info-title">江苏省南京市秦淮区</p>
            <p class="item-info-data">
              江苏省南京市秦淮区江苏省南京市秦淮区江苏省南京市秦淮区
            </p>
          </div>
        </li>
      </ul>

      <cube-button>确定</cube-button>
    </div>
  </cube-scroll>
</template>

<script>
export default {
  metaInfo: { title: '详细地址' },
  data () {
    test: ''
  }
}
</script>

<style lang="stylus">
  .edit-address-box
    .form-item:after
      border-style none
</style>

<style lang="stylus" scoped>
  @import '../style/list.styl';

  .edit-address-box
    margin-top 10px
    background #ffffff

  .address-list-title
    padding 0 15px
    line-height 52px
    color #666666
</style>
