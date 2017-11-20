# vue persian datepicker 
[![Build Status](https://travis-ci.org/dyonir/vue2-persian-datepicker.svg?branch=master)](https://travis-ci.org/dyonir/vue2-persian-datepicker) [![Dependency Status](https://gemnasium.com/badges/github.com/dyonir/vue2-persian-datepicker.svg)](https://gemnasium.com/github.com/dyonir/vue2-persian-datepicker) [![Coverage Status](https://coveralls.io/repos/github/dyonir/vue2-persian-datepicker/badge.svg?branch=master)](https://coveralls.io/github/dyonir/vue2-persian-datepicker?branch=master)

> This is a Jalali date picker component for Vue. 

> این برنامه یک کامپوننت انتخاب تاریخ جلالی می باشد. 

## Demo
You can see a demo and several examples in this page:
[Demo & examples](https://dyonir.github.io/vue2-persian-datepicker/)


## Universal Module Definition(UMD)
In order to use datepicker without node package manager include these scripts and style sheet ( I recommend using unpkg to include them):
```html
<link href="https://unpkg.com/vue2-persian-datepicker/dist/vue2-persian-datepicker.css" rel="stylesheet"></script>
<script type=text/javascript src="https://unpkg.com/vue"></script>
<script type=text/javascript src="https://unpkg.com/vue2-persian-datepicker/dist/vue2-persian-datepicker.js"></script>
```

## NPM Instalation
```bash
$ npm install vue2-persian-datepicker
```


## How to use
```js
import Vue from 'vue'
import PDatePicker from 'vue2-persian-datepicker'
Vue.component('pdatepicker', PDatePicker)
```

You may use the component in your markup
```html
<pdatepicker v-on:selected='dateSelected' :value='date'></pdatepicker>
```

```js
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
```
## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| placeholder | String | یک تاریخ را انتخاب کنید | Place holder of input |
| header-color | Color | 'white' | Header text color |
| header-background-color | Color | '#137e95' | Header background color |
| dialog-color | 'black' || Color  Dialog text color |
| dialog-background-color | Color | '#fafafa' | Dialog background color |
| minimum-year | Number | 1300 | Minimum selectable year for user |
| maximum-year | Number | 1350 | Maximum selectable year for user |
| name | String | '' | Name element for normal http form submit |
| required | Boolean | false | value of HTML required attribute |
| id | String | '' | value of input's id attribute|
| input-class | String | '' | css class for input element |
| dialog class | String | '' | css class for dialog element |
| wrapper-class | String | '' | css class wrapper element of component |
| initial-view | String | 'day' | Initial view of component (month or day) |
| inline-mode | Boolean | false | inline mode |
| format-date | String | 'yyyy/MM/dd' | formats output date. order of date element should not change |
| open-transition-animation | String | 'slide-fade' | you can specify a transition for opening and closing dialog.|
| persianDigits |Boolean | true | whether to use persian or english digits |
| availableDates | Boolean | false | If you want limit user to certain range of dates |
| availableDateStart | String | 1300/01/01 | In case of setting availableDates to true, use this to set start date |
| availableDateEnd | String | 1450/12/29 | In case of setting availableDates to true, use this to set end date | 
| disableDatesBeforeToday | Boolean | false | This will disable all dates before today | 


## Events
| event | date | description |
|-------|------|-------------|
| opened || The picker's dialog is opened |
| closed || The picker's dialog is closed |
| monthChanged || Month page has changed |
| yearChanged || Year page has changed |
| selected | Date | A date has been selected |
| input | Date | Input changed |
  
## Get selected date
Using v-model you can sync a value to selected date. Or, you can listen to selected event and get selected date.

## Date formatting
There are several ways you can print selected date on user input. Keep in mind
that you have to keep order of date (year/month/date)

| token | desc | example |
|-------|------|-------------|
| d | day | 3 |
| dd | day with 0 prefixed day | 03 |
| M | month number | 4 |
| MM | month with 0 prefix day | 04 |
| MMM | month name | فروردین |
| yy | two digits year | 96 |
| yyyy | four digits year | 1396 |