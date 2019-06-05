import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
require('jquery')
require('bootstrap')

window.axios = require('axios')

axios.interceptors.request.use(function (config) {
  config.headers.common['Authorization'] = 'token 30c24c68b96fd699590be03db1aeae1f16b7a034'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

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
