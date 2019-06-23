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
import { Vue, Prop, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class About extends Vue {
  // @Prop() private propMessage!: string;

  // initial data
  private msg = '';

  // pass Props to component: <Component prop-message="Hello World"></Component>
  // use prop values for initial data
  // private helloMsg = 'Hello, ' + this.propMessage;

  // computed
  // get computedMsg() {
  //   return 'computed ' + this.propMessage;
  // }

  // lifecycle hook
  // protected mounted() {
  //   // do sth
  // }

  // methods
  public getData(): void {
    const api = `${process.env.VUE_APP_API_BASE_URL}/hello`;
    console.log('requesting: ', api);
    axios({
      method: 'GET',
      url: api,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((result) => {
        this.msg = result.data.hello;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>
<style lang="scss" scoped>
@import '../style/mixins/px-rem-converter.scss';
.demo {
  margin-top: rem(25px);
}
</style>
