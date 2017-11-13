<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <pdatepicker v-model="date" format-date="yyyy/MM/dd" 
                     :availableDates='true'
                     availableDateStart='1396/08/05'
                     availableDateEnd='1396/08/30'
                     ></pdatepicker>
        <p>
        {{ date }}
        </p>
        <button type="button" @click="setDate">تنظیم تاریخ</button>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
          date : '12'
      }
  },
  methods: {
        dateSelected(value){
            this.date = value;
        },
        setDate(){
            this.date = '1396/03/05';
        }
  }
}
</script>
