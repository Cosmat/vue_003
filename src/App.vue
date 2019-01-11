<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src=" ../static/logo.png"/>
      <a class="navbar-brand" href="#" style="margin-left: 3%">Цех 330</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Главная<span class="sr-only">(current)</span></router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Пролет
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">

              <router-link class="dropdown-item" to="/1">1</router-link>
              <router-link class="dropdown-item" to="/2">2</router-link>
              <a class="dropdown-item" href="#">3</a>
              <a class="dropdown-item" href="#">4</a>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/another">другое</router-link>
              <router-link class="dropdown-item" to="/testing">testing</router-link>
            </div>
          </li>

        </ul>

      </div>
    </nav>
    <timer></timer>
    <div style="margin-left: 2%">
      <span :class="{'badge badge-success': net_1, 'badge badge-danger': !net_1}">1</span>
      <span :class="{'badge badge-success': net_2, 'badge badge-danger': !net_2}">2</span>
      <span :class="{'badge badge-success': net_3, 'badge badge-danger': !net_3}">3</span>
      <span :class="{'badge badge-success': net_4, 'badge badge-danger': !net_4}">4</span>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  import timer from './timer'
  import Autoriz from './Autoriz'
  import perviy_prolet from './perviy_prolet'
  import vtoroi_prolet from './vtoroi_prolet'
  import another from './another'
  import testing from './testing'
  import {eventEmitter} from "./main";


  export default {
    name: 'app',
    components: {
      timer,
      perviy_prolet,
      vtoroi_prolet,
      Autoriz,
      another,
      testing
    },
    data() {
      return {
        net_1: this.$store.state.state_sock_1.Connected_state,
        net_2: this.$store.state.state_sock_2.Connected_state,
        net_3: null,
        net_4: null
      }
    },

    created() {
      this.ws_001 = new WebSocket('ws://192.168.0.121:80');
      this.ws_001.onopen = () => {
        console.log('WS 1 подключенно');
        this.$store.dispatch('action_socket_1_onopen');
        eventEmitter.$emit('socket_1_onopen');
      };
      this.ws_001.onclose = e => {
        console.log('соеденение закрыто причина: ' + e.code);
        eventEmitter.$emit('socket_1_onclose');
      };
      this.ws_001.onmessage = payload => {
        console.log('Сообщение: ' + payload.data);
        this.$store.dispatch('action_socket_1_messsage', payload);
        if (payload.data == 1) {
          this.$store.dispatch('action_pin_stat_1_1_off');
          eventEmitter.$emit('pin_stat_1_off');

        }
        if (payload.data == 0) {
          this.$store.dispatch('action_pin_stat_1_1_on');
          eventEmitter.$emit('pin_stat_1_on');
        }
      };
      eventEmitter.$on("button_1_on", () => {
        this.ws_001.send("on")
      });
      eventEmitter.$on("button_1_off", () => {
        this.ws_001.send("off")
      });
      eventEmitter.$on("svet_on", () => {
        this.ws_001.send("on")
      });
      eventEmitter.$on("svet_off", () => {
        this.ws_001.send("off")
      });


      this.ws_002 = new WebSocket('ws://192.168.0.122:80');
      this.ws_002.onopen = () => {
        console.log('WS 2 подключенно');
        this.$store.dispatch('action_socket_2_onopen');
        eventEmitter.$emit('socket_2_onopen');
      };

      this.ws_002.onclose = e => {
        console.log('соеденение закрыто причина: ' + e.code);
        eventEmitter.$emit('socket_2_onclose');
      };

      this.ws_002.onmessage = payload => {
        console.log('Сообщение: ' + payload.data);
        this.$store.dispatch('action_socket_2_messsage', payload);
        if (payload.data == 1) {
          this.$store.dispatch('action_pin_stat_2_1_off');
          eventEmitter.$emit('pin_stat_2_off');
        }
        if (payload.data == 0) {
          this.$store.dispatch('action_pin_stat_2_1_on');
          eventEmitter.$emit('pin_stat_2_on');
        }
      };
      eventEmitter.$on("button_2_on", () => {
        this.ws_002.send("on")
      });
      eventEmitter.$on("button_2_off", () => {
        this.ws_002.send("off")
      });
      eventEmitter.$on("svet_on", () => {
        this.ws_002.send("on")
      });
      eventEmitter.$on("svet_off", () => {
        this.ws_002.send("off")
      });

    },

    timers: {
      log: {
        time: 2000, autostart: true, callback: function () {
          this.ws_001.send('state');
          this.ws_002.send('state');
        }, repeat: true
      },
      chek_connect: {
        time: 2000, autostart: true, callback: function () {
          if (this.ws_001.readyState === 1) {
            this.$store.dispatch('action_socket_1_connect_stat_on');
            eventEmitter.$emit('connected_state_1_true');
            this.net_1 = true;
          }
          else {
            this.$store.dispatch('action_socket_1_connect_stat_off');
            eventEmitter.$emit('connected_state_1_false');
            this.net_1 = false;
          }

          if (this.ws_002.readyState === 1) {
            this.$store.dispatch('action_socket_2_connect_stat_on');
            eventEmitter.$emit('connected_state_2_true');
            this.net_2 = true;

          }
          else {
            this.$store.dispatch('action_socket_2_connect_stat_off');
            eventEmitter.$emit('connected_state_2_false');
            this.net_2 = false;
          }
        }, repeat: true
      },
    },
  }
</script>

<style scoped>
</style>
