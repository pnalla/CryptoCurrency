import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Bootstrap libraries
import 'bootstrap/dist/css/bootstrap.css'
import VeeValidate from 'vee-validate'

// Custom CSS
import './assets/global.css'

Vue.config.productionTip = false
Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
