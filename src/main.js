import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import router from './routes'
import VueTimers from 'vue-timers'
// import socket from './socket'


Vue.use(Vuetify)
Vue.use(VueTimers)

Vue.use(VueRouter)


export const eventEmitter = new Vue()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

