<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData()">Request Data</button>
    <div>{{msg}}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    getData(): void {
      axios({ method: 'GET', url: 'http://localhost:3000/api/hello' }).then(
        (result) => {
          this.msg = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
});
</script>
