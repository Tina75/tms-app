import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './app.vue'
import router from './router'
import store from './store'
import './plugins'
import Iconfont from './components/Iconfont'

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.component('icon-font', Iconfont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
