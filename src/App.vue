<template>
    <div id="app" dir="rtl">
        <img src="./assets/logo.png">
        <PDatePicker v-model="date" format-date="yyyy/MM/dd" 
                     :maximumYear="1450"
                     :minimumYear="1390"
                     :availableDates="true"
                     :input-disabled="true"
                     wrapperClass="hello-class"
                     v-on:selected='dateSelected'
                     ></PDatePicker>
        <p>
        {{ date }}
        </p>
        <button type="button" @click="setDate">تنظیم تاریخ</button>
    </div>
</template>

<script>
import PDatePicker from './components/PDatePicker.vue'
export default {
    name: 'app',
    data () {
        return {
            date : '12'
        }
    },
    components: {
        PDatePicker
    },
    methods: {
    dateSelected(value){
        console.log(JSON.stringify(value));
    },
    setDate(){
        this.date = '1396/03/05';
    },
    }
}
</script>
