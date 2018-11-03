import Vue from 'vue'
import App from './App.vue'

import PDatePicker from 'vue2-persian-datepicker';
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./assets/font-awesome.css');

Vue.config.productionTip = false

Vue.component('pdatepicker', PDatePicker);
new Vue({
  render: h => h(App),
}).$mount('#app')
