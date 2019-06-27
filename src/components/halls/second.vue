<template>
    <v-container>
        <h1>Второй пролет</h1>
        <v-btn color="warning" @click="on">Включить</v-btn>
        <v-btn color="primary" @click="off">Выключить</v-btn>
    </v-container>
</template>
<script>

import {eventEmitter} from '../../main'
import { EventEmitter } from 'events'

export default {
    name: 'second',
    data(){
        return{

        }
    },
  
    methods: {
        on() {
            eventEmitter.$emit('on_sock_2')
        },
        off() {
            eventEmitter.$emit('off_sock_2')
        }
    },
}
</script>
