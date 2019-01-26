<template>
  <div class="cube-has-bottom-btn cube-pt-10 truck-create">
    <FromGroup ref="$form" :rules="rules" >
      <FormItem
        v-model="model.carNo"
        label="车牌号"
        type="click"
        prop="carNo"
        @on-click="showKeyboard = true"/>
      <FormItem v-model="model.driverName" label="司机姓名" :maxlength="rules.driverName.max" prop="driverName"/>
      <FormItem v-model="model.driverPhone" label="手机号" type="phone" prop="driverPhone"/>
      <FormItem
        v-model="model.driverType"
        label="合作方式"
        placeholder="请选择"
        type="select"
        class="cube-mb-15"
        :bottom-line="false"
        :options="options.driverType"
        prop="driverType"
      />

      <FormItem
        v-model="model.carType"
        label="车型"
        placeholder="请选择"
        type="select"
        :options="options.carType"
        prop="carType"
      />
      <FormItem
        v-model="model.carLength"
        label="车长"
        placeholder="请选择"
        type="select"
        :options="options.carLength"
        prop="carLength"
      />
      <FormItem v-model="model.shippingWeight" label="载重（吨）" prop="shippingWeight" maxlength="15"/>
      <FormItem v-model="model.shippingVolume" label="净空（方）" prop="shippingVolume" maxlength="15"/>
      <FormItem v-model="model.carBrand" label="品牌" prop="carBrand" :maxlength="rules.carBrand.max"/>

      <FormItem
        v-model="purchDate"
        label="购买日期"
        placeholder="请选择"
        type="click"
        class="cube-mb-15"
        :bottom-line="false"
        @on-click="showDatePicker"
      />

      <card class="cube-mb-15" title="常跑线路">
        <transport-line v-model="regularLine1" :visible.sync="cityPickerVisible[0]" :label="['出发地1', '目的地1']"/>
        <transport-line v-model="regularLine2" :visible.sync="cityPickerVisible[1]" :label="['出发地2', '目的地2']"/>
      </card>

      <card class="cube-mb-15" title="证件上传">
        <div class="uploadWrap">
          <upload v-model="model.drivePhoto" label="点击上传行驶证"/>
          <upload v-model="model.travelPhoto" label="点击上传道路运输证"/>
        </div>
      </card>

      <!-- <FormItem v-model="model.remark" :maxlength="rules.remark.max" type="textarea" label="备注"/> -->
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <cube-popup
      ref="popup"
      v-model="showKeyboard"
      :mask-closable="true"
      position="bottom">
      <Keyboard
        v-model="model.carNo"
        @cancel="showKeyboard=false"
        @confirm="showKeyboard=false" />
    </cube-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { TruckDetail } from '../modules/model'
import Upload from '../../components/Upload'
import Card from '../../components/Card'
import Keyboard from '../../components/keyboard'
import TransportLine from '../../components/TransportLine'
import { truckRule } from '../modules/rules'
const moudleName = 'contacts/carrier'
export default {
  name: 'ModifyContactsCarrierTruck',
  metaInfo() {
    return {
      title: this.isCreate ? '新增车辆' : '修改车辆'
    }
  },
  components: { FormItem, FromGroup, LoadingButton, Upload, Card, TransportLine, Keyboard },
  data() {
    return {
      model: new TruckDetail(),
      options: {
        carType: TruckDetail.carType,
        driverType: TruckDetail.driverType,
        carLength: TruckDetail.carLength
      },
      rules: truckRule,
      submiting: false,
      showKeyboard: false,
      cityPickerVisible: [false, false],
      purchDate: '', // 生产日期
      regularLine1: '', // 常发线路1
      regularLine2: '' // 常发线路2
    }
  },
  computed: {
    ...mapGetters(moudleName, ['truckDetail']),
    isCreate() {
      return typeof this.$route.query.carId === 'undefined'
    },
    regularLine () {
      const res = []
      const line1 = this.regularLine1
      const line2 = this.regularLine2
      if (line1.s && line1.sn && line1.e && line1.en) { res.push(line1) }
      if (line2.s && line2.sn && line2.e && line2.en) { res.push(line2) }
      return JSON.stringify(res)
    }
  },
  methods: {
    ...mapActions(moudleName, ['loadTruckDetail', 'modifyTruck']),
    async submit() {
      try {
        this.submiting = true
        if (!(await this.$refs.$form.validate())) {
          return window.toast('请输入必填信息')
        }
        this.model.regularLine = this.regularLine

        const validLine = this.validRegularline(this.regularLine1, '请完善线路1信息') &&
          this.validRegularline(this.regularLine2, '请完善线路2信息')
        if (!validLine) return

        this.model.carrierId = this.$route.query.carrierId
        await this.modifyTruck(TruckDetail.toServer(this.model))
        this.afterSubmit()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },

    /* 提交成功后续操作 */
    afterSubmit () {
      this.$refreshPage('contacts-carrier-truck', 'contacts-carrier-truck-detail')
      this.$formWillLeave()
      window.toast(this.isCreate ? '新增车辆成功' : '修改车辆成功')
      this.$router.back()
    },

    /* 校验运输线路 */
    validRegularline (line, msg) {
      if (!line) return true
      const { s, sn, e, en } = line
      const valid = s && sn && e && en
      if (!valid) {
        window.toast(msg)
      }
      return valid
    },

    async setForm() {
      if (!this.isCreate) {
        // 编辑操作, 判断store中的值是否是目标, 不是则拉新的
        const urlId = +this.$route.query.carId
        if (urlId !== +this.truckDetail.id) {
          await this.loadTruckDetail()
          // 更新了detail的则要刷新detail页
          this.$refreshPage('contacts-carrier-truck-detail')
        }
        if (this.truckDetail.purchDate) {
          this.purchDate = new Date(this.truckDetail.purchDate).toISOString().split('T')[0]
        }
        this.model = TruckDetail.toForm(this.truckDetail)
      } else {
        this.model = new TruckDetail()
      }
      this.setRegularLine()
    },

    setRegularLine () {
      if (!this.model.regularLine) {
        this.regularLine1 = ''
        this.regularLine2 = ''
        return
      }
      try {
        const serveData = JSON.parse(this.model.regularLine)
        this.regularLine1 = Array.isArray(serveData) && serveData[0] ? serveData[0] : ''
        this.regularLine2 = Array.isArray(serveData) && serveData[1] ? serveData[1] : ''
      } catch (error) {
        this.regularLine1 = ''
        this.regularLine2 = ''
        console.error(error)
      }
    },

    showDatePicker() {
      const self = this
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择',
          value: new Date(),
          onSelect: (date, val, text) => {
            self.purchDate = text.join('-')
            self.model.purchDate = date.getTime()
          }
        })
      }
      this.datePicker.show()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setForm())
  },
  beforeRouteLeave(to, from, next) {
    this.cityPickerVisible = [false, false]
    next()
  }
}
</script>
<style lang='stylus' scoped>
.truck-create
  height auto
  min-height 100%
  background #efeff4
  .uploadWrap
    display flex
    padding 0 15px 15px
</style>
