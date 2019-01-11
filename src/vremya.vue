<template>
  <div>
    <p>
      <button class="btn btn-primary" data-toggle="collapse" data-target="#multiCollapseExample1" type="button"
              aria-expanded="false" aria-controls="#multiCollapseExample1">добавить интервал
      </button>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2"
              aria-expanded="false" aria-controls="multiCollapseExample2">добавить интервал
      </button>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample3"
              aria-expanded="false" aria-controls="multiCollapseExample3">добавить интервал
      </button>
    </p>
    <div class="row">
      <div class="col">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <div class="card card-body" style="min-width: 18rem">
            <form>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Отключить в ...</label>
                  <input ref="input_off_hour" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label> . </label>
                  <input ref="input_off_minutes" type="text" class="form-control" placeholder="минуты" required>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Включить в ...</label>
                  <input ref="input_on_hour" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label>.</label>
                  <input ref="input_on_minutes" type="text" class="form-control" placeholder="минуты" required>
                </div>
              </div>
              <button type="button" class="btn btn-outline-danger" @click=submit_interval>принять</button>
              <button type='button' class="btn btn-primary" @click=clear_interval>сброс</button>
            </form>
          </div>
        </div>

        <div class="collapse multi-collapse" id="multiCollapseExample2">
          <div class="card card-body" style="min-width: 18rem">
            <form>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Отключить в ...</label>
                  <input ref="input_off_hour_1" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label> . </label>
                  <input ref="input_off_minutes_1" type="text" class="form-control" placeholder="минуты" required>
                </div>

              </div>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Включить в ...</label>
                  <input ref="input_on_hour_1" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label>.</label>
                  <input ref="input_on_minutes_1" type="text" class="form-control" placeholder="минуты" required>
                </div>
              </div>
              <button type="button" class="btn btn-outline-danger" @click=submit_interval_1>принять</button>
              <button type='button' class="btn btn-primary" @click=clear_interval_1>сброс</button>
            </form>
          </div>
        </div>

        <div class="collapse multi-collapse" id="multiCollapseExample3">
          <div class="card card-body" style="min-width: 18rem">
            <form>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Отключить в ...</label>
                  <input ref="input_off_hour_2" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label> . </label>
                  <input ref="input_off_minutes_2" type="text" class="form-control" placeholder="минуты" required>
                </div>

              </div>
              <div class="form-row">
                <div class="col-md-3 mb-3">
                  <label>Включить в ...</label>
                  <input ref="input_on_hour_2" type="text" class="form-control" placeholder="часы" required>
                </div>
                <div class="col-md-3 mb-3">
                  <label>.</label>
                  <input ref="input_on_minutes_2" type="text" class="form-control" placeholder="минуты" required>
                </div>
              </div>
              <button type="button" class="btn btn-outline-danger" @click=submit_interval_2>принять</button>
              <button type='button' class="btn btn-primary" @click=clear_interval_2>сброс</button>
            </form>
          </div>
        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import {eventEmitter} from './main'
  import axios from 'axios'

  export default {
    name: "vremya",
    data() {
      return {
        input_off_hour: null,
        input_off_minutes: null,
        input_on_hour: null,
        input_on_minutes: null,
      }
    },
    methods: {
      submit_interval() {
          eventEmitter.$emit('submit',
            {
              h_off: this.$refs.input_off_hour.value,
              m_off: this.$refs.input_off_minutes.value,
              h_on: this.$refs.input_on_hour.value,
              m_on: this.$refs.input_on_minutes.value,
            });


          this.input_off_hour = this.$refs.input_off_hour.value;
          this.input_off_minutes = this.$refs.input_off_minutes.value;
          this.input_on_hour = this.$refs.input_on_hour.value;
          this.input_on_minutes = this.$refs.input_on_minutes.value;
          console.log('submit pressed');

          axios.post('http://127.0.0.1:5000/testing/', {
            h_off: this.$refs.input_off_hour.value,
            m_off: this.$refs.input_off_minutes.value,
            h_on: this.$refs.input_on_hour.value,
            m_on: this.$refs.input_on_minutes.value
          })
        },
        clear_interval() {
          this.$refs.input_off_hour.value = null;
          this.$refs.input_off_minutes.value = null;
          this.$refs.input_on_hour.value = null;
          this.$refs.input_on_minutes.value = null;
        },
        submit_interval_1() {
          eventEmitter.$emit('submit_1',
            {
              h_off_1: this.$refs.input_off_hour_1.value,
              m_off_1: this.$refs.input_off_minutes_1.value,
              h_on_1: this.$refs.input_on_hour_1.value,
              m_on_1: this.$refs.input_on_minutes_1.value,
            });


        this.input_off_hour_1 = this.$refs.input_off_hour_1.value;
        this.input_off_minutes_1 = this.$refs.input_off_minutes_1.value;
        this.input_on_hour_1 = this.$refs.input_on_hour_1.value;
        this.input_on_minutes_1 = this.$refs.input_on_minutes_1.value;
        console.log('submit_1 pressed');

        axios.post('http://127.0.0.1:5000/testing_1/', {
          h_off_1: this.$refs.input_off_hour_1.value,
          m_off_1: this.$refs.input_off_minutes_1.value,
          h_on_1: this.$refs.input_on_hour_1.value,
          m_on_1: this.$refs.input_on_minutes_1.value
        })
      },
      clear_interval_1() {
        this.$refs.input_off_hour_1.value = null;
        this.$refs.input_off_minutes_1.value = null;
        this.$refs.input_on_hour_1.value = null;
        this.$refs.input_on_minutes_1.value = null;
      }
    }
  }


</script>

<style scoped>

</style>
