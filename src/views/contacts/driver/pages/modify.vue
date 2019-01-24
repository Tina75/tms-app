<template>
  <div class="cube-has-bottom-btn cube-pt-10 driver-create">
    <FromGroup ref="form" :rules="rules" >
      <FormItem v-model="model.driverName" label="司机姓名" :maxlength="rules.driverName.max" prop="driverName"/>
      <FormItem v-model="model.driverPhone" label="手机号" type="phone" :maxlength="rules.driverPhone.max" prop="driverPhone"/>
      <FormItem
        v-model="model.carNO"
        label="车牌号"
        type="click"
        prop="carNO"
        @on-click="showKeyboard = true"/>

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
      <FormItem v-model="model.shippingWeight" label="载重（吨）" prop="shippingWeight" :maxlength="rules.shippingWeight.max"/>
      <FormItem v-model="model.shippingVolume" label="净空（方）" prop="shippingVolume" :maxlength="rules.shippingVolume.max"/>
      <FormItem v-model="model.carBrand" label="品牌" prop="carBrand" :maxlength="rules.carBrand.max"/>
      <FormItem
        v-model="model.payType"
        label="结算方式"
        placeholder="请选择"
        type="select"
        :options="options.payType"
        class="cube-mb-15"
      />

      <card class="cube-mb-15" title="常跑线路">
        <transport-line v-model="regularLine1" :visible.sync="cityPickerVisible" :label="['出发地1', '目的地1']"/>
        <transport-line v-model="regularLine2" :visible.sync="cityPickerVisible" :label="['出发地2', '目的地2']"/>
      </card>

      <card class="cube-mb-15" title="证件上传">
        <div class="uploadWrap">
          <upload v-model="model.drivePhoto" label="点击上传行驶证"/>
          <upload v-model="model.travelPhoto" label="点击上传驾驶证"/>
        </div>
      </card>

      <FormItem v-model="model.remark" prop="remark" :maxlength="rules.remark.max" type="textarea" label="备注"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <cube-popup
      ref="popup"
      v-model="showKeyboard"
      :mask-closable="true"
      position="bottom">
      <Keyboard
        v-model="model.carNO"
        @cancel="showKeyboard=false"
        @confirm="showKeyboard=false" />
    </cube-popup>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { DriverDetail } from '../modules/model'
import Upload from '../../components/Upload'
import Card from '../../components/Card'
import TransportLine from '../../components/TransportLine'
import Keyboard from '../../components/keyboard'
import { driverRule } from '../modules/rules'
const moudleName = 'contacts/driver'

export default {
  name: 'ModifyContactsDriver',
  metaInfo() {
    return {
      title: this.isCreate ? '新增熟车司机' : '修改熟车司机'
    }
  },
  components: { FormItem, FromGroup, LoadingButton, Upload, Card, TransportLine, Keyboard },
  data() {
    return {
      model: new DriverDetail(),
      options: {
        carType: DriverDetail.carType,
        carLength: DriverDetail.carLength,
        payType: DriverDetail.payType
      },
      rules: driverRule,
      submiting: false,
      showKeyboard: false,
      cityPickerVisible: false,
      purchDate: '', // 生产日期
      regularLine1: '', // 常发线路1
      regularLine2: '' // 常发线路2
    }
  },
  computed: {
    ...mapState(moudleName, ['driverDetail']),
    isCreate() {
      return typeof this.$route.query.carrierId === 'undefined'
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
    ...mapActions(moudleName, ['modifyDriver', 'loadDriverDetail']),
    async submit() {
      try {
        this.submiting = true
        if (!(await this.$refs.form.validate())) {
          return window.toast('请输入必填信息')
        }

        const validLine = this.validRegularline(this.regularLine1, '请完善线路1信息') &&
          this.validRegularline(this.regularLine2, '请完善线路2信息')
        if (!validLine) return

        this.model.regularLine = this.regularLine
        this.model.carrierId = this.$route.query.carrierId
        await this.modifyDriver(DriverDetail.toServer(this.model))
        this.afterSubmit()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },

    /* 提交成功后续操作 */
    afterSubmit () {
      this.$refreshPage('contacts-driver', 'contacts-driver-detail')
      this.$formWillLeave()
      window.toast(this.isCreate ? '新增熟车司机成功' : '修改熟车司机成功')
      this.regularLine1 = ''
      this.regularLine2 = ''
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
      this.$refs.form.reset()
      if (!this.isCreate) {
        // 编辑操作, 判断store中的值是否是目标, 不是则拉新的
        const urlId = +this.$route.query.carrierId
        if (urlId !== +this.driverDetail.driverId) {
          await this.loadDriverDetail()
          // 更新了detail的则要刷新detail页
          this.$refreshPage('contacts-driver-detail')
        }
        this.model = DriverDetail.toForm(this.driverDetail)
      } else {
        this.model = new DriverDetail()
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
    next(vm => {
      vm.setForm()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.cityPickerVisible = false
    next()
  }
}
</script>
<style lang='stylus' scoped>
.driver-create
  height auto
  min-height 100%
  background #efeff4
  .uploadWrap
    display flex
    padding 0 15px 15px
    background #ffffff
</style>
