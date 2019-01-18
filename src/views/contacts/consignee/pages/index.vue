<template>
  <div class="contacts-consignee">
    <InfiniteList
      v-model="loading"
      :has-data="consigneeList.list.length"
      :loader="loadConsigneeList"
      :has-next="consigneeList.hasNext"
    >
      <ListItem
        v-for="(item, i) in consigneeList.list"
        :key="item.id"
        :index="i"
        :item="item"
        :use-name-icon="true"
        @phoneCall="onItemPhoneCall"
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData
          action="新增收货方"
          message="老板，您还没有记录收货方信息 赶快新增一个，方便联系哦～"
          @btn-click="$router.push({ name: 'contacts-consignee-modify' })"
        >
          <img
            slot="img"
            class="contacts-consignee__placeholder"
            src="@/assets/contacts/consigness-list-empty.png"
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
import { setAppRightBtn } from '@/libs/bridgeUtil'
const moudleName = 'contacts/consignee'
export default {
  name: 'ContactsConsigneeList',
  metaInfo: {
    title: '收货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['consigneeList']),
  methods: {
    ...mapActions(moudleName, ['loadConsigneeList']),
    onPageRefresh() {
      console.info('onPageRefresh')
      this.loading = true
      setAppRightBtn([
        {
          text: '添加',
          iconType: 'add',
          action: () => {
            this.$router.push({ name: 'contacts-consignee-modify' })
          }
        }
      ])
    },
    onItemPhoneCall(item) {
      window.location.href = `tel:${item.phone}`
    },
    onItemClick(item, index) {
      this.$router.push({ name: 'contacts-consignee-detail', query: { consigneeId: item.id } })
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
