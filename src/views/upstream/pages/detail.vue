<template>
  <div class="upstream-detail">
    <Title>上游来单详情</Title>
    <StatusBar status="已接收" time="2018-12-1 08:00"/>
    <!-- 基本信息 -->
    <div class="upstream-panel">
      <Panel title="基本信息">
        <FormItem label="客户名称">
          {{detail.shipperCompanyName}}
        </FormItem>
        <FormItem label="客户订单号">
          {{detail.customerOrderNo}}
          <span slot="right" class="act-btn">复制</span>
        </FormItem>
        <FormItem label="客户运单号">
          {{detail.waybillNo}}
          <span slot="right" class="act-btn">复制</span>
        </FormItem>
        <FormItem label="发货时间">
          {{detail.deliveryTime}}
        </FormItem>
        <FormItem label="到货时间">
          {{detail.arriveTime}}
        </FormItem>
        <FormItem label="提货方式">
          {{pickupType[detail.pickTypeDesc]}}
        </FormItem>
        <FormItem label="回单数量">
          {{detail.receiptCount}}份
        </FormItem>
        <FormItem label="代收货款">
          {{detail.collectionMoney}}元
        </FormItem>
        <FormItem label="责任业务员">
          {{detail.handlerUserName}}
        </FormItem>
        <FormItem label="是否开票">
          {{detail.isInvoice == 1 ? '是' : '否'}}
        </FormItem>
        <FormItem label="备注">
          {{detail.remark}}
        </FormItem>
      </Panel>
      <!-- 发货人 -->
      <Panel title="发货人">
        <FormItem label="联系人">
          {{detail.consignerContact}}
        </FormItem>
        <FormItem label="联系方式">
          {{detail.consignerPhone}}
          <a slot="right" :href="`tel:${detail.consignerPhone}`" class="act-btn">联系TA</a>
        </FormItem>
        <FormItem label="发货地址">
          {{detail.consignerAddress}}
        </FormItem>
      </Panel>
      <Panel title="收货人">
        <FormItem label="联系人">
          {{detail.consigneeContact}}
        </FormItem>
        <FormItem label="联系方式">
          {{detail.consigneePhone}}
          <a slot="right" :href="`tel:${detail.consigneePhone}`" class="act-btn">联系TA</a>
        </FormItem>
        <FormItem label="收货地址">
          {{detail.consigneeAddress}}
        </FormItem>
        <!-- <FormItem label="收货人单位">
          {{detail.consigneeCompanyName}}
        </FormItem> -->
      </Panel>
      <Panel title="货物明细">
        <Cargo v-for="(item, index) in detail.cargoInfos" :key="index" :data="item"/>
      </Panel>
      <!-- 应收费用 -->
      <Panel title="应收费用">
        <FormItem label="计费里程">
          {{detail.mileage}}公里
        </FormItem>
        <FormItem label="运输费用">
          {{detail.freightFee}}元
        </FormItem>
        <FormItem label="提货费用">
          {{detail.pickFee}}元
        </FormItem>
        <FormItem label="装货费用">
          {{detail.loadFee}}元
        </FormItem>
        <FormItem label="卸货费用">
          {{detail.unloadFee}}元
        </FormItem>
        <FormItem label="保险费用">
          {{detail.insureFee}}元
        </FormItem>
        <FormItem label="其他费用">
          {{detail.otherFee}}元
        </FormItem>
        <div class="total-fee">
          合计<span>{{detail.totalFee}}元</span> {{settlementType[detail.settlementTypeDesc]}}
        </div>
      </Panel>
    </div>
    <div class="upstream-footer">
      <cube-button class="footer-item-btn">拒绝</cube-button>
      <cube-button class="footer-item-btn footer-item-primary">接受</cube-button>
    </div>
  </div>
</template>
<script>
import Server from '@/libs/server'
import Title from '../components/Title'
import Panel from '../components/Panel'
import FormItem from '../components/FormItem'
import StatusBar from '../components/StatusBar'
import Cargo from '../components/Cargo'
import PICKUP from '../constant/PICKUP'
import SETTLEMENT from '../constant/SETTLEMENT'
export default {
  name: 'upstream-detail',
  metaInfo: {
    title: 'upstream-detail'
  },
  components: {
    Title,
    Panel,
    FormItem,
    StatusBar,
    Cargo
  },
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    pickupType () {
      const res = {}
      PICKUP.map(el => {
        res[el.value] = el.name
      })
      return res
    },
    settlementType () {
      const res = {}
      SETTLEMENT.map(el => {
        res[el.value] = el.name
      })
      return res
    }
  },
  mounted () {
    this.initDetail()
  },
  methods: {
    initDetail () {
      Server({
        mock: true,
        method: 'get',
        url: '/busconnector/shipper/detail',
        params: {
          shipperOrderId: this.id
        }
      }).then(response => {
        this.detail = response.data.data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.upstream
  user-select none
.total-fee
  float right
  margin-right 15px
  span
    color #FA8C16
    font-size 20px
.upstream-panel
  padding-bottom 80px
.upstream-footer
  display flex
  width 100%
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .footer-item-btn
    flex 1
    background #27c4d3
    border-radius 0
  .footer-item-primary
    background #189cb2
.act-btn
  display inline-block
  color #00A4BD
  margin-left 10px
  padding-left 10px
  border-left 1px solid #f3f5f9
</style>
