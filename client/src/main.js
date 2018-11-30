import Vue from 'vue'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

import App from './App.vue'

Vue.use(vuescroll)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
