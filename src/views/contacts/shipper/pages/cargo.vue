<template>
  <div class="contacts-shipper-cargo">
    <InfiniteList v-model="loading" :data="test" :loader="loadCargoList">
      <ListItem
        v-for="(item, i) in test"
        :key="item.id"
        :index="i"
        :item="item"
        icon="icon-ico_thing"
      >
        <div
          slot="right"
          class="contacts-shipper-cargo__item border-left-1px cube-font-14 cube-c-light-grey"
          @click="modify(i)"
          v-text="'修改'"
        />
      </ListItem>
      <template slot="empty">
        <NoData action="新增常发货物" message="老板，您还没有记录常发货物信息 赶快新增一个，用着方便哦～" @btn-click="modify">
          <img
            slot="img"
            class="contacts-shipper__placeholder"
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
      loading: false,
      test: [
        {
          detail: '..2sdsadsadaasdsdadsadsadsa...aaaa..',
          id: 0
        },
        {
          detail: '..3sdsadsadaasdsdadsadsadsa...aaaa..',
          id: 1
        },
        {
          detail: '..4sdsadsadaasdsdadsadsadsa...aaaa..',
          id: 2
        },
        {
          detail: '..5sdsadsadaasdsdadsadsadsa...aaaa..',
          id: 3
        },
        {
          detail: '..6sdsadsadaasdsdadsadsadsa...aaaa..',
          id: 4
        }
      ]
    }
  },
  computed: mapState(moudleName, ['cargoList']),
  methods: {
    ...mapActions(moudleName, ['loadCargoList']),
    onPageRefresh() {
      this.loading = true
    },
    modify(index) {
      if (index) {

      }
      this.$router.push({ name: 'contacts-shipper-cargo-modify' })
    }
  }
}
</script>

<style lang='stylus'>
.contacts-shipper-cargo
  height 100%
  &__placeholder
    width 179px
    height 133px
  &__item
    padding 8px 0 8px 10px
    margin-left 10px
</style>
