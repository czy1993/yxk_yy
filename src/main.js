// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/index.js';
import md5 from 'js-md5';
import "@/styles/index.scss"
import '@/styles/from.scss';
import "@/styles/childViews.scss";
import "@/styles/searchViews.scss"
import './permission'


Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
