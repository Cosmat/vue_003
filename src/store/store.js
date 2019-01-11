import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avtomat: {
      on: false,

    },
    state_sock_1: {
      Connected: 'поиск...',
      Connected_state: false,
      message: '',
      pin_stat_1_1: 'соединяюсь...'

    },
    state_sock_2: {
      Connected: 'поиск...',
      Connected_state: false,
      message: '',
      pin_stat_2_1: 'соединяюсь....'
    },
    baza: {
      h_off: null,
      m_off: null,
      h_on: null,
      m_on: null,
      h_off_1: null,
      m_off_1: null,
      h_on_1: null,
      m_on_1: null,
      h_off_2: null,
      m_off_2: null,
      h_on_2: null,
      m_on_2: null
    },
  },


  mutations: {
    socket_1_connect_state_on(state) {
      state.state_sock_1.Connected = 'Есть соединение'
    },
    socket_1_connect_state_off(state) {
      state.state_sock_1.Connected = 'Нет связи'
    },
    socket_1_onopen(state) {
      state.state_sock_1.Connected = true;
    },
    socket_1_onmessage(state, payload) {
      state.state_sock_1.message = payload
    },
    pin_stat_1_1_on(state) {
      state.state_sock_1.pin_stat_1_1 = 'on'
    },
    pin_stat_1_1_off(state) {
      state.state_sock_1.pin_stat_1_1 = 'off'
    },


    socket_2_connect_state_on(state) {
      state.state_sock_2.Connected = 'Есть соединение'
    },
    socket_2_connect_state_off(state) {
      state.state_sock_2.Connected = 'Нет связи'
    },
    socket_2_onopen(state) {
      state.state_sock_2.Connected = true;
    },
    socket_2_onmessage(state, payload) {
      state.state_sock_2.message = payload
    },
    pin_stat_2_1_on(state) {
      state.state_sock_2.pin_stat_2_1 = 'on'
    },
    pin_stat_2_1_off(state) {
      state.state_sock_2.pin_stat_2_1 = 'off'
    },


    interval_1_h_off(state, payload) {
      state.baza.h_off = payload.h_off;
    },
    interval_1_m_off(state, payload) {
      state.baza.m_off = payload.m_off
    },
    interval_1_h_on(state, payload) {
      state.baza.h_on = payload.h_on
    },
    interval_1_m_on(state, payload) {
      state.baza.m_on = payload.m_on
    },

    interval_2_h_off(state, payload) {
      state.baza.h_off_1 = payload.h_off_1;
    },
    interval_2_m_off(state, payload) {
      state.baza.m_off_1 = payload.m_off_1
    },
    interval_2_h_on(state, payload) {
      state.baza.h_on_1 = payload.h_on_1
    },
    interval_2_m_on(state, payload) {
      state.baza.m_on_1 = payload.m_on_1
    },



  },
  actions: {
    action_socket_1_onopen(context, payload) {
      context.commit('socket_1_onopen', payload)
    },
    action_socket_1_messsage(context, payload) {
      context.commit('socket_1_onmessage', payload.data)
    },
    action_pin_stat_1_1_on(context) {
      context.commit('pin_stat_1_1_on')
    },
    action_pin_stat_1_1_off(context) {
      context.commit('pin_stat_1_1_off')
    },
    action_socket_1_connect_stat_on(context) {
      context.commit('socket_1_connect_state_on')
    },
    action_socket_1_connect_stat_off(context) {
      context.commit('socket_1_connect_state_off')
    },


    action_socket_2_onopen(context, payload) {
      context.commit('socket_2_onopen', payload)
    },
    action_socket_2_messsage(context, payload) {
      context.commit('socket_2_onmessage', payload.data)
    },
    action_pin_stat_2_1_on(context) {
      context.commit('pin_stat_2_1_on')
    },
    action_pin_stat_2_1_off(context) {
      context.commit('pin_stat_2_1_off')
    },
    action_socket_2_connect_stat_on(context) {
      context.commit('socket_2_connect_state_on')
    },
    action_socket_2_connect_stat_off(context) {
      context.commit('socket_2_connect_state_off')
    },


    action_interval_1_h_off(context, payload) {
      context.commit('interval_1_h_off', payload);
    },
    action_interval_1_m_off(context, payload) {
      context.commit('interval_1_m_off', payload)
    },
    action_interval_1_h_on(context, payload) {
      context.commit('interval_1_h_on', payload)
    },
    action_interval_1_m_on(context, payload) {
      context.commit('interval_1_m_on', payload)
    },

    action_interval_2_h_off(context, payload) {
      context.commit('interval_2_h_off', payload);
    },
    action_interval_2_m_off(context, payload) {
      context.commit('interval_2_m_off', payload)
    },
    action_interval_2_h_on(context, payload) {
      context.commit('interval_2_h_on', payload)
    },
    action_interval_2_m_on(context, payload) {
      context.commit('interval_2_m_on', payload)
    },


  },
})
