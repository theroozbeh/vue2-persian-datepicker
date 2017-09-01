<template>
    <div class="pdatepicker" v-bind:class="{ 'inline' : inlineMode, wrapperClass }"
               >
        <input :id="id"
            type="text"
               @click="inputClicked"
               :value="formatedChosenDate"
               @change="inputChanged($event.target.value)"
               :class="inputClass"
               :name="name"
               :placeholder="placeholder">
        <transition :name="openTransitionAnimation">
            <div class='dialog' :class="dialogClass" v-if='isDialogOpen' v-bind:style="{ background: dialogBackColor, color: dialogColor}">
            
                <div class='day-view' v-if='isDayView'>
                    <div class="dialog-header" v-bind:style='{background : headerBackgroundColor, color: headerColor}'>
                        <div class='dialog-month'>
                            <div class="preMonth" @click='preMonthClicked'><</div>
                            <div class="monthName"@click='monthNameClicked'>{{ displayingMonth }} {{ displayingYear }}</div>
                            <div class="nextMonth" @click='nextMonthClicked'>></div>
                        </div>
                    </div>
                    <div class='dialog-week'>
                        <div class='day-box day-name' v-for='dayName in dayNames'>
                            {{ dayName }}
                        </div>
                    </div>
                    <div class='dialog-days'>
                        <div class='day-box empty-box' v-for='n in firstDayOfMonth'></div><template v-for='n in daysInMonth'><div class='day-box'
                                v-bind:class='{ chosenDay : ifDayBoxIsChosenDay(n) }'
                                @click='dayClicked(n)'>{{ n }}</div><div class="endofweek" v-if="(firstDayOfMonth + n) % 7 == 0"></div></template>
                    </div>
                </div>
                <div class='year-view' v-if='isMonthView'>
                    <div class="dialog-header" v-bind:style='{background : headerBackgroundColor, color: headerColor}'>
                        <div class='dialog-year'>
                            <div class="preYear" @click='preYearClicked'><</div>
                            <div class="cyear">{{ displayingYear }}</div>
                            <div class="nextYear" @click='nextYearClicked'>></div>
                        </div>
                    </div>
                    <div class='dialog-months'>
                        <template v-for='(n, i) in monthNames'>
                            <div class="endofseason" v-if="i % 3 == 0"></div>
                            <div class='month-box'
                                v-bind:class='{ chosenMonth : ifMonthBoxChosenMonth(i) }'
                                @click='monthClicked(i)'>{{ n }}</div>
                        </template>
                    </div>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
  name : 'PDatePicker',
  props : {'placeholder' : { default : 'یک تاریخ را انتخاب کنید', String},
                'headerBackgroundColor' :{ default : '#137e95' },
                'headerColor' : { default : 'white'},
                'dialogColor' : { default : 'black' },
                'dialogBackColor' : { default : '#fafafa'},
                'minimumYear' : { default : 1300, type: Number},
                'maximumYear' : { default : 1450, type: Number },
                'value' : { default : '' },
                'name' : { default : '', type: String },
                'required' : { default : false, Boolean },
                'id' : { default : '', String},
                'inputClass': { default : '', String },
                'dialogClass' :  {default : '', String },
                'wrapperClass' :  {default : '', String },
                'initialView' : { default: 'day', String, 
                        validator (value){
                            return value === 'day' || value === 'month'
                        }
                    },
                'inlineMode' : { default : false, Boolean },
                'formatDate' : { default: 'yyyy/MM/dd', String, 
                        validator (value) {
                            let elements = value.split("/");
                            if(elements.length !== 3) return false;
                            if(elements[0] !== "yyyy" && elements[0] !== "yy") return false;
                            if(elements[1] !== "M" && elements[1] !== "MM" && elements[1] !== "MMM") return false;
                            if(elements[2] !== "d" && elements[2] !== "dd") return false;
                            return true;
                        }
                    },
                'openTransitionAnimation' : { default: 'slide-fade' , String },
                'persianDigits' : { default : true, String }
  },
  data () {
    return {
        isDialogOpen : false,
        isDayView : true,
        isMonthView : false,
        dayNames : ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
        monthNames : ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور' ,'مهر' ,'آبان' ,'آذر', 'دی' ,'بهمن', 'اسفند'],
        dayInThisMonth: 1,
        firstDayOfMonth: 0,
        daysInMonth: 30,
        gtoday : [1380, 1, 1],
        displayingMonthNum : 1,
        displayingMonth : '',
        displayingYear : 1300,
        dayOfWeek: 0,
        chosenDate : '',
        formatedChosenDate : '',
        chosenDay: 1,
        chosenMonth : 1,
        chosenYear : 1396
    }
  },
  mounted(){
    if(this.inputCheck(this.value)){
        this.inputChanged(this.value);
    } else {
        this.goToToday();  
    }
    if(this.inlineMode){
        this.openDialog();
    }
  },
  methods: {
    inputClicked () {
        if(!this.isDialogOpen)
            this.openDialog();
        else
            this.closeDialog();
    },
    hasInputClass(){
        return inputClass !== '';
    },
    openDialog(){
        if(this.isDialogOpen) return;
        this.isDialogOpen = true;
        if(this.initialView === 'day'){
            this.isDayView = true;
            this.isMonthView = false;
        } else {
            this.isDayView = false;
            this.isMonthView = true;
        }
        this.$emit('opened', this.value);
    },
    closeDialog(){
        if(!this.inlineMode){
            this.isDialogOpen = false;
            this.$emit('closed', this.value);
        }
    },
    inputCheck(value){
        if(value !== ''){
            let els = value.split("/");
            if(els.length === 3){
                let year = parseInt(this.convertDigitsPTE(els[0]));
                let month = parseInt(this.convertDigitsPTE(els[1]));
                let day = parseInt(this.convertDigitsPTE(els[2]));
                if(isNaN(month)){
                    month = this.monthNames.indexOf(els[1]) + 1;
                } 
                if(!isNaN(year) && !isNaN(day) && month !== -1){
                    if(month < 1 || month > 12) return false;
                    if(month <= 6 && (day < 1 || day > 31)) return false;
                    if(month > 6 && (day < 1 || day > 30)) return false;
                    if(year < 1300) year += 1300;
                    if(year < this.minimumYear || year > this.maximumYear) return false;
                    return true;
                }
            }
        }
        return false;
    },
    inputChanged(value){
        if(this.inputCheck(value)) {  
            let els = value.split("/");
            let year = parseInt(this.convertDigitsPTE(els[0]));
            let month = parseInt(this.convertDigitsPTE(els[1]));
            let day = parseInt(this.convertDigitsPTE(els[2]));
            if(isNaN(month)){
                month = this.monthNames.indexOf(els[1]) + 1;
            }
            this.goToMonth(year, month - 1, day);
            this.updateInput();
            this.dayClicked(day);
        }
    },
    ifDayBoxIsChosenDay(day){
        return this.chosenYear === this.displayingYear &&
                this.chosenMonth === (this.displayingMonthNum + 1) &&
                this.chosenDay === day;
    },
    ifMonthBoxChosenMonth(month){
        return this.chosenYear === this.displayingYear &&
                this.chosenMonth === month + 1;
    },
    goToToday(){
        let today = new Date();
        this.gtoday = this.gregorian_to_jalali(today.getFullYear(), today.getMonth(), today.getDate());
        this.goToMonth(this.gtoday[0], this.gtoday[1] - 1, this.gtoday[2]);
        this.chosenDay = this.gtoday[2];
        this.chosenMonth = this.gtoday[1];
        this.chosenYear = this.gtoday[0];
        this.goToMonth(this.chosenYear, this.chosenMonth, this.chosenDay);
    },
    goToMonth(year, month, day){
        var gfirstOfMonth = this.jalali_to_gregorian(year, month + 1, 1);
        
        var firstOfMonth = new Date(gfirstOfMonth[0], gfirstOfMonth[1] - 1, gfirstOfMonth[2] + 1);
        this.firstDayOfMonth = (firstOfMonth.getDay()) %7 ;
        this.daysInMonth = this.gatDaysInMonth(month);
        this.displayingMonthNum = month;
        
        let yearch = this.displayingYear !== year;
        let monthch = this.displayingMonth !== this.monthNames[month];
        
        this.displayingYear = year;
        this.displayingMonth = this.monthNames[month];
        
        if(monthch)
            this.$emit('monthChanged', this.value);
        if(yearch)
            this.$emit('yearChanged', this.value);
        
    },
    gatDaysInMonth(monthNumber){
        return monthNumber <= 5 ? 31 : 30;
    },
    preMonthClicked(){
        let newMonth = this.displayingMonthNum - 1;
        let newYear = this.displayingYear;
        if(newMonth < 0 &&
                newYear - 1 >= this.minimumYear) {
            newMonth = 11;
            newYear--;
        }
        this.goToMonth(newYear, newMonth, 1);
    },
    nextMonthClicked(){
        let newMonth = this.displayingMonthNum + 1;
        let newYear = this.displayingYear;
        if(newMonth < 0 &&
                newYear - 1 >= this.minimumYear) {
            newMonth = 11;
            newYear--;
        }
        this.goToMonth(newYear, newMonth, 1);
    },
    dayClicked(day){
        this.chosenDay = day;
        this.chosenMonth = this.displayingMonthNum + 1;
        this.chosenYear = this.displayingYear;
        this.updateInput();
        this.closeDialog();
    },
    monthClicked(month){
        this.displayingMonthNum = month;
        this.isMonthView = false;
        this.isDayView = true;
        this.goToMonth(this.displayingYear, this.displayingMonthNum, 1);
    },
    updateInput(){
        this.chosenDate = this.chosenYear + "/" + this.chosenMonth + "/" + this.chosenDay;
        let str = this.toFormatDate(this.chosenYear, this.chosenMonth, this.chosenDay);
        if(this.persianDigits)
            this.formatedChosenDate = this.convertDigitsETP(str);
        else
            this.formatedChosenDate = this.convertDigitsPTE(str);
        this.$emit('selected', this.chosenDate);
        this.$emit('input', this.chosenDate);
    },
    nextYearClicked(){
        if(this.displayingYear + 1 <= this.maximumYear) {
            this.displayingYear++;
            this.$emit('yearChanged', this.value);
        }
    },
    preYearClicked(){
        if(this.displayingYear - 1 >= this.minimumYear) { 
            this.displayingYear--;
            this.$emit('yearChanged', this.value);
        }
    },
    monthNameClicked(){
        this.isDayView = false;
        this.isMonthView = true;
        this.chosenMonth = this.displayingMonthNum + 1;
        this.$emit('monthChanged', this.value);
    },
    toFormatDate(year, month, day){
        let elements = this.formatDate.split("/");
        let outYear = '' + elements[0] === "yyyy" ? year : year - 1300;
        let outMonth = '';
        if(elements[1] === 'M') outMonth = month;
        else if(elements[1] === 'MM'){
            if(month < 10) outMonth = '0' + month;
            else outMonth =  month;
        }
        else if(elements[1] === 'MMM') outMonth = this.monthNames[month - 1];
        let outDay = elements[2] === 'dd' && day < 10 ? '0' + day : day;
        return outYear + "/" + outMonth + "/" + outDay;
    },
    /**
     * This function convert english digits to persian ones.
     * @param {String} unconverted string
     * @returns {String} converted string
     */
    convertDigitsPTE(str){
      return this.replaceAllArray(str,
        ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    },
    /**
     * This function convert persian digits to english ones.
     * @param {String} unconverted string
     * @returns {String} converted string
     */
    convertDigitsETP(str){
      return this.replaceAllArray(str,
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']);
    },
    replaceAllArray(str, find, replace){
        let replacedStr = str;
        for(let i=0; i<find.length; i++){
            replacedStr = replacedStr.split(find[i]).join(replace[i]);
        }
        return replacedStr;
    },
    gregorian_to_jalali( gy, gm, gd) {
        var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
        var jy, jm, jd, gy2, days;
        if(gy > 1600) {
            jy=979;
            gy-=1600;
        } else {
            jy=0;
            gy-=621;
        }
        gy2=(gm > 2)?(gy+1):gy;
        days=(365*gy) +(parseInt(( gy2 + 3 ) / 4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
        jy += 33 * (parseInt( days / 12053)); 
        days%=12053;
        jy += 4*(parseInt(days/1461));
        days%=1461;
        if(days > 365){
            jy+=parseInt((days-1)/365);
            days=(days-1)%365;
        }
        jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
        jd=1+((days < 186)?(days%31):((days-186)%30));
        return [jy,jm,jd];
    },
    jalali_to_gregorian( jy, jm, jd) {
        var gy, gm, gd, days, sal_a, v;
        if(jy > 979){
            gy=1600;
            jy-=979;
        }else{
            gy=621;
        }
        days=(365*jy) +((parseInt(jy/33))*8) +(parseInt(((jy%33)+3)/4)) +78 +jd +((jm<7)?(jm-1)*31:((jm-7)*30)+186);
        gy+=400*(parseInt(days/146097));
        days%=146097;
        if(days > 36524) {
            gy+=100*(parseInt(--days/36524));
            days%=36524;
            if(days >= 365)days++;
        }
        gy+=4*(parseInt(days/1461));
        days%=1461;
        if(days > 365){
            gy+=parseInt((days-1)/365);
            days=(days-1)%365;
        }
        gd=days+1;
        sal_a=[0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];
        for(gm=0; gm < 13; gm++) {
            v=sal_a[gm];
            if(gd <= v)break;
            gd-=v;
        }
        return [gy,gm,gd]; 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    @mixin clearfix() {
        &::after {
          display: block;
          content: "";
          clear: both;
        }
    }
    @mixin hovarable(){
        &:hover{
            background-color: rgba(200, 200, 200, 0.6);
        }
                position: relative !important;
    }
    @mixin unhovarable(){
        cursor: default;
        &:hover{
            background-color: inherit;
        }
    }
    
    $width : 30px;
    $month_box_width : $width * 7 / 3;
    .pdatepicker{
        position: relative;
        input{
            text-align: left;
            direction: rtl;
        }
        .dialog{
            position: absolute;
            border: 1px solid gray;
            box-shadow: 0px 0px 2px 0px gray;
            background-color: #fafafa;
            z-index: 100000;
            
            .dialog-header{
                width: 100%;
                box-shadow: 0px 0px 5px 0px gray;
                @include clearfix;
            }
            .endofweek, .endofseason{
                padding: 0px;
                margin: 0px;
                width: 0px;
                height: 0px;
                @include clearfix();                       
            }
            .day-view{
                .dialog-month{
                    width: 100%;
                    div{
                        display: inline-block;
                        text-align: center;
                        padding: 10px 0;
                        cursor: pointer;
                        @include hovarable();
                    }
                    .nextMonth{
                        float: right;
                        width: 10%;
                    }
                    .preMonth{
                        float: right;
                        width: 10%;
                    }
                    .monthName{
                        float: right;
                        width: 80%;
                    }
                }
                .dialog-week{
                    width: 100%;
                }
                .day-box{
                    width: $width;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid transparent;
                    padding:5px;
                    margin: 3px;
                    cursor: pointer;
                    font-size: 12px;
                    @include hovarable();
                }
                .day-name{
                    border-bottom: 1px solid gray;
                    @include unhovarable();
                }
                .empty-box{
                    @include unhovarable();
                }
            }
            .year-view{
                text-align: center;
                .dialog-year{
                    width: 100%;
                    div{
                        display: inline-block;
                        text-align: center;
                        padding: 10px 0;
                        cursor: pointer;
                        @include hovarable();
                    }
                    .nextYear{
                        float: right;
                        width: 10%;
                    }
                    .preYear{
                        float: right;
                        width: 10%;
                    }
                    .cyear{
                        float: right;
                        width: 80%;
                        @include unhovarable();
                    }
                }
                .month-box{
                    width: $month_box_width;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid transparent;
                    padding:5px;
                    margin: 3px;
                    cursor: pointer;
                    @include hovarable();
                }
                
                
            }
            .chosenDay, .chosenMonth{
                background-color: lightgray;
            }
        }
        &.inline{
            display: inline-block;
            .dialog{
                 position: static;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    
    .slide-fade-enter-active {
        transition: all .3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all .8s ease-out;
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
