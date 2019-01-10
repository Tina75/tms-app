<template>
  <div :class="{'active':value}" class="citypicker">
    <div class="select-group">
      <div class="title" v-text="title"/>
      <div v-if="recents.length>0" class="recent">
        <span class="tip">最近选择</span>
        <span
          v-for="(item,i) in recents"
          :key="i"
          class="item"
          @click="(current=item.data)&&update()"
        >{{item.shortName}}</span>
      </div>
    </div>
    <div class="item-group">
      <div class="tabs">
        <div
          v-for="(tab,i) in tabs"
          :key="i"
          :class="{'active':i==currentTab}"
          class="tab"
          @click="choseTab(i)"
        >{{tab}}</div>
      </div>
      <div class="items">
        <div
          v-for="(item,i) in items"
          :key="i"
          class="item border-bottom-1px border-left-1px"
          @click="choseItem(item)"
        >{{item.shortName}}</div>
      </div>
    </div>
    <div class="cover" @click="hide"/>
  </div>
</template>

<script>
import U from '@/libs/city'
/** 最近最少使用 */
export class LRU {
  constructor (max = 10, equal = () => false) {
    this.store = []
    this.maxLength = max
    this.equal = equal
  }

  add (item) {
    const equal = this.equal.bind(null, item)
    const store = this.store
    const has = store.find(equal)
    if (has) {
      store.splice(store.indexOf(has), 1)
    } else if (store.length === this.maxLength) {
      store.pop()
    }
    // 最新的放在最前面
    store.unshift(item)
  }
}
// 缓存省数据
let province = U.getAllRoots()
// 定义省市区分页顺序
const [PROVINCE, CITY, AREA] = [0, 1, 2]
// 以name相同为相等条件,lru自动更新最近选择列表
const lru = new LRU(4, (a, b) => a.shortName === b.shortName)
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择地址'
    },
    deep: {
      type: Number,
      default: 3
    },
    special: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 当前选中的 省,市,区
      current: [],
      // 当前tab页
      currentTab: PROVINCE,
      // 展现的列表
      list: {
        [PROVINCE]: province,
        [CITY]: [],
        [AREA]: []
      },
      recents: lru.store
    }
  },
  computed: {
    // 列表项
    items () {
      return this.list[this.currentTab].filter(v => v.status !== '-1') // 过滤不可用的...
    },
    // 切换页头
    tabs () {
      const current = this.current
      return ['省', '市', '区']
        .map((v, i) => (current[i] ? current[i].shortName : v))
        .slice(0, this.deep)
    }
  },
  methods: {
    // 选择切换页
    choseTab (i) {
      // 该页无数据则不让切换
      if (this.list[i].length === 0) {
        return
      }
      switch (i) {
        // 无论从哪切换到省,重置市和区
        case PROVINCE:
          this.currentTab = PROVINCE
          this.current = [this.current[0]]
          break
        // 从区切换到市,重置区数据
        case CITY:
          if (this.currentTab === AREA) {
            this.currentTab = CITY
            this.current = this.current.slice(0, 2)
          }
          break
      }
    },
    // 选择了列表项
    choseItem (item, index = this.currentTab) {
      if (this.special.indexOf(item.shortName) > -1) {
        let fill = this.deep - this.current.length
        if (fill > 0) {
          let fillArr = (new Array(fill)).fill(item)
          this.current = this.current.concat(fillArr)
        }
        return this.update()
      }
      const nextTab = index + 1
      const children = U.getAllChild(item.code)
      // 更新已选的数据
      if (index) {
        this.current.splice(index, 1, item)
      } else {
        this.current = [item]
      }
      // 切换tab页数据
      if (children.length > 0) {
        // 数据超过一项则更新tab页同时判断深度,深度到了直接提交选择结果
        if (children.length > 1) {
          this.list[nextTab] = children
          const deep = this.deep
          if (nextTab < deep) {
            this.currentTab = nextTab
          } else {
            this.update()
          }
        } else {
          // tab页数据只有一项的自动跳下一页
          this.list[nextTab] = []
          this.choseItem(children[0], nextTab)
        }
      } else {
        // 无数据的则提交选择结果
        this.update()
      }
    },
    // 处理选择结果
    update () {
      const current = this.current
      const i = current.length - 1
      const data = this.current.map(({ name, shortName, code, lat, lon }) => ({
        name,
        shortName,
        code,
        lat,
        lon
      }))
      lru.add({
        name: current[i].name,
        shortName: current[i].shortName,
        data
      })
      this.$emit('confirm', data)
      this.hide()
    },
    // 关闭并重置
    hide () {
      this.current = []
      this.currentTab = PROVINCE
      this.$emit('input', false)
    }
  }
}
</script>

<style lang='stylus' scoped>
.citypicker
  position fixed
  overflow-y auto
  display flex
  flex-direction column
  z-index 1999
  bottom 0
  left 0
  width 100%
  height 100%
  transform translateY(100%)
  transition transform 0.3s
  &.active
    transform translateY(0)
  .cover
    flex 1
    background rgba(0, 0, 0, 0.5)
  .item
    text-align center
    color #333
.select-group
  background #fff
  .title
    color #333
    font-weight bold
    text-align center
    font-size 15px
    line-height 40px
    padding 0 14px
    box-sizing border-box
  .recent
    width 100%
    display flex
    font-size 15px
    line-height 35px
    padding 10px
    box-sizing border-box
    border-bottom 1px solid #eef0f3
    .tip,
    .item
      vertical-align middle
      white-space nowrap
    .tip
      color #999
    .item
      flex 1
      max-width 70px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      text-align center
      margin 0 5px
      color #333
      background #F9F9F9
      &:last-child
        margin-right 0
.item-group
  background #fff
  .tabs
    height 50px
    padding 12px 0 0
    box-sizing border-box
    display flex
    justify-content space-around
    border-bottom 1px solid #418DF9
    .tab
      display flex
      align-items center
      justify-content center
      border-radius 6px 6px 0 0
      width 110px
      height 100%
      margin 0 14px
      font-size 16px
      background #EEF0F3
      color #333
      &.active
        color #fff
        background #418DF9
  .items
    display flex
    flex-wrap wrap
    .item
      width 25%
      height 50px
      line-height 50px
      font-size 16px
</style>
