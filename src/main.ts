import Vue from 'vue'
import {createPinia, PiniaVuePlugin} from 'pinia'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import 'vue-multiselect/dist/vue-multiselect.min.css'
import data from '@/data.json'


// with typescript
for (const [rule, validation] of Object.entries(rules)) {
   extend(rule, {
      ...validation,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: messages[rule]
   });
}

import SvgIcon from '@/components/SvgIcon.vue'
import './assets/scss/main.scss'

Vue.component('SvgIcon', SvgIcon)
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

pinia.use(({ store }) => {
   if(!localStorage.getItem('current_user')){
      localStorage.setItem('current_user', JSON.stringify(data.currentUser))
   }

   if(!localStorage.getItem('product_requests')){
      localStorage.setItem('product_requests', JSON.stringify(data.productRequests))
   }

   const currentUserString = localStorage.getItem('current_user')
   const productRequestsString = localStorage.getItem('product_requests')

   if(currentUserString !== null){
      store.currentUser = JSON.parse(currentUserString)
   }

   if(productRequestsString !== null){
      store.productRequests = JSON.parse(productRequestsString)
   }

   store.$subscribe(() => {
      console.log('$subscribe')
      localStorage.setItem('product_requests', JSON.stringify(store.productRequests))
   })
})

new Vue({
  router,
  pinia: pinia,
  render: (h) => h(App)
}).$mount('#app')
