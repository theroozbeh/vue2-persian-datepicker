<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <pdatepicker :value='date' v-on:selected='dateSelected'></pdatepicker>
        <p>
        {{ date }}
        </p>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
          date : ''
      }
  },
  methods: {
      dateSelected(value){
          this.date = value;
      }
  }
}
</script>
