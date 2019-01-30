<template>
  <div class="pickup-detail">
    <cube-scroll-nav ref="content-scroll" :class="{'full-height': pickupDetail.status === 3}" @change="changeHandler">
      <div slot="prepend" class="status-block">
        <h2>{{statusMap[pickupDetail.status]}}</h2>
        <p>{{pickupDetail.createTime|datetimeFormat}}</p>
      </div>
      <cube-scroll-nav-panel
        v-for="(item, index) in pageData"
        :key="index"
        :label="item.name">
        <ul>
          <component :is="item.component"/>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div v-if="pickupDetail.status !== 3" class="handle-btns">
      <template v-if="pickupDetail.status === 1">
        <a v-if="hasSendCar" @click="pickup">提货</a>
        <a v-else @click="assign">派车</a>
      </template>
      <template v-if="pickupDetail.status === 2">
        <a class="light-btn" @click="locate">查看位置</a>
        <a @click="arrive">到货</a>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PickupInfo from '../components/PickupInfo'
import OrderList from '../components/OrderList'
import CostDetail from '../components/CostDetail'
import { setAppRightBtn } from '@/libs/bridgeUtil'

export default {
  name: 'pickup-detail',
  metaInfo: {
    title: '提货管理详情'
  },
  components: { PickupInfo, OrderList, CostDetail },
  data () {
    return {
      pageData: [
        {
          name: '提货单信息',
          component: 'PickupInfo'
        },
        {
          name: '货物明细',
          component: 'OrderList'
        },
        {
          name: '应付费用',
          component: 'CostDetail'
        }
      ],
      statusMap: {
        1: '待提货',
        2: '提货中',
        3: '已提货'
      },
      hasSendCar: false
    }
  },
  computed: {
    ...mapGetters('pickup', ['pickupDetail'])
  },
  watch: {
    'pickupDetail.status' (val) {
      if (val === 1) {
        let btns = []
        if (this.hasSendCar) {
          btns.push({
            text: '编辑',
            iconType: 'edit',
            action: () => {
              this.$router.push({
                name: 'pickup-assign',
                params: {
                  id: this.$route.params.id
                },
                query: {
                  isEdit: 1
                }
              })
            }
          })
        }
        btns.push({
          text: '删除',
          iconType: 'delete',
          action: () => {
            const _this = this
            this.$createDialog({
              type: 'confirm',
              title: '提示',
              content: '确定要删除吗？',
              confirmBtn: {
                text: '是',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '否',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              async onConfirm () {
                await _this.deleteBill(_this.$route.params.id)
                _this.$createToast({
                  type: 'warn',
                  time: 1000,
                  txt: '删除成功'
                }).show()
                _this.$router.back()
              }
            }).show()
          }
        })
        setAppRightBtn(btns)
      } else {
        setAppRightBtn([{ text: '', action: () => {} }])
      }
    }
  },
  methods: {
    ...mapActions('pickup', ['getPickupDetail', 'clearDetail', 'arriveBill', 'removePicking', 'pickupBill', 'removeBePicking', 'deleteBill', 'getPickupCount']),
    changeHandler (label) {
      console.log('changed to:', label)
    },
    locate () {
      this.$router.push({
        name: 'pickup-track',
        params: {
          id: this.pickupDetail.pickUpId
        },
        query: {
          type: 1
        }
      })
    },
    arrive () {
      const _this = this
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否确认到货？',
        confirmBtn: {
          text: '是',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '否',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        async onConfirm () {
          await _this.arriveBill(_this.pickupDetail.pickUpId)
          // await _this.removePicking(_this.$route.query.index)
          await _this.getPickupDetail(_this.$route.params.id)
          this.$refs['content-scroll'].refresh()
          _this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '到货成功'
          }).show()
        }
      }).show()
    },
    assign () {
      this.$router.push({
        name: 'pickup-assign',
        params: {
          id: this.pickupDetail.pickUpId
        }
      })
    },
    pickup () {
      const _this = this
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '提货后将不能修改提货单，是否提货？',
        confirmBtn: {
          text: '是',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '否',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        async onConfirm () {
          await _this.pickupBill(_this.pickupDetail.pickUpId)
          // await _this.removeBePicking(_this.$route.query.index)
          await _this.getPickupDetail(_this.$route.params.id)
          _this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '提货成功'
          }).show()
        }
      }).show()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPickupDetail(to.params.id).then((pickupDetail) => {
        vm.hasSendCar = (pickupDetail.assignCarType === 1 && pickupDetail.carrierName) || (pickupDetail.assignCarType === 2 && pickupDetail.carNo)
      })
      vm.$nextTick(() => {
        vm.$refs['content-scroll'].refresh()
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.clearDetail()
    setAppRightBtn([{ text: '', action: () => {} }])
    next()
  }
}
</script>
<style lang="stylus" scoped>
.pickup-detail
  height: 100%
  background-color: #EFEFEF;
  display: flex
  display: -webkit-box;
  display: -webkit-flex;
  flex-direction column
  .cube-scroll-nav
    flex: 1
    -webkit-box-flex: 1
    height: calc(100% - 45px)
    &.full-height
      height: 100%
  .handle-btns
    display: flex
    display: -webkit-box;
    display: -webkit-flex;
    height: 45px
    a
      flex: 1
      -webkit-box-flex:1
      background: #27A3BD;
      text-align: center
      height: 45px
      line-height: 45px
      font-size: 17px
      color: #ffffff
      &.light-btn
        background: #32C4D3;
  .status-block
    height: 90px
    background-color: #252A2F
    padding: 25px 15px
    h2
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 5px
    p
      color: #ffffff
      font-size: 15px;
  >>> .cube-scroll-content
    width 100%
    .cube-scroll-nav-bar-items
      display: flex
      display: -webkit-box;
      display: -webkit-flex;
      .cube-scroll-nav-bar-item
        flex 1
        -webkit-box-flex:1
        padding-top: 15px;
        padding-bottom: 15px;
  >>> .cube-scroll-nav-panel
    .cube-sticky-ele
      height 0
      visibility: hidden
</style>
