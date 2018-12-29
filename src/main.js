import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import Iconfont from './components/Iconfont'
import 'amfe-flexible'
import './cube-ui'
import './libs/vconsole'
import './libs/filter'
require('./assets/font/iconfont.css')

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.component('Iconfont', Iconfont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
