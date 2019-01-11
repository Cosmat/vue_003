<template>
  <div class="container">
    <hr>
    <div>
      <h4>{{hour_indicator}} : {{minute_indicator}} : {{second_indicator}}</h4>
      <input type="checkbox" class="form-check-input" ref="check_stat">
      <span :class="{'badge badge-primary': !check, 'badge badge-danger': check}" ref="span_avtomat">поиск...</span>
      <span class="badge badge-danger"
            v-show="h_off && m_off && h_on && m_on">{{h_off}}:{{m_off}} - {{h_on}}:{{m_on}}</span>
      <span class="badge badge-danger"
            v-show="h_off_1 && m_off_1 && h_on_1 && m_on_1">{{h_off_1}}:{{m_off_1}} - {{h_on_1}}:{{m_on_1}}</span>


    </div>
    <hr>
  </div>
</template>
<script>
  import {eventEmitter} from "./main";
  import axios from 'axios'

  export default {
    name: "timer",

    data: function () {
      return {
        hour: 0,
        minute: 0,
        second: 0,
        hour_indicator: 0,
        minute_indicator: 0,
        second_indicator: 0,
        h_off: null,
        h_off_1: null,
        m_off: null,
        m_off_1: null,
        h_on: null,
        h_on_1: null,
        m_on: null,
        m_on_1: null,
        check: null

      }
    },


    created: function () {
      console.log(this.$refs.check_stat);
      setInterval(() => {
        let now = new Date();
        this.hour_indicator = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        this.minute_indicator = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        this.second_indicator = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
        this.hour = now.getHours();
        this.minute = now.getMinutes();
        this.second = now.getSeconds();


        if ((this.h_off == this.hour && this.m_off == this.minute && this.$refs.check_stat.checked === true) || (this.h_off_1 == this.hour && this.m_off_1 == this.minute && this.$refs.check_stat.checked === true)) {
          eventEmitter.$emit('svet_off');
          console.log('svet_off');
        }
        if ((this.h_on == this.hour && this.m_on == this.minute && this.$refs.check_stat.checked === true) || (this.h_on_1 == this.hour && this.m_on_1 == this.minute && this.$refs.check_stat.checked === true)) {
          eventEmitter.$emit('svet_on');
          console.log('svet_on');
        }

      }, 1000);

      eventEmitter.$on('submit', (payload) => {
        this.h_off = payload.h_off;
        this.m_off = payload.m_off;
        this.h_on = payload.h_on;
        this.m_on = payload.m_on
      });
      eventEmitter.$on('submit_1', (payload) => {
        this.h_off_1 = payload.h_off_1;
        this.m_off_1 = payload.m_off_1;
        this.h_on_1 = payload.h_on_1;
        this.m_on_1 = payload.m_on_1
      })

    },

    timers: {
      zapros: {
        time: 2000, autostart: true, callback: function () {
          axios
            .get('http://127.0.0.1:5000/testing')
            .then(response => {
              let s = JSON.stringify(response.data);
              s = JSON.parse(s);

              this.h_off = s.h_off;
              this.h_on = s.h_on;
              this.m_off = s.m_off;
              this.m_on = s.m_on;
              this.$store.dispatch('action_interval_1_h_off', response.data);
              this.$store.dispatch('action_interval_1_m_off', response.data);
              this.$store.dispatch('action_interval_1_h_on', response.data);
              this.$store.dispatch('action_interval_1_m_on', response.data);
            });
          axios
            .get('http://127.0.0.1:5000/testing_1')
            .then(response => {
              let s = JSON.stringify(response.data);
              s = JSON.parse(s);
              this.h_off_1 = s.h_off_1;
              this.h_on_1 = s.h_on_1;
              this.m_off_1 = s.m_off_1;
              this.m_on_1 = s.m_on_1;
              this.$store.dispatch('action_interval_2_h_off', response.data);
              this.$store.dispatch('action_interval_2_m_off', response.data);
              this.$store.dispatch('action_interval_2_h_on', response.data);
              this.$store.dispatch('action_interval_2_m_on', response.data);
            })
        }, repeat: true
      },

      check_checked: {
        time: 3000, autostart: true, callback: function () {
          this.check = this.$refs.check_stat.checked;
          if (this.$refs.check_stat.checked === true) {
            this.$refs.span_avtomat.innerHTML = 'Автоматическое управление'
          } else {
            this.$refs.span_avtomat.innerHTML = 'Ручное управление'
          }
        }, repeat: true
      }
    }

  }
</script>

<style scoped>

</style>
