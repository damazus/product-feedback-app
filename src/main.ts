import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import 'vue-multiselect/dist/vue-multiselect.min.css'


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

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
