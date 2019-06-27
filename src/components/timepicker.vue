<template>
    
    <v-container grid-list-md>
    <v-card max-width="70%">
    <v-layout row pl-3 pr-3>
      
      <v-flex>
        <v-menu
          ref="menu_1"
          v-model="menu_1"
          :close-on-content-click="false"
          :return-value.sync="time_1"
          lazy
          transition="scale-transition"
          offset-y
          full-width
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time_1"
              label="Время отключения"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu_1"
            v-model="time_1"
            full-width
            format="24hr"
            @click:minute=M_m_off
          ></v-time-picker>
        </v-menu>
        </v-flex>

        <v-flex>
        <v-menu
            ref="menu_2"
            v-model="menu_2"
            :close-on-content-click="false"
            :return-value.sync="time_2"
            lazy
            transition="scale-transition"
            offset-y
            full-width
        >
            <template v-slot:activator="{ on }">
            <v-text-field
                v-model="time_2"
                label="Время включения"
                readonly
                v-on="on"
            ></v-text-field>
            </template>
            <v-time-picker
            v-if="menu_2"
            v-model="time_2"
            full-width
            format="24hr"
            @click:minute=M_m_on
            ></v-time-picker>
        </v-menu>
        </v-flex>
    </v-layout>
    
    
    <v-flex pl-4>
    <v-layout row wrap>
      <v-chip>
        <v-chip v-for="item in massiv_off">
          <div v-text="item"></div>
        </v-chip>
        <v-chip v-for="item in massiv_on">
          <div v-text="item"></div>
        </v-chip>
      </v-chip>
        <div>
            <v-btn
            flat
            large
            @click="testmethod"
            >добавить</v-btn>
        </div>
        <div>
            <v-btn
            flat
            large
            @click=clear
            >сброс</v-btn>
        </div>
       
    </v-layout>
    </v-flex>
    </v-card>

    <v-card
      max-width="70%"
    >
      <v-card-title >
        Автоматическое управление: {{this.automat_text}}
      </v-card-title>
      <v-card-actions>
        <v-btn class="error">Включить</v-btn>
        <v-btn class="primary">Отключить</v-btn>
      </v-card-actions>
    </v-card>

    </v-container> 
</template>
<script>
  import lodash from 'lodash'
  import {eventEmitter} from '../main'
  import { EventEmitter } from 'events'
  import axios from 'axios';

  var moment = require('moment');

  export default {
    name: 'timepicker',
    data () {
      return {
        time_1: null,
        time_2: null,
        menu_1: false,
        menu_2: false,
        interv: {},
        massiv_off: [],
        massiv_on: [],
        automat: false,
        automat_text: "ВЫКЛЮЧЕНО",
      }
    },
  
    methods: {
      M_m_off(){
        this.$refs.menu_1.save(this.time_1)
      },

      M_m_on(){
        this.$refs.menu_2.save(this.time_2)
      },
    
      testmethod(){
        if(this.time_1 != null || undefined){
          this.massiv_off.push(this.time_1)
          this.massiv_off = _.sortedUniq(this.massiv_off)
          axios.post('http://localhost:5000/write_mass_off/', {mass_off: this.massiv_off})}
        
        if(this.time_2 != null || undefined){
          this.massiv_on.push(this.time_2)
          this.massiv_on = _.sortedUniq(this.massiv_on)
          axios.post('http://localhost:5000/write_mass_on/', {mass_on: this.massiv_on})}
        // console.log(this.massiv_off)
        // console.log(this.massiv_on)
        eventEmitter.$emit('get_intervals')
      },

      clear(){
        this.massiv_off = []
        this.massiv_on = []
        axios.post('http://localhost:5000/write_mass_off/', {mass_off: []})
        axios.post('http://localhost:5000/write_mass_on/', {mass_on: []})
        eventEmitter.$emit('get_intervals')

      },

    },
  }
</script>


