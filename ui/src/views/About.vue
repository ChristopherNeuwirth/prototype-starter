<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1>This is an about page</h1>
        <v-btn @click="getData()">
          <span class="mr-2">Request Data</span>
        </v-btn>
      </v-flex>
      <v-flex class="demo" v-if="msg !== ''" xs12>
        <code>{{ msg }}</code>
      </v-flex>
    </v-layout>
  </v-container>
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
      axios({ method: 'GET', url: 'http://localhost:3000/api/hello' })
        .then((result) => {
          this.msg = result.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
});
</script>
<style lang="scss" scoped>
@import '../style/mixins/px-rem-converter.scss';
.demo {
  margin-top: rem(25px);
}
</style>
