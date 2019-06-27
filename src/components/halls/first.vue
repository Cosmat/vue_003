<template>
    <v-container>
        <h1>Первый пролет</h1>
        <v-btn color="warning" @click="on">Включить</v-btn>
        <v-btn color="primary" @click="off">Выключить</v-btn>
    </v-container>
</template>
<script>


import {eventEmitter} from '../../main'
import { EventEmitter } from 'events'

export default {
    name: 'first',
    data(){
        return{

        }
    },
  
    methods: {
        on() {
            eventEmitter.$emit('on_sock_1')
        },
        off() {
            eventEmitter.$emit('off_sock_1')
        }
    },
}
</script>
