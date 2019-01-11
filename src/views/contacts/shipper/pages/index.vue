<template>
  <div class="address-shipper">
    <cube-scroll
      ref="scroll"
      :options="options"
      @pulling-down="onListPullDown"
      @pulling-up="onListPullUp"
    >
      <ContactItem
        v-for="item in ContactList.list"
        :key="item.id"
        :item="item"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <NoData
        v-if="!ContactList.list.length && !loading"
        action="新增发货方"
        message="老板，您还没有记录发货方信息 赶快新增一个，方便联系哦～"
      >
        <img
          slot="img"
          class="address-shipper__placeholder"
          src="@/assets/contacts/shipper-list-empty.png"
        >
      </NoData>
    </cube-scroll>
  </div>
</template>

<script>
import ContactItem from '../../components/ContactItem'
import NoData from '@/components/NoData'
import { mapActions, mapGetters } from 'vuex'
const moudleName = 'contacts/shipper'
export default {
  name: 'ContactsShipper',
  metaInfo: {
    title: '发货方'
  },
  components: { ContactItem, NoData },
  data() {
    return {
      options: {
        pullDownRefresh: {
          txt: '刷新成功!'
        },
        pullUpLoad: false
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(moudleName, ['ContactList'])
  },
  methods: {
    ...mapActions(moudleName, ['loadContactList']),
    onPageRefresh() {
      this.startHackLoading()
    },
    onListPullDown() {
      console.info('onPullDown')
      this.loadingData(true)
    },
    onListPullUp() {
      console.info('onPullUp')
      this.loadingData()
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item) {
      this.$router.push({
        name: 'contacts-shipper-detail',
        params: { id: item.id }
      })
    },
    async loadingData(clear) {
      this.loading = true
      try {
        await this.loadContactList(clear)
        this.checkPullDown()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
        this.stopListLoading()
      }
    },
    checkPullDown() {
      this.options.pullUpLoad = !!this.ContactList.hasNext
    },
    startHackLoading() {
      this.loading = true
      setTimeout(() => {
        const scroll = this.$refs.scroll
        scroll.scrollTo(0, 60)
        scroll._pullDownHandle()
        scroll._pullDownScrollHandle({ y: 60 })
      })
    },
    stopListLoading() {
      this.$refs.scroll.forceUpdate()
    }
  }
}
</script>

<style lang='stylus'>
.address-shipper
  height 100%
  &__placeholder
    width 179px
    height 133px
</style>
