<template>
  <div class="contact-list">
    <cube-index-list
      ref="list"
      :options="options"
      :data="data"
      v-on="$listeners"
    >
      <cube-index-list-group v-for="(group, index) in data" :key="index" :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="$emit('selectItem', item)"
        >
          <div class="contact-list__item border-bottom-1px cube-ellipsis">
            <div class="contact-list__prefix cube-flex-center">{{item.name[0]}}</div>
            <div class="contact-list__content cube-ml-15 cube-ellipsis">
              <span class="cube-c-black cube-ellipsis cube-font-17" v-text="item.name"/>
              <span class="cube-c-light-grey cube-ellipsis cube-font-14" v-text="item.detail"/>
            </div>
            <i
              class="contact-list__tel icon iconfont icon-ico_call"
              @click.stop="$emit('phoneCall', item)"
            />
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
        pullUpLoad: true
      }
    }
  },
  watch: {
    refreshing(newV, oldV) {
      if (!newV) {
        this.$refs.list.forceUpdate()
      }
    },
    loading(newV, oldV) {
      console.info('loading', newV, oldV)
      if (!newV) {
        this.$refs.list.forceUpdate()
      }
    }
  },
  methods: {}
}
</script>

<style lang='stylus'>
.contact-list
  height 100%
  .cube-index-list-item:last-of-type>div:after
    content none
  .cube-index-list-nav-item
    color #333
    padding 5px 6px
    font-weight 450
    font-size 10px
  &__item
    display flex
    align-items center
    padding 10px 15px
    &:after
      margin-left 70px
  &__prefix
    flex-shrink 0
    height 40px
    width 40px
    background #E4E7EC
    border-radius 100%
  &__tel
    font-size 30px
    color #00A4BD
  &__content
    flex 1
    height 40px
    display flex
    flex-direction column
    justify-content space-around
</style>
