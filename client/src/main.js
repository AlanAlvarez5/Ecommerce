import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';

//axios config
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 15000,
});
Vue.prototype.$axios.defaults.headers.common['Access-Token'] = localStorage.getItem('auth_token');

//Styles
import './assets/css/gradients.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
