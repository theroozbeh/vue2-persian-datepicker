<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
@font-face {
    font-family: 'byekan';
    src: url('./assets/fonts/BYekan.woff') format('woff'), 
         url('./assets/fonts/BYekan.ttf') format('ttf'), 
         url('./assets/fonts/BYekan.eot') format('eot') 
}

html, body{
    height: 100%;
    padding: 0;
    margin: 0;
}
#app {
    direction: rtl;
    font-family: byekan;
    height: 100%;
}
</style>
