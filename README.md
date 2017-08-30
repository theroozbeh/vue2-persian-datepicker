# vue-persian-datepicker

> This is a Jalali date picker component for Vue. 

> این برنامه یک کامپوننت انتخاب تاریخ جلالی می باشد. 


## How to use
```js
import Vue from 'vue'
import PDatePicker from 'PDatePicker'
vue.component('pdatepicker', PDatePicker)
```

You may use the component in your markup
```html
<pdatepicker v-on:selected='dateSelected' :value='date'></pdatepicker>
```

‍‍‍‍```js
export default{
    data(){
        return {
            date : '1396/6/8'
        };
    },
    methods:{
        dateSelected(value) {
            this.date = value;
        }
    }
}

