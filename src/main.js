import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import 'amfe-flexible'
import './libs/filter'
import './libs/vconsole'
import bridge from './libs/dsbridge'

Vue.config.productionTip = false
Vue.use(VueMeta)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

function startApp () {
  if (startApp.started) return
  startApp.started = true
  var userInfo = {
    Authorization: 'Bearer eyJsb2dpblRpbWUiOiIyMDE4LTEyLTI4IDExOjQyOjQ1IiwidXNlcklkIjozfQ==',
    ClientInfo: '2240563ecfa80fe26c4eb4dd4f6053037db4eee8/yzgdriver/1.0.0/ios'
  }
  if (process.env.NODE_ENV === 'production') {
    userInfo = bridge.call('user.getUserInfo')
    userInfo.ClientInfo = bridge.call('user.getClientInfo')
  }
  mount()
  function mount () {
    window.app = {
      app,
      userInfo
    }
    app.$mount('#app')
  }
}
startApp()
