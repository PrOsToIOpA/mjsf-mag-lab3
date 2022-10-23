import Vue from 'vue'
import App from './App.vue'
import services from './services';
import vmodal from 'vue-js-modal'
Vue.use(vmodal, {
  dynamicDefaults: {
    height: "auto",
  },
})
Vue.prototype.$services = services;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
