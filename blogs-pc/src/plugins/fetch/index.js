import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: '/', // 你的接口地址
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // console.log(config)
    // 在发送请求之前做些什么，比如添加token等等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
