<template>
  <v-app dark app>
    <v-content>
      <v-tabs 
        fixed-tabs
        grow
        >
          <v-tab>{{t}}</v-tab>
          <v-tab  to="/">Главная</v-tab>
          <v-tab  to="/firstpage">Первая</v-tab>
          <v-tab  to="/secondpage">Телефоны</v-tab>
          <v-tab  to="/thirdpage">Справка</v-tab>
          <v-tab  to="/timepicker">Задать интервал</v-tab>
        </v-tabs>
        
        <v-layout d-flex> 
        <v-card
          v-show='!$vuetify.breakpoint.xsOnly'
          >
          <v-card-title>Время отключения</v-card-title>
            <v-chip v-for="item in zapros">
              <v-text v-text="item"></v-text>
            </v-chip>
        </v-card>

        <v-card
          v-show='!$vuetify.breakpoint.xsOnly'
          >
          <v-card-title>Время включения</v-card-title>
          <v-chip v-for="item in zapros_1">
            <v-text v-text="item"></v-text>
          </v-chip>
        </v-card>

        <v-card
          @click: to="first"
          :class="{'success': this.conn_1}"
          >
          <v-card-title>
            1 пролет
          </v-card-title>
          <v-card-text>
            {{text_conn_1}}
          </v-card-text>
          <v-card-text :class="{'my_red': indicat_pin_1, 'secondary': !indicat_pin_1}">
            {{stat_pin_1}}
          </v-card-text>
        </v-card>

        <v-card
          @click: to="second"
          :class="{'success': this.conn_2}"
          >
          <v-card-title>
            2 пролет
          </v-card-title>
          <v-card-text>
            {{text_conn_2}}
          </v-card-text>
          <v-card-text :class="{'my_red': indicat_pin_2, 'secondary': !indicat_pin_2}">
            {{stat_pin_2}}
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            3 пролет
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title>
            4 пролет
          </v-card-title>
        </v-card>
        </v-layout>
          
        <transition name="ma">
          <router-view></router-view>
        </transition>

    </v-content> 
  </v-app>  
</template>

<script>

import Vue from 'vue'
import VueTimers from 'vue-timers'
import timepicker from '../src/components/timepicker'
import home from './components/Home'
import axios from 'axios'
Vue.use(VueTimers)


import {eventEmitter} from './main'
import { EventEmitter } from 'events'

const moment = require('moment');

export default {
  name: 'app',
  components: {
    timepicker,
    home
  },
  
  data() {
    return {
      t: null,
      avtomat: false,
      zapros: null,
      zapros_1: null,


      ws_1: null,
      conn_1: false,
      text_conn_1: 'Нет связи',
      stat_pin_1: 'Поиск',
      indicat_pin_1: false,

      ws_2: null,
      conn_2: false,
      text_conn_2: 'Нет связи',
      stat_pin_2: 'Поиск',
      indicat_pin_2: false,

      
    }
  },

  created(){
    this.ws_1 = new WebSocket('ws://192.168.0.121')
    this.ws_1.onopen = () => {
      axios.post('http://localhost:5000/write_log_on/', {t_ws_1_on: moment().format('HH:mm:ss')})
      console.log('Socket ws_1 open')
    }
    this.ws_1.onclose = () => {
      axios.post('http://localhost:5000/write_log_off/', {t_ws_1_off: moment().format('HH:mm:ss')})
      console.log('Socket ws_1 closed')
    }
    
    eventEmitter.$on('on_sock_1', () => {
      this.ws_1.send('on')
    })
    eventEmitter.$on('off_sock_1', () => {
      this.ws_1.send('off')
    })


    this.ws_2 = new WebSocket('ws://192.168.0.122')
    this.ws_2.onopen = () => {console.log('Socket ws_2 open')}
    this.ws_2.onclose = () => {console.log('Socket ws_2 closed')}
    
    eventEmitter.$on('on_sock_2', () => {
      this.ws_2.send('on')
    })
    eventEmitter.$on('off_sock_2', () => {
      this.ws_2.send('off')
    })



    eventEmitter.$on('avtomat_on', () => {
      this.avtomat = true
    })
    eventEmitter.$on('avtomat_off', () => {
      this.avtomat = false
    })


    eventEmitter.$on('get_intervals', () => {
      axios
      .get('http://127.0.0.1:5000/take_data/')
      .then(response => {
        this.zapros = response.data
        this.zapros = this.zapros.mass_off
          console.log('this.zapros:', this.zapros)
        })
      .catch(error => {
          console.log(error);
        })

      axios
      .get('http://127.0.0.1:5000/take_data_1/')
      .then(response => {
        this.zapros_1 = response.data.mass_on
          console.log('this.zapros_1:', this.zapros_1)
        })
      .catch(error => {
        console.log(error)
        })
    })
  },

  mounted(){
    axios
      .get('http://127.0.0.1:5000/take_data/')
      .then(response => {
        this.zapros = response.data
        this.zapros = this.zapros.mass_off
          // console.log('this.zapros:', this.zapros.mass_off)
        })
      .catch(error => {
          console.log(error);
        })

    axios
      .get('http://127.0.0.1:5000/take_data_1/')
      .then(response => {
        this.zapros_1 = response.data.mass_on
          console.log('this.zapros_1:', this.zapros_1)
        })
      .catch(error => {
        console.log(error)
        })
  },



  timers: { 
    test:{
      time: 1000, autostart: true, callback(){
        this.t = moment().format('HH:mm:ss')
      }, repeat: true
    },
    
    sock_1:{
      time: 8000, autostart: true, callback(){
        if(this.ws_1.readyState == 1){
          console.log('sock_1: есть связь')
          this.conn_1 = true
          this.text_conn_1 = "Связь установлена"
          this.ws_1.onmessage = e => {
            if(e.data == 1){
              this.stat_pin_1 = 'Свет включен'
              this.indicat_pin_1 = true
            }
            if(e.data == 0){
              this.stat_pin_1 = 'Свет отключен'
              this.indicat_pin_1 = false
            }
          }
          this.ws_1.onopen = () => {
            axios.post('http://localhost:5000/write_log_on/', {t_ws_1_on: moment().format('HH:mm:ss')})
            console.log('Socket ws_1 open')
            }
          this.ws_1.onclose = () => {
            axios.post('http://localhost:5000/write_log_off/', {t_ws_1_off: moment().format('HH:mm:ss')})
            console.log('Socket ws_1 closed')
            }
        }
        else{
          this.ws_1.close()
          console.log('Sock_1: нет связи')
          this.conn_1 = false
          this.text_conn_1 = "Нет связи"
          this.stat_pin_1 = 'поиск...'
          this.indicat_pin_1 = false
          this.ws_1 = new WebSocket('ws://192.168.0.121')
        }
      }, repeat: true
    },
    
    
    sock_2:{
      time: 7000, autostart: true, callback(){
        if(this.ws_2.readyState === 1){
          this.conn_2 = true
          this.text_conn_2 = "Связь установлена"
          console.log('sock_2: есть связь')
          this.ws_2.onmessage = e => {
            if(e.data == 1){
              this.stat_pin_2 = 'Свет включен'
              this.indicat_pin_2 = true
            }
            if(e.data == 0){
              this.stat_pin_2 = 'Свет отключен'
              this.indicat_pin_2 = false
            }
          }
        }
        else{
          this.ws_2.close()
          console.log('Sock_2: нет связи')
          this.conn_2 = false
          this.text_conn_2 = "Нет связи"
          this.stat_pin_2 = 'поиск...'
          this.indicat_pin_2 = false
          this.ws_2 = new WebSocket('ws://192.168.0.122')
        }
      }, repeat: true
    },

    check_pin:{
      time: 4000, autostart: true, callback(){
        if(this.ws_1.readyState === 1){
          this.ws_1.send('state')
        }
        if(this.ws_2.readyState === 1){
          this.ws_2.send('state')
        }
      }, repeat: true
    },
   
    match:{
       time: 5000, autostart: true, callback(){
          if(this.zapros != undefined){
          for (var i=0; i < this.zapros.length; i++){
          if(this.zapros[i] === moment().format('HH:mm')){
            console.log('LIGHT OUT')
            this.ws_1.send('off')
            this.ws_2.send('off')
              }
            }
          }
          if(this.zapros_1 != undefined){
          for (var k=0; k < this.zapros_1.length; k++){
          if(this.zapros_1[k] === moment().format('HH:mm')){
            console.log('LIGHT on')
            this.ws_1.send('on')
            this.ws_2.send('on')
              }
            }
          }
       }, repeat: true
    }
  }
}
</script>
<style>
  .ma-enter{
  }
  .ma-enter-active{
    animation: 0.5s ma-slide-open forwards
  }
  .ma-enter-to{}

  .ma-leave{}
  .ma-leave-active{
    animation: 0.5s ma-slide-close forwards
  }
  .ma-leave-to{}

  @keyframes ma-slide-close {
    from{
      transform: translateX(0px)
    }
    to{
      transform: translate(100%)
    }
  }
  @keyframes ma-slide-open {
    from{
      transform: translateX(0px)
    }
    to{
      transform: translate(-100%)
    }
  }
  .my_red{
    background-color: red
  }
  
</style>
