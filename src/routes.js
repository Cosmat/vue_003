import VueRouter from 'vue-router'
import Autoriz from './Autoriz'
import perviy_prolet from './perviy_prolet'
import vtoroi_prolet from './vtoroi_prolet'
import testing from './testing'
import vremya from './vremya'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Autoriz
    },
    {
      path: '/1',
      component: perviy_prolet
    },
    {
      path: '/2',
      component: vtoroi_prolet
    },
    {
      path: '/another',
      component: vremya
    },

    {
      path: '/testing',
      component: testing
    },

  ],
  mode: 'history'
})


