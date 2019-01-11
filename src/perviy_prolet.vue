<template>
  <div class="container">
    <div class="card" style="min-width: 18rem;">
      <div class="card-header">
        Первый пролет

      </div>
      <div class="card-body row">
        <div>
          <span :class="{'badge badge-danger': !pin, 'badge badge-primary': pin}" ref="state_light">Поиск...</span>
          <br>
          <br>
          <button type="button" class="btn btn-danger" @click=on>on</button>
          <button type="button" class="btn btn-primary" @click=off>off</button>
        </div>
        <br>
        <br>
        <div style="margin-left: 5%">
          <span class="badge badge-light">статус соединения:</span>
          <br>
          <span style="margin-left: 5%" :class="{'badge badge-success': net, 'badge badge-danger': !net}"
                ref="status_conecta">Поиск...</span>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue'
  import VueTimers from 'vue-timers'
  import {eventEmitter} from "./main";

  Vue.use(VueTimers);


  export default {
    name: "perviy_prolet",
    data() {
      return {
        pin: false,
        net: false
      }
    },

    created() {

      eventEmitter.$on('connected_state_1_true', () => {
        this.net = true;
        this.$refs.status_conecta.innerHTML = 'Есть соединение';
      });
      eventEmitter.$on('connected_state_1_false', () => {
        this.net = false;
        this.$refs.status_conecta.innerHTML = 'Нет связи';
      });

      eventEmitter.$on('pin_stat_1_off', () => {
        this.pin = true;
        this.$refs.state_light.innerHTML = 'Свет отключен';

      });
      eventEmitter.$on('pin_stat_1_on', () => {
        this.pin = false;
        this.$refs.state_light.innerHTML = 'Свет включен';
      });

    },

    methods: {
      on() {
        eventEmitter.$emit('button_1_on')
      },
      off() {
        eventEmitter.$emit('button_1_off')
      },
      reset() {
        eventEmitter.$emit('reset')
      },
    },
    timers: {},
  }


</script>

<style scoped>

</style>
