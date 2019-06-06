import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueTimeago from 'vue-timeago'

require('jquery')
require('bootstrap')

window.axios = require('axios')

/* global axios */
axios.interceptors.request.use(function (config) {
  // config.headers.common['Authorization'] = 'token {your git token}'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
