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
            <div v-if="contactList.length < 3" class="cardInfo-content edit">
              <p class="addContact"><span @click="addContact">+添加更多联系人</span></p>
            </div>
          </div>
          <div v-for="item in contactList" :key="item.index" class="form-section" >
            <form-item
              v-model="item.name"
              label="公司联系人"
              maxlength="10"
              required/>
            <form-item
              v-model="item.phone"
              label="联系方式"
              maxlength="11"
              required/>
            <div class="cardInfo-content edit">
              <p class="removeContact"><span @click="removeContact(item.index)">删除该联系人</span></p>
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
            <div class="cardInfo">
              <div class="cardInfo-content edit">
                <span class="cardTitle">公司LOGO</span>
                <span class="cardContent noneInfo">点击上传&nbsp;&nbsp;&nbsp;></span>
              </div>
              <div class="hr"/>
              <form-item
                v-model="form.value"
                label="公司简介"
                type="textarea"
                :rows="5"
                placeholder="请输入，不超过500个字"
                maxlength="500"/>
            </div>
          </div>
          <div class="form-section textarea">
            <form-item
              v-model="form.value"
              label="业务介绍"
              type="textarea"
              :rows="5"
              placeholder="请输入，不超过500个字"
              maxlength="500"/>
            <div class="hr"/>
            <div class="cardInfo-content edit">
              <span class="cardTitle">上传图片（0/10）</span>
            </div>
          </div>
          <div class="form-section textarea">
            <form-item
              v-model="form.value"
              label="服务优势"
              type="textarea"
              :rows="5"
              placeholder="请输入，不超过500个字"
              maxlength="500"/>
            <div class="hr"/>
            <div class="cardInfo-content edit">
              <span class="cardTitle">上传图片（0/10）</span>
            </div>
          </div>
        </form>
      </div>
      <div v-if="step === 3">
        <form class="form">
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">公司风貌（0/10）</span>
            </div>
          </div>
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">微信二维码（0/10）</span>
            </div>
          </div>
          <div class="form-section">
            <div class="cardInfo-content edit">
              <span class="cardTitle">公司首页形象图</span>
            </div>
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
      },
      addContactBtn: true,
      contactList: []
    }
  },
  methods: {
    nextSetp () {
      this.step++
    },
    addContact () {
      this.contactList.push({ name: '', phone: '' })
      this.addContactBtn = this.contactList.length < 3
    },
    removeContact (item) {
      this.contactList.splice(item, 1)
      this.addContactBtn = true
    }
  }

}
</script>
<style scoped lang="stylus">
@import "company.styl"
>>>.form-item-input-box .form-item-counter
  margin-top: -13px;
>>>.form-item-box
  overflow: -webkit-paged-x;
>>>.textarea .border-bottom-1px:after
  border none
.scroll-box
  height calc(100vh - 45px)
.form
  margin-bottom 15px
  &-section
    margin-top 15px
</style>
<style lang="stylus">
  .create-order-page .form-section .form-item-box:last-child .form-item:after
    border-style none
</style>
