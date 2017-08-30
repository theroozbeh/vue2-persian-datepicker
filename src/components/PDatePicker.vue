<template>
    <div dir='rtl' class="pdatepicker">
        <input type="text" @click="inputClicked" v-model='chosenDate' @change='chosenDateChanged' :placeholder="placeholder">
        <div class='dialog' v-if='isDialogOpen'>
            <div class='day-view' v-if='isDayView'>
                <div class="dialog-header" v-bind:style='{background : headerBackgroundColor, color: headerColor}'>
                    <div class='dialog-month'>
                        <div class="preMonth" @click='preMonthClicked'><</div>
                        <div class="monthName"@click='monthNameClicked'>{{ displayingMonth }} {{ displayingYear }}</div>
                        <div class="nextMonth" @click='nextMonthClicked'>></div>
                    </div>
                </div>
                <div class='dialog-week'>
                    <div class='day-box day-name' v-for='dayName in dayNames'>{{ dayName }}</div>
                </div>
                <div class='dialog-days'>
                    <div class='day-box empty-box' v-for='n in firstDayOfMonth'></div><div class='day-box'
                                                                                           v-bind:class='{ chosenDay : ifDayBoxIsChosenDay(n) }'
                                                                                           v-for='n in daysInMonth'
                                                                                           @click='dayClicked(n)'>{{ n }}</div>
                </div>
            </div>
            <div class='year-view' v-if='isMonthView'>
                <div class="dialog-header" v-bind:style='{background : header_backcolor, color: header_color}'>
                    <div class='dialog-year'>
                        <div class="preYear" @click='preYearClicked'><</div>
                        <div class="cyear">{{ displayingYear }}</div>
                        <div class="nextYear" @click='nextYearClicked'>></div>
                    </div>
                </div>
                <div class='dialog-months'>
                    <div class='month-box'
                        v-bind:class='{ chosenMonth : ifMonthBoxChosenMonth(i) }'
                        v-for='(n, i) in monthNames'
                        @click='monthClicked(i)'>{{ n }}</div>
                </div>
            </div>
        </div>
      
  </div>
</template>

<script>
export default {
  name : 'PDatePicker',
  props : {'placeholder' : { default : 'یک تاریخ را انتخاب کنید'},
                'headerBackgroundColor' :{ default : '#137e95' },
                'headerColor' : { default : 'white'},
                'minimumYear' : { default : 1300, type: Number},
                'maximumYear' : { default : 1450, type: Number },
                'value' : { default : '' }
                
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
        chosenDate: this.value,
        chosenDay: 1,
        chosenMonth : 1,
        chosenYear : 1396
    }
  },
  mounted(){
    this.chosenDateChanged();  
  },
  methods: {
    inputClicked () {
        this.isDialogOpen = !this.isDialogOpen ;
        this.isDayView = true;
        this.isMonthView = false;
    },
    openDialog(){
       
    },
    chosenDateChanged(){
        let check = true;
        if(this.chosenDate !== ''){
            var els = this.chosenDate.split("/");
            if(els.length === 3){
                let year = parseInt(els[0]);
                let month = parseInt(els[1]);
                let day = parseInt(els[2]);
                console.log(year, month, day);
                if(!isNaN(year) && !isNaN(month) && !isNaN(day)){
                    if(year < 1300) year += 1300;
                    this.goToMonth(year, month - 1, day);
                    this.chosenDay = day;
                    this.chosenMonth = month;
                    this.chosenYear = year;
                    check = false;
                    
                }
            }
        }
        if(check){
            let today = new Date();
            this.gtoday = this.gregorian_to_jalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
            this.goToMonth(this.gtoday[0], this.gtoday[1] - 1, this.gtoday[2]);
            this.chosenDay = this.gtoday[2];
            this.chosenMonth = this.gtoday[1];
            this.chosenYear = this.gtoday[0];
            //this.updateInput();
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
    goToMonth(year, month, day){
        var gfirstOfMonth = this.jalali_to_gregorian(year, month + 1, 1);
        
        var firstOfMonth = new Date(gfirstOfMonth[0], gfirstOfMonth[1] - 1, gfirstOfMonth[2] + 1);
        this.firstDayOfMonth = (firstOfMonth.getDay()) %7 ;
        this.daysInMonth = this.gatDaysInMonth(month);
        this.displayingMonthNum = month;
        this.displayingYear = year;
        this.displayingMonth = this.monthNames[month];
    },
    gatDaysInMonth(monthNumber){
        return monthNumber <= 5 ? 31 : 30;
    },
    preMonthClicked(){
        this.displayingMonthNum--;
        if(this.displayingMonthNum < 0 &&
                this.displayingYear - 1 >= this.minimumYear) {
            this.displayingMonthNum = 11;
            this.displayingYear --;
        }
        this.goToMonth(this.displayingYear, this.displayingMonthNum, 1);
    },
    nextMonthClicked(){
        this.displayingMonthNum++;
        if(this.displayingMonthNum > 11 &&
                this.displayingYear + 1 <= this.maximumYear) {
            this.displayingMonthNum = 0;
            this.displayingYear++;
        }
        this.goToMonth(this.displayingYear, this.displayingMonthNum, 1);
        
    },
    dayClicked(day){
        this.chosenDay = day;
        this.chosenMonth = this.displayingMonthNum + 1;
        this.chosenYear = this.displayingYear;
        this.updateInput();
        this.isDialogOpen = false;
    },
    monthClicked(month){
        console.log(month);
        this.displayingMonthNum = month;
        this.isMonthView = false;
        this.isDayView = true;
        this.goToMonth(this.displayingYear, this.displayingMonthNum, 1);
    },
    updateInput(){
        this.chosenDate = this.chosenYear + "/" + this.chosenMonth + "/" + this.chosenDay;
        this.value = this.chosenDate ;
        this.$emit('selected', this.value);
    },
    nextYearClicked(){
        if(this.displayingYear + 1 <= this.maximumYear) 
            this.displayingYear++;
    },
    preYearClicked(){
        if(this.displayingYear - 1 >= this.minimumYear) 
            this.displayingYear--;
    },
    monthNameClicked(){
        this.isDayView = false;
        this.isMonthView = true;
        this.chosenMonth = this.displayingMonthNum + 1;
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
    }
    @mixin unhovarable(){
        cursor: default;
        &:hover{
            background-color: inherit;
        }
    }
    
    $width : 30px;
    $month_box_width : $width * 9 / 3;
    .pdatepicker{
        width: ($width + 13) * 8;
        position: relative;
        input{
            text-align: left;
            direction: rtl;
        }
        .dialog{
            position: absolute;
            border: 1px solid gray;
            box-shadow: 0px 0px 2px 0px gray;
            .dialog-header{
                width: 100%;
                box-shadow: 0px 0px 5px 0px gray;
                @include clearfix;
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
                width: ($width + 13) * 8;
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
    }
</style>
