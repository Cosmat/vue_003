import VueRouter from 'vue-router'
import Home from './components/Home'
import TimePicker from './components/timepicker'
import FirstPage from './components/firstpage'
import SecondPage from './components/secondpage'
import ThirdPage from './components/thirdpage'

import First from './components/halls/first'
import Second from './components/halls/second'

export default new VueRouter ({
    routes:[
        {
            path: '/',
            component: Home 
        },
        {
            path: '/timepicker',
            component: TimePicker
        },
        {
            path: '/firstpage',
            component: FirstPage
        },
        {
            path: '/secondpage',
            component: SecondPage
        },
        {
            path: '/thirdpage',
            component: ThirdPage
        },
        {
            path: '/first',
            component: First
        },
        {
            path: '/second',
            component: Second
        },
    ],
    mode: 'history'
})