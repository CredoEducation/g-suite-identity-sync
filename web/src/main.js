import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AuthPlugin from './auth'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate)

import i18n from './lang'

VeeValidate.Validator.extend('password', {
  getMessage: field => 'Invalid password! Password length must be 8-16 with at least one digit', // eslint-disable-line no-unused-vars
  validate: value => {
    var strongRegex = new RegExp('^[a-zA-Z0-9_]\w{7,15}$')
    return true
  }
})

Vue.prototype.$http = axios;
Vue.prototype.$apiPrefix = '/cxf';
Vue.prototype.$production = (process.env.NODE_ENV === 'production')

Vue.use(AuthPlugin, {
  router: router,
  http: axios,
  apiPrefix: Vue.prototype.$apiPrefix,
  production: Vue.prototype.$production
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
