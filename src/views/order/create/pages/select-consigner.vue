<template>
  <div class="contacts-consigner">
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
        <NoData message="老板，您还没有记录发货方信息" >
          <img
            slot="img"
            class="contacts-consigner__placeholder"
            src="@/assets/contacts/shipper-list-empty.png"
          >
        </NoData>
      </template>
    </InfiniteList>
  </div>
</template>

<script>
import ListItem from '@/views/contacts/components/ListItem'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { mapActions, mapState } from 'vuex'
import { MODULE_NAME } from '../../js/constant'

export default {
  name: 'select-consigner',
  metaInfo: {
    title: '选择发货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(MODULE_NAME.CONTACTS_CONSIGNEE, ['senderList']),
  methods: {
    ...mapActions(MODULE_NAME.CONTACTS_CONSIGNEE, ['loadSenderList', 'saveConsignerInfo']),
    loader(refresh) {
      this.loadSenderList(refresh)
    },
    onPageRefresh() {
      this.loading = true
    },
    async onItemClick(item) {
      await this.saveConsignerInfo(item.data)
      this.$router.back()
    }
  }
}
</script>

<style lang='stylus'>
.contacts-consigner
  height 100%
  &__placeholder
    width 179px
    height 133px
</style>
