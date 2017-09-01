<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <pdatepicker v-model="date" format-date="yyyy/MM/dd"></pdatepicker>
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
          date : '1'
      }
  },
  methods: {
      dateSelected(value){
          this.date = value;
      }
  }
}
</script>
