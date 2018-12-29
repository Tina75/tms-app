<template>
  <header>
    <section class="header-status">
      <div class="header-status-content">
        <p class="header-status-content-title">
          <Iconfont
            :name="statusInfo.icon"
            size="20" />
          {{ statusInfo.title }}
        </p>
        <p class="header-status-content-tip">{{ statusInfo.tip }}</p>
      </div>
      <router-link
        v-if="statusInfo.upload"
        class="header-status-upload"
        :to="uploadRoute">
        <img src="../assets/upload-car-state.png">
      </router-link>
    </section>

    <ul class="header-info card">
      <li class="header-info-item">
        <p class="header-info-item-data">
          <span>{{ data.quantity || '-' }}</span>件
        </p>
        <p class="header-info-item-title">货物总数</p>
      </li>
      <li class="header-info-item">
        <p class="header-info-item-data">
          <span>{{ data.volume || '-' }}</span>方
        </p>
        <p class="header-info-item-title">货物总体积</p>
      </li>
      <li class="header-info-item">
        <p class="header-info-item-data">
          <span>{{ data.weight || '-' }}</span>吨
        </p>
        <p class="header-info-item-title">货物总重量</p>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'DetailHeader',
  props: {
    billInfo: { type: Object, required: true }, // { billType, billId }
    status: { type: Object, required: true }, // { title, tip, icon, upload }
    data: { type: Object, required: true } // { quantity, weight, volume }
  },
  computed: {
    statusInfo () { return this.status },
    uploadRoute () {
      return {
        name: 'condition-upload',
        params: { id: this.billInfo.billId },
        query: { type: this.billInfo.billType }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/detail.styl';

  .header-status
    display flex
    width 375px
    height 151px
    background linear-gradient(348deg, rgba(38,139,149,1) 0%, rgba(24,156,178,1) 100%)

    &-content
      flex 1
      margin 18px 0 0 17px
      color #ffffff

      &-title
        font-size 20px
        font-weight 600
        line-height 28px

        i
          vertical-align top

      &-tip
        margin-top 8px
        line-height 18px
        opacity .56

    &-upload
      flex none
      display block
      width 63px
      height 54px
      margin 22px 14px 0

      img
        width 100%

  .header-info
    display flex
    height 94px
    margin-top -56px
    box-shadow 0px 2px 4px 0px rgba(228,228,228,1)

    &-item
      flex none
      width 33.333333%
      display flex
      flex-direction column
      justify-content center
      align-items center
      border-right 1px solid #d4d4d4
      font-size 13px

      &:last-child
        border-style none

      &-data
        line-height 30px
        color #333333
        font-weight bold
        margin-bottom 5px

        span
          font-size 22px
          font-weight bold

      &-title
        line-height 18px
        color #999999

</style>
