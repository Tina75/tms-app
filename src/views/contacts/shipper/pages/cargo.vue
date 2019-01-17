<template>
  <div class="contacts-shipper-cargo">
    <InfiniteList
      v-model="loading"
      :loader="loadCargoList"
      :has-data="cargoList.list.length"
      :has-next="cargoList.hasNext"
    >
      <ListItem
        v-for="(item, i) in cargoList.list"
        :key="item.id"
        :index="i"
        :item="item"
        icon="icon-ico_thing"
      >
        <div
          slot="right"
          class="contacts-shipper-cargo__item border-left-1px cube-font-14 cube-c-light-grey"
          @click="modify(item)"
          v-text="'修改'"
        />
      </ListItem>
      <cube-button @click="modify()">a</cube-button>
      <template slot="empty">
        <NoData action="新增常发货物" message="老板，您还没有记录常发货物信息 赶快新增一个，用着方便哦～" @btn-click="modify">
          <img
            slot="img"
            class="empty-list-image"
            src="@/assets/contacts/cargo-list-empty.png"
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
const moudleName = 'contacts/shipper'
export default {
  name: 'ContactsShipperCargoList',
  metaInfo: {
    title: '常发货物'
  },
  components: { ListItem, NoData, InfiniteList },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState(moudleName, ['cargoList']),
  methods: {
    ...mapActions(moudleName, ['loadCargoList']),
    onPageRefresh() {
      this.loading = true
    },
    modify(item) {
      const query = {
        consignerId: this.$route.query.consignerId,
        id: item ? item.id : undefined
      }
      this.$router.push({ name: 'contacts-shipper-cargo-modify', query })
    }
  }
}
</script>

<style lang='stylus'>
.contacts-shipper-cargo
  height 100%
  &__item
    padding 8px 0 8px 10px
    margin-left 10px
</style>
