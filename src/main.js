import Vue from 'vue'
import App from './App.vue'
import './sw'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
