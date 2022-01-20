import axios from 'axios';
import options from './config';

const instance = axios.create(options);

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('发送请求前：', config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log('请求错误：', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log('响应response:', response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    console.log('响应error:', error);
    return Promise.reject(error);
  }
);

export default instance;
