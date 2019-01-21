<template>
  <div class="receipt-detail">
    <cube-scroll-nav>
      <StatusBar slot="prepend" :status="detail.receiptOrder && detail.receiptOrder.receiptStatus" :time="detail.createTime" type="receipt"/>
      <cube-scroll-nav-panel label="基本信息">
        <Panel title="基本信息">
          <FormItem label="客户名称">
            {{detail.shipperCompanyName}}
          </FormItem>
          <FormItem label="客户订单号">
            {{detail.customerOrderNo}}
            <span
              v-if="detail.customerOrderNo"
              slot="right"
              v-clipboard:copy="detail.customerOrderNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem label="客户运单号">
            {{detail.waybillNo}}
            <span
              v-if="detail.waybillNo"
              slot="right"
              v-clipboard:copy="detail.waybillNo"
              v-clipboard:success="copyBtn"
              v-clipboard:error="onError"
              class="act-btn">复制</span>
          </FormItem>
          <FormItem label="发货时间">
            {{detail.deliveryTime | datetimeFormat}}
          </FormItem>
          <FormItem label="到货时间">
            {{detail.arriveTime | datetimeFormat}}
          </FormItem>
          <FormItem label="提货方式">
            {{detail.pickTypeDesc}}
          </FormItem>
          <FormItem label="回单数量">
            {{detail.receiptCount}}份
          </FormItem>
          <FormItem label="代收货款">
            {{detail.collectionMoney}}元
          </FormItem>
          <FormItem label="对接业务员">
            {{detail.handlerUserName}}
          </FormItem>
          <FormItem label="是否开票">
            {{detail.isInvoice == 1 ? `是（${rate(detail.invoiceRate)}%）` : '否'}}
          </FormItem>
          <FormItem label="备注">
            {{detail.remark}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel label="发货人">
        <Panel title="发货人">
          <FormItem label="联系人">
            {{detail.consignerContact}}
          </FormItem>
          <FormItem label="联系方式">
            {{detail.consignerPhone}}
            <a v-if="detail.consignerPhone" slot="right" :href="`tel:${detail.consignerPhone}`" class="act-btn">联系TA</a>
          </FormItem>
          <FormItem label="发货地址">
            {{detail.consignerAddress}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel  label="收货人">
        <Panel title="收货人">
          <FormItem label="联系人">
            {{detail.consigneeContact}}
          </FormItem>
          <FormItem label="联系方式">
            {{detail.consigneePhone}}
            <a v-if="detail.consigneePhone" slot="right" :href="`tel:${detail.consigneePhone}`" class="act-btn">联系TA</a>
          </FormItem>
          <FormItem label="收货地址">
            {{detail.consigneeAddress}}
          </FormItem>
        </Panel>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel  label="承运商信息">
        <template v-if="detail.receiptOrder" >
          <Panel v-for="(item, index) in detail.receiptOrder.carrierInfos" :key="index" title="承运商信息">
            <FormItem label="承运商">
              {{item.carrierName}}
            </FormItem>
            <FormItem label="司机">
              {{item.driverName}}
            </FormItem>
            <FormItem label="联系方式">
              {{item.driverPhone}}
              <a v-if="item.driverPhone" slot="right" :href="`tel:${item.driverPhone}`" class="act-btn">联系TA</a>
            </FormItem>
            <FormItem label="车牌号">
              {{item.carNo}}
            </FormItem>
          </Panel>
        </template>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel v-if="detail.receiptOrder && detail.receiptOrder.receiptUrl.length" label="回单照片">
        <Panel title="回单照片">
          <image-list :upload-photos="receiptPicList"/>
        </Panel>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div v-if="!!detail.receiptOrder" class="upstream-footer">
      <cube-button v-if="detail.receiptOrder.receiptStatus === 0 && detail.status === 40" class="footer-item-btn" @click="receipt">回收</cube-button>
      <cube-button v-if="detail.receiptOrder.receiptStatus === 1" class="footer-item-btn" @click="backFactory">返厂</cube-button>
      <cube-button v-if="detail.receiptOrder.receiptStatus > 0 && !detail.receiptOrder.receiptUrl.length" class="footer-item-btn  footer-item-primary" @click="uploadPic">上传回单</cube-button>
      <cube-button v-if="detail.receiptOrder.receiptStatus > 0 && detail.receiptOrder.receiptUrl.length" class="footer-item-btn footer-item-primary" @click="updatePic">修改回单</cube-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import * as API from '../libs/api'
import Panel from '@/views/upstream/components/Panel'
import FormItem from '@/views/upstream/components/FormItem'
import StatusBar from '@/views/upstream/components/StatusBar'
import VueClipboard from 'vue-clipboard2'
import { getRate, getMoney, getMile } from '@/views/upstream/libs'
import imageList from '@/views/company/pages/image-list'
Vue.use(VueClipboard)

export default {
  name: 'receipt-detail',
  metaInfo: {
    title: '回单详情'
  },
  filters: {
    money: getMoney,
    mile: getMile
  },
  components: {
    Panel,
    FormItem,
    StatusBar,
    imageList
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
    receiptPicList () {
      return this.detail.receiptOrder.receiptUrl.map(el => {
        return { url: el }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initDetail()
    })
  },
  methods: {
    initDetail () {
      API.initDetail(this.id).then(response => {
        this.detail = response.data.data
      })
    },
    copyBtn (e) {
      alert('复制成功')
    },
    onError (e) {
      alert('复制失败，请使用Ctrl-C手动复制')
    },
    rate (val) {
      return getRate(val)
    },
    // 回收
    receipt () {
      const item = this.detail
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '回收',
        prompt: {
          value: '',
          placeholder: '请输入回收人'
        },
        onConfirm: (e, promptValue) => {
          const params = {
            orderIds: [item.id],
            recoveryName: promptValue,
            receiptStatus: item.receiptOrder.receiptStatus,
            ids: [item.receiptOrder.orderId]
          }
          API.updateReceipt(params)
            .then(res => {
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '回收成功'
              }).show()
            })
        }
      }, false).show()
    },
    // 返厂
    backFactory () {
      const item = this.detail
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '返厂',
        prompt: {
          value: '',
          placeholder: '请输入接收人'
        },
        onConfirm: (e, promptValue) => {
          const params = {
            orderIds: [item.id],
            returnName: promptValue,
            receiptStatus: item.receiptOrder.receiptStatus,
            ids: [item.receiptOrder.orderId]
          }
          API.updateReceipt(params)
            .then(res => {
              this.$createToast({
                type: 'warn',
                time: 1000,
                txt: '返厂成功'
              }).show()
            })
        }
      }, false).show()
    },
    uploadPic () {
      const id = this.detail.receiptOrder.id
      this.$router.push({
        query: { id, type: 'add' },
        name: 'receipt-upload'
      })
    },
    updatePic () {
      const id = this.detail.receiptOrder.id
      this.$router.push({
        query: { id, type: 'update', orderId: this.detail.id },
        name: 'receipt-upload'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.receipt-detail
  height 100%
.upstream-footer
  display flex
  width 100%
  position fixed
  bottom 0
  left 0
  right 0
  z-index 10
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
.total-fee
  float right
  margin-right 15px
  margin-bottom 15px
  span
    color #FA8C16
    font-size 20px
</style>
<style lang="stylus">
.receipt-detail
  .cube-scroll-nav-panels
    padding-bottom 40px
  .cube-scroll-nav-panel
    .cube-sticky-ele
      height 0
      visibility hidden
</style>
