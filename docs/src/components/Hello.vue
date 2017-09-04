<template>
  <div class="hello">
      <div id="first-row" class="row">
          <div class="inside">
              <h1>افزونه تاریخ جلالی</h1>
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
              <a class="btn btn-default" href="https://github.com/dyonir/vue2-persian-datepicker">مشاهده برروی 
                  <i class="fa fa-github"></i>
              </a>
          </div>
      </div>
  </div>
</template>

<script>
    
    
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    .btn{
        text-align: center;
    }
</style>
