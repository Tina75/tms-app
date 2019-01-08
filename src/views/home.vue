<template>
  <div class="home">
    <cube-slide :data="items" class="slider"/>
    <p class="cube-mt-10 cube-mb-5">车辆</p>
    <ul>
      <li>
        <router-link :to="{name:'truck-index'}">车辆信息</router-link>
      </li>
    </ul>
    <p class="cube-mt-10 cube-mb-5">订单</p>
    <ul>
      <li>
        <router-link :to="{name:'waybill-cargo-list'}">运单货物列表</router-link>
      </li>
      <li>
        <router-link :to="{name:'loabill-cargo-list',params:{billId:963}}">提货单货物列表</router-link>
      </li>
    </ul>
    <p class="cube-mt-10 cube-mb-5">异常</p>
    <ul>
      <li>
        <router-link :to="{name:'odd-list'}">异常记录</router-link>
      </li>
      <li>
        <router-link :to="{name:'odd-upload'}">上报异常</router-link>
      </li>
    </ul>
    <cube-button>Button</cube-button>
    <br>
    <cube-button type="submit">Submit Button</cube-button>
    <br>
    <cube-button :active="true">Active Button</cube-button>
    <br>
    <cube-checkbox v-model="checked">Checkbox</cube-checkbox>
    <br>
    <cube-button :disabled="true">Disabled Button</cube-button>
    <br>
    <cube-button :light="true">Light Button</cube-button>
    <br>
    <cube-button :inline="true">Inline Button</cube-button>
    <br>
    <cube-button :outline="true" :primary="true">Outline Button</cube-button>
    <br>
    <cube-button :primary="true" @click="toList">Primary Button</cube-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      checkList: [],
      checked: true,
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image:
            '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image:
            '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image:
            '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        }
      ]
    }
  },
  mounted () {
    this.setUserInfo()
  },

  methods: {
    ...mapActions(['setUserInfo']),
    toList () {
      this.$router.push({ name: 'loabill-cargo-list' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  padding 10px
  .slider
    height 80px
  ul>li
    line-height 50px
    height 50px
    font-size 16px
    padding-left 20px
    background white
    border-bottom 1px solid #e9e9e9
    :after
      content '...'
      float right
      padding-right 10px
</style>
