import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
require('jquery')
require('bootstrap')

window.axios = require('axios')
Vue.config.productionTip = false

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
