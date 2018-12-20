import 'normalize.css'
import './styles/base.css'
import './styles/resetPage.css'
import 'social-share.js/dist/css/share.min.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import VModal from 'vue-js-modal'
Vue.use(VModal, { dialog: true })

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')