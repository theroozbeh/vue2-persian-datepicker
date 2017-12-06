<template>
  <div class="hello">
      <div id="first-row" class="row">
          <div class="inside">
              <h1>افزونه تاریخ جلالی</h1>
              <img class='vue-logo' src="../assets/logo.png">
              <br>
              <p>افزونه ای تحت vue که برای شما امکان انتخاب تاریخ جلالی را فراهم می آورد.
                  <br>
                  این افزونه وابستگی به هیچ کتابخانه دیگری ندارد. بنابراین گزینه مناسبی برای استفاده در پروژه های مختلف می باشد.
              </p>
              <br>
              <p>
                  <pdatepicker></pdatepicker>
              </p>
              
              <br><br>
              <a class="btn btn-default" href="https://github.com/dyonir/vue2-persian-datepicker">
                  مشاهده برروی 
                  <i class="fa fa-github"></i>
              </a>
          </div>
      </div>
      <div id='second-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>دریافت تاریخ انتخاب شده</h2>
                <br>
                تاریخ :
                <pdatepicker v-model='selected_1'></pdatepicker>
                <div class='code'> {{ selected1_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_1 }}</div>
              </div>
          </div>
      </div>
      <div id='third-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>نمایش مختلف تاریخ</h2>
                <br>
                تاریخ :
                <pdatepicker v-model='selected_2' format-date='yyyy/MMM/dd' ></pdatepicker>
                <div class='code'> {{ selected2_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_2 }}</div>
              </div>
          </div>
      </div>
      <div id='third-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>تغییر رنگ ها</h2>
                <br>
                تاریخ :
                <pdatepicker v-model='selected_3' header-background-color='#FF920A' dialog-background-color='#B29269'></pdatepicker>
                <div class='code'> {{ selected3_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_3 }}</div>
              </div>
          </div>
      </div>
      <div id='forth-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>تغییر ترانزیشن ها</h2>
                <p>
                برای تعریف ترانزیشن های شخصی به راهنمای vue برای تعریف آن ها مراجعه کنید.
                </p>
                <br>
                تاریخ :
                <pdatepicker v-model='selected_4' open-transition-animation='left-slide-fade'></pdatepicker>
                <div class='code'> {{ selected4_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_4 }}</div>
              </div>
          </div>
      </div>
      <div id='fifth-row' class="row">
          
          <div class='container'>
              <div class='panel'>
                <h2>محدود کردن کاربر</h2>
                <pdatepicker v-model='selected_5'
                             :availableDates="true"
                             availableDateStart="1396/08/05"
                             availableDateEnd="1396/09/10"></pdatepicker>
                <div class='code'> {{ selected5_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_5 }}</div>
              </div>
          </div>
      </div>
      <div id='fifth-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>مد داخل خط</h2>
                <pdatepicker v-model='selected_6' inline-mode='true' ></pdatepicker>
                <div class='code'> {{ selected6_code }} </div>
                <div>
                تاریخ انتخاب شده: 
                {{ selected_6 }}</div>
              </div>
          </div>
      </div>
      <div id='fifth-row' class="row">
          <div class='container'>
              <div class='panel'>
                <h2>در آخر</h2>
                <p>
                    ممنون از شما که این افزونه را انتخاب نمودید.
                </p>
                <p>
                    لطفا در صورت بروز مشکل و یا پیشنهاد حتما آن را در github با ما در میان بگذارید
                </p>
              </div>
          </div>
      </div>
        <div id='donate-row' class="row">
            <div class='container'>
              برای زنده نگه داشتن پروژه و ایجاد انگیزه برای پروژه های جدید از ما حمایت کنید. :)
                <div class='address' dir='ltr'>
                    <transition name="fade">
                        <div v-if="!showingAdd">
                            <img  class='donate_ribbon' @click="showingAdd=true" src="../assets/RibbonDonateBitcoin.png">
                        </div>
                        <div v-else class="bit_add">
                            <h4>Scan:</h4>
                            <img src="../assets/bitcoin-add.png" title="wallet address">
                            <h4>Or use:</h4>
                            <span>
                                13LbAMWgQD1yWqxdkdEp7RC86GuL8xFEvq
                            </span>
                        </div>
                    </transition>
                    <div class="clearfix"></div>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
    
    
export default {
  name: 'hello',
  data () {
    return {
       selected_1 : '',
       selected_2 : '',
       selected_3 : '',
       selected_4 : '',
       selected_5 : '',
       selected_6 : '',
       selected1_code: '<pdatepicker v-model="selected_1"></pdatepicker>',
       selected2_code: '<pdatepicker v-model="selected_2" format-date="yyyy/MMM/dd"></pdatepicker>',
       selected3_code: '<pdatepicker v-model="selected_3" header-background-color="#FF920A" dialog-background-color="#B29269"></pdatepicker>',
       selected4_code: '<pdatepicker v-model="selected_4"  open-transition-animation="left-slide-fade"></pdatepicker>',
       selected5_code: '<pdatepicker v-model="selected_5" :availableDates="true" availableDateStart="1396/08/05" availableDateEnd="1396/09/10"></pdatepicker>',
       selected6_code: '<pdatepicker v-model="selected_6" inline-mode="true"></pdatepicker>',
       showingAdd : false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @mixin translate($x, $y){
        -webkit-transform: translate($x, $y);
           -moz-transform: translate($x, $y);
            -ms-transform: translate($x, $y);
                transform: translate($x, $y);
    }
    .hello{
        height: 100%;
        width: 100%;
        font-size: 16px;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#d6f9ff+0,9ee8fa+100;Blue+3D */
        background: #d6f9ff; /* Old browsers */
        background: -moz-linear-gradient(top, #d6f9ff 0%, #9ee8fa 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #d6f9ff 0%,#9ee8fa 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #d6f9ff 0%,#9ee8fa 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d6f9ff', endColorstr='#9ee8fa',GradientType=0 ); /* IE6-9 */
        h1{
            font-size: 3em;
        }
        h2{
            font-size: 1.5em;
        }
    }
    .row{
        padding: 50px 0;
        border-bottom: 1px solid lightgray;
    }
    .code{
        font-family: Consolas,Menlo,Monaco,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Courier New,Courier,monospace;
        width: 100%;
        padding: 15px 15px;
        direction: ltr;
        text-align: left;
        margin: 10px 0;
        background-color: lightgray;
        border-radius: 5px;
    }
    .vue-logo{
        display: inline;
        width: 60px;
    }
    #first-row{
        text-align: center;
        height: 100%;
        position: relative;
        .inside{
            position: absolute;
            top: 50%;
            right: 50%;
            @include translate(50%, -50%);
        }
    }
    #second-row{
    }
    .btn{
        text-align: center;
        font-size: 16px;
        i{
            line-height: 15px;
        }
    }

    #donate-row{
        text-align: center;
        height: 400px;
        .address{
            margin-top: 20px;
            font-family: Consolas,Menlo,Monaco,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Courier New,Courier,monospace;
         }
        .donate_ribbon{
            cursor: pointer;
        }
        .bit_add{
            img{
                width: 200px;
            }
            position: relative;
        }
    }
</style>
