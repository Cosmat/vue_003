import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
import store from './store/store'
import App from './App'
import timer from './timer'
import vtoroi_prolet from './vtoroi_prolet'
import perviy_prolet from './perviy_prolet'
import testing from './testing'

export const eventEmitter = new Vue()

Vue.use(VueRouter)
new Vue({
  el: '#app',
  store: store,
  router: router,
  timer: timer,
  perviy_prolet: perviy_prolet,
  vtoroi_prolet: vtoroi_prolet,
  testing,
  render: h => h(App),

});
