<template>
  <div class="contacts-consignee">
    <InfiniteList
      v-model="loading"
      :has-data="senderList.list.length"
      :loader="loadSenderList"
      :has-next="senderList.hasNext"
    >
      <ListItem
        v-for="(item, i) in senderList.list"
        :key="item.id"
        :index="i"
        :item="item"
        @click="onItemClick"
      >
        <i slot="right"/>
      </ListItem>
      <template slot="empty">
        <NoData
          action="新增发货方"
          message="老板，您还没有记录发货方信息 赶快新增一个，方便联系哦～"
          @btn-click="$router.push({ name: 'contacts-shipper-modify' })"
        >
          <img
            slot="img"
            class="contacts-consignee__placeholder"
            src="@/assets/contacts/shipper-list-empty.png"
          >
        </NoData>
      </template>
    </InfiniteList>
  </div>
</template>

<script>
import ListItem from '../../components/ListItem'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { mapActions, mapState } from 'vuex'
const moudleName = 'contacts/consignee'
export default {
  name: 'SelectSender',
  metaInfo: {
    title: '选择发货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['senderList']),
  methods: {
    ...mapActions(moudleName, ['loadSenderList', 'saveConsignerInfo']),
    loader(refresh) {
      this.loadSenderList(refresh)
    },
    onPageRefresh() {
      console.info('onPageRefresh')
      this.loading = true
    },
    async onItemClick(item) {
      console.log(item.data)
      await this.saveConsignerInfo(item.data)
      this.$router.back()
    }
  }
}
</script>

<style lang='stylus'>
.contacts-consignee
  height 100%
  &__placeholder
    width 179px
    height 133px
</style>
