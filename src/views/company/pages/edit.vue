<template>
  <div class="create-order-page scroll-list-wrap">
    <cube-scroll class="scroll-box">
      <div v-if="step === 1">
        <form class="form">
          <div class="form-section">
            <form-item
              v-model="form.value" required
              label="公司全称"
              maxlength="25"/>
            <form-item
              v-model="form.value"
              label="公司简称"
              maxlength="6" />
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司联系人"
              maxlength="10"
              required/>
            <form-item
              v-model="form.value"
              label="联系方式"
              maxlength="11"
              required/>
            <div class="cardInfo-content">
              <p class="addContact">+添加更多联系人</p>
            </div>
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司地址"
              maxlength="50"
              required/>
            <form-item
              v-model="form.value"
              label="补充地址"
              maxlength="50" />
          </div>
        </form>
      </div>
      <div v-if="step === 2">
        <form class="form">
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司LOGO"/>
            <form-item
              v-model="form.value"
              label="公司简介"
              maxlength="500"/>
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="业务介绍"
              maxlength="500"/>
            <form-item
              v-model="form.value"
              label="上传图片（0/10）"/>
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="服务优势"
              maxlength="500"/>
            <form-item
              v-model="form.value"
              label="上传图片（0/10）"/>
          </div>
        </form>
      </div>
      <div v-if="step === 3">
        <form class="form">
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司风貌（0/10）"/>
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司微信二维码（0/10）"/>
          </div>
          <div class="form-section">
            <form-item
              v-model="form.value"
              label="公司形象图"/>
          </div>
        </form>
      </div>
    </cube-scroll>
    <div class="foot">
      <cube-button
        v-if="step < 3"
        class="footer-button"
        primary
        @click="nextSetp">
        下一步 {{step}}/{{setpCount}}
      </cube-button>
      <cube-button
        v-else
        class="footer-button"
        primary
        @click="save">
        保存
      </cube-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'company-edit',
  metaInfo: {
    title: '编辑公司'
  },
  components: { },
  data () {
    return {
      setpCount: 3,
      step: 1,
      form: {
        value: ''
      }
    }
  },
  methods: {
    nextSetp () {
      this.step++
    },
    addContact () {
    }
  }

}
</script>

<style lang="stylus" scoped>
.scroll-box
  height calc(100vh - 88px)
.form
  margin-bottom 15px
  &-section
    margin-top 15px
.cardInfo-content
  width: 100%;
  padding: 18px 15px 17px 15px
  background: #ffffff
  .addContact
    color #00A4BD
    text-align: center;
.footer-button
  position: absolute
  bottom: 0px
  height: 45px
</style>

<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>
