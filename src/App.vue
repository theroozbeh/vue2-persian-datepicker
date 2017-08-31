<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <pdatepicker v-model="date"></pdatepicker>
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
