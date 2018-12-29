<template>
  <div class="receipt-list">
    <cube-scroll
      ref="contentScroll"
      :data="receiptList">
      <ul class="imgs-wrapper">
        <li
          v-for="(item, index) in receiptList"
          :key="index"
          class="receipt-item">
          <div class="cargo-info">
            <p class="cargo-stat">{{generateStat(item)}}</p>
            <p class="cargo-address">{{item.consignerAddress}}</p>
            <p class="cargo-no">客户单号：{{item.customerOrderNo || '-'}}</p>
          </div>
          <div class="receipt-info">
            <template
              v-if="!item.receipt.urls.length">
              <p
                v-if="item.receipt.hasReceipt"
                class="empty-text">
                已收到回单
              </p>
              <cube-button
                v-else
                :outline="true"
                @click="toUpload(item.orderId)">
                上传回单
              </cube-button>
            </template>
            <template v-else>
              <div class="receipt-data">
                <div class="receipt-gallery">
                  <cube-scroll
                    ref="scroll"
                    :data="item.receipt.urls"
                    direction="horizontal"
                    class="horizontal-scroll-list-wrap">
                    <ul class="list-wrapper">
                      <li
                        v-for="(img, no) in item.receipt.urls"
                        :key="no"
                        class="receipt-img"
                        @click="showImages(item.receipt.urls, no)">
                        <img :src="img | imgUrlFormat">
                      </li>
                    </ul>
                  </cube-scroll>
                </div>
                <div
                  :class="{'receipted': item.receipt.hasReceipt}"
                  class="receipt-state">
                  <p
                    v-if="item.receipt.hasReceipt">
                    已收到
                    <br>
                    回单
                  </p>
                  <p
                    v-else
                    @click="toUpload(item.orderId)">
                    修改
                    <br>
                    回单照
                  </p>
                  <icon-font
                    name="yzg-gengduo-huidanzhao"
                    :size="8"
                    color="#189CB2"
                    class="link-icon">
                  </icon-font>
                </div>
              </div>
            </template>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'receipt-list',
  metaInfo: {
    title: '上传回单'
  },
  components: { IconFont },
  data () {
    return {
      disabled: false
    }
  },
  computed: {
    ...mapGetters(['receiptList'])
  },
  methods: {
    ...mapActions(['getReceiptList']),
    generateStat (data) {
      let statList = []
      statList.push((data.quantity || 0) + '件')
      statList.push((data.weight || 0) + '吨')
      statList.push((data.volume || 0) + '方')
      return statList.join(' / ')
    },
    toUpload (orderId) {
      this.$router.push({
        name: 'receipt-detail',
        params: {
          id: orderId
        },
        query: {
          billId: this.$route.params.id
        }
      })
    },
    showImages (imgs, index) {
      this.$router.push({ name: 'image-preview', params: { imgs: imgs, index: index } })

      // const params = {
      //   $props: {
      //     imgs: imgs.map(item => this.imgHost + item),
      //     initialIndex: index,
      //     loop: false
      //   }
      // }
      // this.$createImagePreview({ ...params }).show()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from && (from.name !== 'image-preview')) {
        vm.getReceiptList(to.params.id)
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
  .receipt-list
    height: 100%;
    background-color: #F3F3F3
    .cube-scroll-wrapper
      height: 100%
      .receipt-item
        background-color: #ffffff
        margin-bottom: 10px;
        .cargo-info
          margin-left: 15px;
          padding: 14px 12px 12px 0
          border-bottom: 1px solid #E5E5E5;
          .cargo-stat
            font-size: 15px;
            color: #666666;
            line-height: 20px;
            margin-bottom: 8px;
          .cargo-address
            font-size: 16px;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
            margin-bottom: 6px;
          .cargo-no
            font-size: 12px;
            color: #999999;
            line-height: 17px;
        .receipt-info
          padding: 8px 15px 13px
          .empty-text
            font-size: 12px;
            color: #C0C1C1;
            line-height: 17px;
          .cube-btn
            display: block
            margin: 0 auto;
            padding: 0
            width: 145px;
            height: 40px;
            border-radius: 3px;
            border: 1px solid $color-orange
            font-size:15px;
            font-weight: bold
            line-height: 20px;
            color: $color-orange
            &:after
              display: none
          .receipt-data
            height: 60px;
            .receipt-gallery
              display: inline-block
              vertical-align: middle
              width: 290px;
              .horizontal-scroll-list-wrap
                .cube-scroll-content
                  display: inline-block
                .list-wrapper
                  white-space: nowrap
                .receipt-img
                  display: inline-block
                  margin-right: 10px;
                  img
                    width: 63px;
                    height 60px
            .receipt-state
              display: inline-block
              position: relative
              height: 60px
              width 42px
              padding: 15px 0 15px 5px;
              vertical-align: middle
              border-left: 1px dashed $color-orange;
              text-align: center
              color: $color-orange;
              font-size: 12px;
              line-height:17px;
              &.receipted
                border-color: #B3B4B4;
                color: #C0C1C1;
              i
                position: absolute
                left: 48px;
                top: 23px
</style>
