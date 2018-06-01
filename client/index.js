import Vue from 'vue'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import App from './app.vue'

import './assets/styles/global.styl'

const router = createRouter()

Vue.use(VueRouter)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
