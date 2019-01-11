<template>
  <div>
    <button type="button" class="btn btn-primary" @click=toserver>request</button>
    <button type="button" class="btn btn-primary" @click='clear_div'>clear</button>
    <div>{{info}}</div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "testing",
      data() {
        return {
          info: null
        };
      },

      methods:{
        toserver(){
          axios
            .get('http://127.0.0.1:5000/testing')
            .then(response => (this.info = response.data));
        },
        clear_div(){
          this.info = null
        }

      }
    }



</script>

<style scoped>

</style>
