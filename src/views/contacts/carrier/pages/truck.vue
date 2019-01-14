<template>
  <div class="carrier-truck">
    <medias>
      <media v-for="i in 8" :key="i">
        <div slot="title">
          <P class="truck-number">苏A888812 <span class="truck-tag">合约车</span></P>
          <p>
            <span class="truck-tag-gray">平板</span>
            <span class="truck-tag-gray">13米</span>
          </p>
        </div>
        <div slot="desc">
          李大贵 1991899222
        </div>
      </media>
    </medias>
  </div>
</template>

<script>
import { Medias, Media } from '../components'

export default {
  name: 'CarrierTruck',

  metaInfo: { title: '合作车辆' },

  components: { Medias, Media }

}
</script>

<style lang="stylus" scoped>
.truck-tag
  display inline-block
  font-size 10px
  line-height 10px
  text-align center
  color #00A4BD
  padding 2px 3px
  border 1px solid #00A4BD
  border-radius 1px
  vertical-align top
.truck-tag-gray
  display inline-block
  font-size 14px
  line-height 14px
  text-align center
  color #333
  padding 3px 4px
  border-radius 1px
  background-color #F8F8F9
  vertical-align top
  margin-left 6px
  &:first-child
    margin-left 0
>>>.media
  margin-top 10px
  padding 15px
>>>.media_title
  margin-bottom 17px
.truck-number
  margin-bottom 10px
</style>

