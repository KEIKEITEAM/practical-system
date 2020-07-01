// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './vuex/store';
import './http.js'

//引入axios
import axios from "axios"
import { Lazyload } from 'vant';

Vue.use(Lazyload);
//设置用json的方式传，不然增删改查会报错
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Methods": "*"
}
axios.defaults.baseURL = "http://140.143.186.207:8090/api";//设置初始URL
// axios.defaults.baseURL = "http://182.92.128.70:8081";
// axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 5000;

axios.defaults.withCredentials = true;//用地址请求 解决cookie丢失问题

//挂在在vue的原型上
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.use(Vant);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
