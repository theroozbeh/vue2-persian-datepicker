import Vue from 'vue'
import Router from 'vue-router'
import PDatePicker from '@/components/PDatePicker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pdatepicker',
      component: PDatePicker
    }
  ]
})
