<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <pdatepicker v-model="date" format-date="yyyy/MM/dd" 
                     :maximumYear="1450"
                     :minimumYear="1390"
                     :availableDates="true"
                     :input-disabled="true"
                     v-on:selected='dateSelected'
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
            console.log(JSON.stringify(value));
        },
        setDate(){
            this.date = '1396/03/05';
        }
  }
}
</script>
