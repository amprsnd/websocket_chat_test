import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from './App.vue'

Vue.use(VeeValidate)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
