import Axios from 'axios'

import { Dialog } from 'vant';
 
// 超时时间
Axios.defaults.timeout = 5000
// http请求拦截器
Axios.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Dialog.alert({
    message: '网络不给力,请稍后再试',
  }).then(() => {
    // on close
  });
  return Promise.reject(error)
})
//   http响应拦截器
Axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  // loadinginstace.close();
  const msg = data.data;
  console.log(data)
  // 对响应数据做点什么
  if (msg.code != 0) {//如果服务端返回的是错误数据
    if (msg.code == -2) {//如果是没有登陆的请求
      // router.push("/login");
      // window.location.replace("/login") ;
      window.location.href='/login' ;
    }
    if (msg.msg != null && msg.msg != '') {//如果有返回错误信息
      Dialog.alert({
        message: msg.msg,
      }).then(() => {
        // on close
      });
    }
  }
  return data;
}, error => {
  // console.log(error)
  Dialog.alert({
    message: '网络不给力,请稍后再试',
  }).then(() => {
    // on close
  });
  return Promise.reject(error)
})