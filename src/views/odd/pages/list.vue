<template>
  <div class="page">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="OddList"
        :options="{scrollBar:true,pullDownRefresh:{txt:'刷新成功'}}"
        @pulling-down="onPullingDown">
        <ul>
          <li
            v-for="item in OddList"
            :key="item.createTime"
            class="list-item">
            <p class="cube-c-green">{{item.exceptionPlotDesc}} - {{item.exceptionTypeDesc}}</p>
            <div class="cube-c-light-grey cube-mt-5 cube-font-12">{{item.createTime | datetime}}</div>
            <p class="cube-mt-10 cube-mb-5 cube-pr-10 cube-c-dark-grey normal-text">{{item.exceptionDesc}}</p>
            <div
              v-if="item.handleResult===20"
              class="list-item__tri">
            </div>
            <div
              v-if="item.handleResult===20"
              class="list-item__res normal-text">
              <p class="list-item__desc">已处理：{{item.handleDesc}}</p>
              <span class="cube-c-light-grey cube-font-12">{{item.handleTime | datetime}}</span>
            </div>
            <img
              v-for="(url,index) in item.exceptionPhotos"
              :key="index"
              class="list-item__img"
              :src="url | imgUrlFormat"
              alt="图片加载失败"
              @click="showImagePreview(item.exceptionPhotos,index)" />
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'odd-list',
  metaInfo: { title: '异常记录' },
  data () {
    return {
      initialIndex: 0
    }
  },

  computed: {
    ...mapGetters(['OddList'])
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearOddList()
      vm.getOddList({ billId: to.params.id, billType: to.query.type })
    })
  },

  methods: {
    ...mapActions(['getOddList', 'clearOddList']),
    onPullingDown () {
      this.getOddList({ billId: this.$route.params.id, billType: this.$route.query.type })
    },
    showImagePreview (imgs, index = 0) {
      this.$router.push({ name: 'image-preview', params: { imgs: imgs, index: index } })
    }
  }
}

</script>
<style lang='stylus' scoped>
.page
    background: #efeff4
  .list-item
    padding 10px 0 10px 10px
    margin-bottom 10px
    font-size 15px
    background white
    &__res
      padding 10px
      background #f5f5f5
      margin-bottom 15px
      margin-right 10px
      border-radius 4px
      color #606060
    &__tri
      width:0;
      height:0;
      border-width:0 7px 8px;
      margin-left 25px
      border-style:solid;
      border-color:transparent transparent #f5f5f5;/*透明 透明  灰*/
    &__desc
      padding-bottom 5px
      font-size 14px
    &__img
      object-fit: cover
      margin-right 10px
      width 110px
      height 110px
    .normal-text
      line-height 20px

</style>
