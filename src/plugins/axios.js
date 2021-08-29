"use strict";

import Vue from 'vue';
import axios from "axios";
import VueCookies from "vue-cookies";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

console.log(process.env);

let config = {
  baseURL: process.env.BASE_URL || process.env.apiUrl || "",
  timeout: 60 * 1000, // Timeout
  Proxy : {
    host: "localhost",
    prot : process.env.VUE_APP_SERVER_PORT
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // 토근이 있으면 토큰을 hearder에 넣어 보낸다.
    if(VueCookies.isKey('token')){
      //config.headers.Authorization = VueCookies.get('token');
      config.headers.Authorization = 'Bearer ' + VueCookies.get('token');
    }


    // Do something before request is sent
    const { $Progress, $toast } = Vue.prototype;
    if($Progress) $Progress.start();

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    const { $Progress, $toast } = Vue.prototype;
    const { data, status} = response;
    let msg = ""
    if(status !=200 ) {
      msg = `Error code : ${status}`
    }
    if(data.err){
      msg = data.err;
    }

    console.log('AXIOS', data);

    if(msg){
      if($toast) $toast.error(msg);
      if($Progress) $Progress.fail();
      return false;
    }else{
      if($Progress) $Progress.finish();
      return data;
    }
    
    //if($Progress) $Progress.finish();
    //return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = _axios;

export default _axios;
