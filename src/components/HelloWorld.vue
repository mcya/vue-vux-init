<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

    <h2>Ecosystem2</h2>
    <x-input v-model="msg"></x-input>
    <x-button type="primary" @click.native="testAction()">一键认购</x-button>

  </div>
</template>

<script>
import { TransferDomDirective as TransferDom, XInput, XButton } from 'vux'
export default {
  // name: 'HelloWorld',
  directives: { TransferDom },
  components: { XInput, XButton },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    // this.testAction()
  },
  methods: {
    testAction() {
      // /user/projectList.do
      // userCode: 'caijingwei'
      console.log('testAction', this.HOST);
      this.$http.post(
        this.HOST+"/user/projectList.do",
        { userCode: 'caijingwei' },
        {emulateJSON:true}
      ).then(function(response){}, function(erron))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
