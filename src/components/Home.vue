<template>
    <v-container  pa-0>
      <v-layout row>
            <v-container>
                <v-img 
                    :src= this.path
                    contain
                ></v-img>
            </v-container>
            <v-container>
                <h1 class="font">{{d}}</h1>
                <h1 class="font">{{t}}</h1>
            </v-container>
      </v-layout>
    </v-container>
</template>
<script>
const moment = require('moment');
export default {
   data() {
    return {
      path: require("../../public/img/330.png"),
      t: null,
      d: null
    }
  },

timers: {
    test:{
      time: 500, autostart: true, callback(){
        this.t = moment().format('HH:mm:ss')
        this.d = moment().format('L');
      }, repeat: true
    }

}

    
}
</script>
<style scoped>
  .font{
    font-size: 5rem
  }
</style>

