<template>
  <div class="order-create-consignee">
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
        @click="onItemClick"
      />
      <template slot="empty">
        <NoData message="老板，您还没有记录收货人信息">
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
import ListItem from '@/views/contacts/components/ListItem'
import InfiniteList from '@/components/InfiniteList'
import NoData from '@/components/NoData'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'select-consignee',
  metaInfo: {
    title: '选择收货方'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState('contacts/consignee', [ 'consigneeList' ]),
  methods: {
    ...mapMutations('order/create', [ 'SET_CONSIGNEE_INFO' ]),
    ...mapActions('contacts/consignee', [ 'loadConsigneeList' ]),

    loader(refresh) { this.loadConsigneeList(refresh) },

    onPageRefresh() { this.loading = true },

    onItemClick(item) {
      this.SET_CONSIGNEE_INFO(item.data)
      this.$router.back()
    }
  }
}
</script>

<style lang='stylus'>
  .order-create-consignee
    height 100%
    &__placeholder
      width 179px
      height 133px

    .contact-item__right-icon
      display none
</style>
